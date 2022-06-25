mod io;
mod recipe {
    tonic::include_proto!("recipe");
}

use tonic::{
    metadata::MetadataMap, metadata::MetadataValue, transport::Server, Request, Response, Status,
};

use crate::recipe::recipe_service_server::{RecipeService, RecipeServiceServer};
use crate::recipe::{
    DeleteRecipeByIdRequest, DeleteRecipeByIdResponse, GetRecipeByIdRequest, GetRecipeByIdResponse,
    PostRecipeResponse, Recipe, RecipeList, RecipeQuery,
};
use log::info;
use std::env;

#[derive(Eq, PartialEq, Debug)]
enum AuthAction {
    CREATE,
    READ,
    DELETE,
}

#[derive(Eq, PartialEq, Debug)]
enum AuthResource {
    RECIPE,
}

#[derive(Eq, PartialEq, Debug)]
struct AccessGrant {
    action: AuthAction,
    resource: AuthResource,
}

static ADMIN_ROLE: &'static [AccessGrant] = &[
    AccessGrant {
        action: AuthAction::CREATE,
        resource: AuthResource::RECIPE,
    },
    AccessGrant {
        action: AuthAction::READ,
        resource: AuthResource::RECIPE,
    },
    AccessGrant {
        action: AuthAction::DELETE,
        resource: AuthResource::RECIPE,
    },
];

static UNAUTHENTICATED_USER_ROLE: &'static [AccessGrant] = &[AccessGrant {
    action: AuthAction::READ,
    resource: AuthResource::RECIPE,
}];

fn check_auth(meta: &MetadataMap, requires: AccessGrant) -> Option<Status> {
    let token = MetadataValue::from_str("eJYze....").unwrap();
    let user_token = meta.get("authorization-token");
    let user_role = match user_token {
        Some(user_token) if user_token == token => &ADMIN_ROLE,
        _ => &UNAUTHENTICATED_USER_ROLE,
    };
    let allowed: bool = user_role.contains(&requires);
    match allowed {
        true => None,
        false => {
            info!("User not authorized, needs: {:?}", requires);
            Some(Status::unauthenticated("Access denied"))
        }
    }
}

pub struct MyRecipeService {
    repository: io::PostgresRepository,
}

#[tonic::async_trait]
impl RecipeService for MyRecipeService {
    async fn get_recipe_by_id(
        &self,
        request: Request<GetRecipeByIdRequest>,
    ) -> Result<Response<GetRecipeByIdResponse>, Status> {
        // Middleware but I don't know enough rust to make it smarter
        let auth_errors = check_auth(
            request.metadata(),
            AccessGrant {
                action: AuthAction::READ,
                resource: AuthResource::RECIPE,
            },
        );
        match auth_errors {
            Some(s) => return Err(s),
            _ => (),
        }

        // TODO: I have no idea what this does but borrow checker yells at me
        let req = request.into_inner();
        info!("{:?}", req);
        // end Middleware

        match self.repository.load_recipe_by_id(req.recipe_id).await {
            Ok(r) => Ok(Response::new(GetRecipeByIdResponse {
                was_found: true,
                recipe: Some(r),
            })),
            Err(e) => Err(Status::unknown(format!("Could not save: {:?}", e))),
        }
    }

    async fn delete_recipe_by_id(
        &self,
        request: tonic::Request<DeleteRecipeByIdRequest>,
    ) -> Result<tonic::Response<DeleteRecipeByIdResponse>, tonic::Status> {
        // Middleware but I don't know enough rust to make it smarter
        let auth_errors = check_auth(
            request.metadata(),
            AccessGrant {
                action: AuthAction::DELETE,
                resource: AuthResource::RECIPE,
            },
        );
        match auth_errors {
            Some(s) => return Err(s),
            _ => (),
        }

        // TODO: I have no idea what this does but borrow checker yells at me
        let req = request.into_inner();
        info!("{:?}", req);
        // end Middleware

        match self.repository.delete_recipe(req.recipe_id).await {
            Ok(()) => Ok(Response::new(DeleteRecipeByIdResponse { success: true })),
            Err(e) => Err(Status::unknown(format!("Could not delete: {:?}", e))),
        }

    }

    async fn query_recipes(
        &self,
        request: tonic::Request<RecipeQuery>,
    ) -> Result<tonic::Response<RecipeList>, tonic::Status> {
        info!("QUERY_RECIPES");
        let auth_errors = check_auth(
            request.metadata(),
            AccessGrant {
                action: AuthAction::READ,
                resource: AuthResource::RECIPE,
            },
        );
        match auth_errors {
            Some(s) => return Err(s),
            _ => (),
        }

        // TODO: I have no idea what this does but borrow checker yells at me
        let req = request.into_inner();
        info!("{:?}", req);
        // end Middleware

        let recipes = self.repository.query_recipes(req.id).await;
        match recipes {
            Ok(r) => Ok(Response::new(RecipeList { recipes: r })),
            Err(e) => panic!("{:?}", e),
        }
    }

    async fn post_recipe(
        &self,
        request: tonic::Request<Recipe>,
    ) -> Result<tonic::Response<PostRecipeResponse>, tonic::Status> {
        let auth_errors = check_auth(
            request.metadata(),
            AccessGrant {
                action: AuthAction::CREATE,
                resource: AuthResource::RECIPE,
            },
        );
        match auth_errors {
            Some(s) => return Err(s),
            _ => (),
        }

        // TODO: I have no idea what this does but borrow checker yells at me
        let r: Recipe = request.into_inner();
        // end Middleware
        let new_id = self.repository.save_recipe(r).await;
        match new_id {
            Ok(i) => Ok(Response::new(PostRecipeResponse {
                recipe_id: i.to_hyphenated().to_string(),
            })),
            Err(e) => Err(Status::unknown(format!("Could not save: {:?}", e))),
        }
    }
}

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
    pretty_env_logger::init_timed();

    let addr: std::net::SocketAddr = match env::var("DINNER_HOST") {
        Ok(v) => v.parse().unwrap(),
        Err(_e) => "127.0.0.1:9090".parse().unwrap(),
    };

    let default_repo = "postgres://postgres:abc123@localhost:8002/dinner";
    let repo: String = match env::var("DATABASE_URL") {
        Ok(v) => v.parse().unwrap(),
        Err(_e) => default_repo.parse().unwrap(),
    };

    info!("Configuring postgres repository {}", repo);
    let repository = io::PostgresRepository::new(repo);
    let serviceimpl = MyRecipeService { repository };
    let svc = RecipeServiceServer::new(serviceimpl);
    info!("gRPC server listening on {}", addr);
    Server::builder().add_service(svc).serve(addr).await?;
    Ok(())
}
