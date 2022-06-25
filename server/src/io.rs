use crate::recipe::{Recipe, RecipeEmbedding};
use chrono;
use futures::executor::block_on;
use log::{debug, info};
use sqlx;
use sqlx::postgres::PgPoolOptions;
use sqlx::types::Uuid;

pub struct PostgresRepository {
    pool: sqlx::postgres::PgPool,
}

#[derive(Debug, sqlx::FromRow)]
struct Id {
    id: sqlx::types::Uuid,
}

#[derive(Debug, sqlx::FromRow)]
struct User {
    id: sqlx::types::Uuid,
    name: String,
}

#[derive(Debug, sqlx::FromRow)]
struct RecipeRow {
    id: sqlx::types::Uuid,
    created_at: chrono::DateTime<chrono::Utc>,
    title: String,
    description: String,
    // b64 encodded string? TODO: should probably be smarter
    teaser_image: String,
    instructions: String,
}

fn convert(r: &RecipeRow) -> Recipe {
    Recipe {
        id: r.id.to_hyphenated().to_string(),
        description: r.description.clone(),
        teaser_image: r.teaser_image.clone(),
        embedding: Some(RecipeEmbedding {
            salt: 0.1,
            fat: 0.15,
            acid: 0.25,
            heat: 0.3,
            umami: 0.5,
        }),
        ingredients: vec![],
        instructions: r.instructions.clone(),
        title: r.title.clone(),
    }
}

impl PostgresRepository {
    pub fn new(conn_str: String) -> Self {
        let pool = block_on(PgPoolOptions::new().max_connections(5).connect(&conn_str));
        match pool {
            Ok(p) => PostgresRepository { pool: p },
            Err(e) => panic!("error when creating postgres pool {:?}", e),
        }
    }

    pub async fn get_users(&self) -> Result<(), sqlx::Error> {
        let users: Vec<User> = sqlx::query_as::<_, User>("SELECT * FROM users")
            .fetch_all(&self.pool)
            .await?;
        println!("{:#?}", users);
        Ok(())
    }

    pub async fn load_recipe_by_id(&self, id: String) -> Result<Recipe, sqlx::Error> {
        info!("Loading recipe {}", id);
        let uuid = match Uuid::parse_str(&id) {
            Ok(u) => Ok(u),
            Err(e) => Err(sqlx::Error::Decode(format!("Bad uuid {}", e).into()))
        }?;
        let recipe: RecipeRow =
            sqlx::query_as::<_, RecipeRow>("SELECT * FROM recipes where id = $1")
                .bind(uuid)
                .fetch_one(&self.pool)
                .await?;
        Ok(convert(&recipe))
    }

    pub async fn save_recipe(&self, r: Recipe) -> Result<sqlx::types::Uuid, sqlx::Error> {
        info!("Saving {}", r.title);
        let result: Id = sqlx::query_as(
            r#"
        INSERT INTO recipes (title, description, teaser_image, instructions) values($1, $2, $3, $4)
        RETURNING id
        "#,
        )
        .bind(r.title)
        .bind(r.description)
        .bind(r.teaser_image)
        .bind(r.instructions)
        .fetch_one(&self.pool)
        .await?;
        info!("Saved recipe as {}", result.id);
        Ok(result.id)
    }

    pub async fn delete_recipe(&self, id: String) -> Result<(), sqlx::Error> {
        info!("Deleting recipe {}", id);
        let uuid = match Uuid::parse_str(&id) {
            Ok(u) => Ok(u),
            Err(e) => Err(sqlx::Error::Decode(format!("Bad uuid {}", e).into()))
        }?;
        sqlx::query("DELETE FROM recipes where id = $1").bind(uuid).execute(&self.pool).await?;
        Ok(())
    }
    pub async fn query_recipes(&self, id: String) -> Result<Vec<Recipe>, sqlx::Error> {
        info!("Querying recipes {}", id);
        let recipes: Vec<RecipeRow> = sqlx::query_as::<_, RecipeRow>("SELECT * FROM recipes")
            .fetch_all(&self.pool)
            .await?;
        let result: Vec<Recipe> = recipes.iter().map(convert).collect();
        info!("Query returned {} recipes", result.len());
        Ok(result)
    }
}
