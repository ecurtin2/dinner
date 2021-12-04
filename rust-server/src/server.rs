use tonic::{transport::Server, Request, Response, Status};

use recipe::recipe_service_server::{RecipeService, RecipeServiceServer};
use recipe::{
    DeleteRecipeByIdRequest, DeleteRecipeByIdResponse, GetRecipeByIdRequest, GetRecipeByIdResponse,
    PostRecipeResponse, Recipe, RecipeEmbedding, RecipeList, RecipeQuery,
};

pub mod recipe {
    tonic::include_proto!("recipe");
}

#[derive(Debug, Default)]
pub struct MyRecipeService {}

#[tonic::async_trait]
impl RecipeService for MyRecipeService {
    async fn get_recipe_by_id(
        &self,
        request: Request<GetRecipeByIdRequest>,
    ) -> Result<Response<GetRecipeByIdResponse>, Status> {
        println!("Got a request: {:?}", request);

        let reply = recipe::GetRecipeByIdResponse {
            was_found: true,
            recipe: Some(Recipe {
                id: "1".into(),
                title: "My recipe".into(),
                description: "my description".into(),
                instructions: "instructinos go here".into(),
                teaser_image: "this might crash everything".into(),
                embedding: Some(RecipeEmbedding {
                    salt: 0.1,
                    fat: 0.15,
                    acid: 0.25,
                    heat: 0.3,
                    umami: 0.5,
                }),
                ingredients: vec![],
            }),
        };

        Ok(Response::new(reply))
    }

    async fn delete_recipe_by_id(
        &self,
        request: tonic::Request<DeleteRecipeByIdRequest>,
    ) -> Result<tonic::Response<DeleteRecipeByIdResponse>, tonic::Status> {
        let response = DeleteRecipeByIdResponse { success: true };
        Ok(Response::new(response))
    }

    async fn query_recipes(
        &self,
        request: tonic::Request<RecipeQuery>,
    ) -> Result<tonic::Response<RecipeList>, tonic::Status> {
        let recipe_result = recipe::Recipe {
            id: "1".into(),
            title: "My recipe".into(),
            description: "my description".into(),
            instructions: "instructinos go here".into(),
            teaser_image: "this might crash everything".into(),
            embedding: Some(RecipeEmbedding {
                salt: 0.1,
                fat: 0.15,
                acid: 0.25,
                heat: 0.3,
                umami: 0.5,
            }),
            ingredients: vec![],
        };

        let result = RecipeList {
            recipes: vec![recipe_result],
        };
        Ok(Response::new(result))
    }

    async fn post_recipe(
        &self,
        request: tonic::Request<Recipe>,
    ) -> Result<tonic::Response<PostRecipeResponse>, tonic::Status> {
        let result = PostRecipeResponse {
            recipe_id: "1".into(),
        };
        Ok(Response::new(result))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "[::1]:50051".parse()?;
    let service = MyRecipeService::default();

    Server::builder()
        .add_service(RecipeServiceServer::new(service))
        .serve(addr)
        .await?;

    Ok(())
}
