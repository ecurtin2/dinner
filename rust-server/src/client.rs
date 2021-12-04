use recipe::recipe_service_client::RecipeServiceClient;
use recipe::GetRecipeByIdRequest;

pub mod recipe {
    tonic::include_proto!("recipe");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut client = RecipeServiceClient::connect("http://[::1]:50051").await?;
    let request = tonic::Request::new(GetRecipeByIdRequest {
        recipe_id: "1".into(),
    });
    let response = client.get_recipe_by_id(request).await?;
    println!("RESPONSE={:?}", response);
    Ok(())
}
