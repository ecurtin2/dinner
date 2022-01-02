use recipe::recipe_service_client::RecipeServiceClient;
use recipe::{GetRecipeByIdRequest, Recipe, RecipeEmbedding, RecipeQuery};
use std::env;
use tonic::{metadata::MetadataValue, transport::Channel, transport::Uri, Request};

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

    let addr =
        "http://".to_owned() + &env::var("DINNER_HOST").unwrap_or("127.0.0.1:9090".to_string());
    let uri: Uri = addr.parse().unwrap();
    let channel = match Channel::builder(uri.clone()).connect().await {
        Ok(c) => c,
        Err(_e) => panic!("Cannot connect to: {}", uri),
    };

    let token = MetadataValue::from_str("eJYze....")?;
    let mut client = RecipeServiceClient::with_interceptor(channel, move |mut req: Request<()>| {
        req.metadata_mut()
            .insert("authorization-token", token.clone());
        Ok(req)
    });

    let _post_response = client.post_recipe(tonic::Request::new(r.clone())).await?;
    let request = tonic::Request::new(GetRecipeByIdRequest { recipe_id: r.id });
    // TODO: reread the error handling part of rust book lmao
    let recipe_returned = client
        .get_recipe_by_id(request)
        .await?
        .into_inner()
        .recipe
        .unwrap();
    println!("get_recipe_by_id for {:}", recipe_returned.id);

    let r2 = Recipe {
        id: "".into(),
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
    let request2 = tonic::Request::new(r2);
    let response2 = client.post_recipe(request2).await?.into_inner();
    println!("RESPONSE={:?}", response2);

    let request3 = tonic::Request::new(RecipeQuery {
        id: "2".to_string(),
    });
    let listed_recipes = client.query_recipes(request3).await?.into_inner().recipes;
    let ids: Vec<String> = listed_recipes.into_iter().map(|r| r.id).collect();
    println!("Listed ids={:#?}", ids);

    Ok(())
}
