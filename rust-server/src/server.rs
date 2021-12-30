mod io;

use tonic::{
    metadata::MetadataMap, metadata::MetadataValue, Request, Response, Status, transport::Server,
};

use recipe::{
    DeleteRecipeByIdRequest, DeleteRecipeByIdResponse, GetRecipeByIdRequest, GetRecipeByIdResponse,
    PostRecipeResponse, Recipe, RecipeList, RecipeQuery,
};
use recipe::recipe_service_server::{RecipeService, RecipeServiceServer};

extern crate pretty_env_logger;
#[macro_use]
extern crate log;
pub mod recipe {
    tonic::include_proto!("recipe");
}


#[derive(Eq, PartialEq)]
enum AuthAction {
    CREATE,
    READ,
    DELETE,
}

#[derive(Eq, PartialEq)]
enum AuthResource {
    RECIPE,
}

#[derive(Eq, PartialEq)]
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
    let user_token = meta.get("authorization");
    let user_role = match user_token {
        Some(user_token) if user_token == token => &ADMIN_ROLE,
        _ => &UNAUTHENTICATED_USER_ROLE,
    };
    let allowed: bool = user_role.contains(&requires);
    match allowed {
        true => None,
        false => Some(Status::unauthenticated("Access denied")),
    }
}

#[derive(Debug, Default)]
pub struct MyRecipeService {}

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
                action: AuthAction::CREATE,
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

        let r = io::load_recipe(req.recipe_id);
        let reply = recipe::GetRecipeByIdResponse {
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

        io::delete_recipe(req.recipe_id);
        let response = DeleteRecipeByIdResponse { success: true };
        Ok(Response::new(response))
    }

    async fn query_recipes(
        &self,
        request: tonic::Request<RecipeQuery>,
    ) -> Result<tonic::Response<RecipeList>, tonic::Status> {
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

        let recipes = io::query_recipes(req.id);
        let result = RecipeList {recipes};
        Ok(Response::new(result))
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
        let req = request.into_inner();
        info!("{:?}", req);
        // end Middleware
        let id = io::save_recipe(req);

        let result = PostRecipeResponse {
            recipe_id: id.into(),
        };
        Ok(Response::new(result))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    pretty_env_logger::init_timed();
    let addr = "[::1]:50051".parse().unwrap();
    let serviceimpl = MyRecipeService::default();
    let svc = RecipeServiceServer::new(serviceimpl);
    info!("gRPC server listening on {}", addr);
    Server::builder().add_service(svc).serve(addr).await?;
    return Ok(());
}
