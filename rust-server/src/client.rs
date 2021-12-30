use recipe::recipe_service_client::RecipeServiceClient;
use recipe::{GetRecipeByIdRequest, RecipeEmbedding, Recipe, RecipeQuery};
use tonic::{metadata::MetadataValue, transport::Channel, Request};
mod io;

pub mod recipe {
    tonic::include_proto!("recipe");
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

     let r = Recipe {
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
    println!("{:?}", &r);
    io::save_recipe(r.clone());
    println!("SAVED RECIPE");

    let channel = Channel::from_static("http://[::1]:50051").connect().await?;
    let token = MetadataValue::from_str("eJYze....")?;
    let mut client = RecipeServiceClient::with_interceptor(channel, move |mut req: Request<()>| {
        req.metadata_mut().insert("authorization", token.clone());
        Ok(req)
    });

    let request = tonic::Request::new(GetRecipeByIdRequest {
        recipe_id: r.id,
    });
    let response = client.get_recipe_by_id(request).await?;
    println!("RESPONSE={:?}", response);


    let r2 = Recipe {
        id: "2".into(),
        title: "My Posted recipe".into(),
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
    let request2 = tonic::Request::new( r2 );
    let response2 = client.post_recipe(request2).await?;
    println!("RESPONSE={:?}", response2);


    let request3 = tonic::Request::new(RecipeQuery {
        id: "2".to_string(),
    });
    let response3 = client.query_recipes(request3).await?;
    println!("RESPONSE3={:?}", response3);

    Ok(())
}
