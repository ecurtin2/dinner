mod io;
mod recipe {
    tonic::include_proto!("recipe");
}

use tonic::{
    metadata::MetadataMap, metadata::MetadataValue, transport::Server, Request, Response, Status,
};

use crate::io::Repository;
use crate::recipe::recipe_service_server::{RecipeService, RecipeServiceServer};
use crate::recipe::{
    DeleteRecipeByIdRequest, DeleteRecipeByIdResponse, GetRecipeByIdRequest, GetRecipeByIdResponse,
    PostRecipeResponse, Recipe, RecipeList, RecipeQuery,
};
use log::info;
use std::env;
use uuid::Uuid;

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
    repository: io::FileRepository,
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

        let r = self.repository.load_recipe_by_id(req.recipe_id);
        let reply = GetRecipeByIdResponse {
            was_found: true,
            recipe: Some(r),
        };
        Ok(Response::new(reply))
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

        self.repository.delete_recipe(req.recipe_id);
        let response = DeleteRecipeByIdResponse { success: true };
        Ok(Response::new(response))
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

        let recipes = self.repository.query_recipes(req.id);
        match recipes {
            Ok(r) => Ok(Response::new(RecipeList { recipes: r })),
            Err(_e) => panic!(),
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
        let mut r: Recipe = request.into_inner();
        info!("{:?}", r);
        // end Middleware
        if r.id.is_empty() {
            r.id = Uuid::new_v4().to_hyphenated().to_string();
        }
        self.repository.save_recipe(r.clone());

        let result = PostRecipeResponse {
            recipe_id: r.id.into(),
        };
        Ok(Response::new(result))
    }
}

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
    pretty_env_logger::init_timed();

    let addr = match env::var("DINNER_HOST") {
        Ok(v) => v.parse().unwrap(),
        Err(_e) => "127.0.0.1:9090".parse().unwrap(),
    };
    let repository = io::FileRepository::new("./data".to_string());
    let serviceimpl = MyRecipeService { repository };
    let svc = RecipeServiceServer::new(serviceimpl);
    info!("gRPC server listening on {}", addr);
    Server::builder().add_service(svc).serve(addr).await?;
    return Ok(());
}
