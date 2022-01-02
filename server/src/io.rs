use crate::recipe::Recipe;
use log::{debug, info};
use prost::{DecodeError, Message};
use std::fs;
use std::fs::File;
use std::io::{Cursor, Error, Write};
use sqlx::postgres::PgPoolOptions;
use sqlx;
use futures::executor::block_on;

pub trait Repository {
    fn load_recipe_by_id(&self, id: String) -> Recipe;
    fn save_recipe(&self, r: Recipe);
    fn delete_recipe(&self, id: String);
    fn query_recipes(&self, id: String) -> Result<Vec<Recipe>, Error>;
}

fn load_recipe_from_file(name: String) -> Result<Recipe, DecodeError> {
    debug!("Reading recipe from local file: {}", name);
    let data = fs::read(name).expect("Unable to read file");
    let recipe = Recipe::decode(&mut Cursor::new(data));
    match recipe {
        Ok(ref r) => info!("Successfully loaded {}", r.id),
        Err(ref _e) => (),
    }
    recipe
}

pub struct FileRepository {
    root_dir: String,
}

impl FileRepository {
    pub fn new(root_dir: String) -> Self {
        Self { root_dir }
    }
    fn get_path(&self, id: &String) -> String {
        format!("{}/recipe_{}.pb", self.root_dir, id)
    }
}

impl Repository for FileRepository {
    fn load_recipe_by_id(&self, id: String) -> Recipe {
        let path = self.get_path(&id);
        info!("Loading recipe {} from {}", id, path);
        let recipe = load_recipe_from_file(path);
        match recipe {
            Ok(r) => {
                info!("Success reading {}", id);
                r
            }
            Err(ref e) => panic!("Error trying to read recipe {}: {}", id, e),
        }
    }

    fn delete_recipe(&self, id: String) {
        let r = fs::remove_file(self.get_path(&id));
        match r {
            Ok(_) => info!("Deleted recipe {}", id),
            Err(_e) => info!("Error when deleting recipe {}", id),
        }
    }

    fn query_recipes(&self, id: String) -> Result<Vec<Recipe>, Error> {
        info!("QUERYING RECIPE {}", id);
        let mut entries = fs::read_dir("data")?
            .map(|res| res.map(|e| e.path()))
            .collect::<Result<Vec<_>, Error>>()?;
        entries.sort();
        let mut recipes: Vec<Recipe> = Vec::new();
        for entry in entries {
            let r = load_recipe_from_file(entry.into_os_string().into_string().unwrap());
            match r {
                Ok(recipe) => recipes.push(recipe),
                Err(_e) => (),
            }
        }
        Ok(recipes)
    }

    fn save_recipe(&self, r: Recipe) {
        info!("saving recipe: {:?}", r.id);
        let mut file = File::create(self.get_path(&r.id)).expect("cannot open");
        let mut buf: Vec<u8> = Vec::with_capacity(1000);
        r.encode(&mut buf).unwrap();
        file.write_all(&buf).expect("failed to write ");
    }
}


pub struct PostgresRepository {
    pool: sqlx::postgres::PgPool,
}

impl PostgresRepository {
    pub fn new(conn_str: String) -> Self {
        let pool = block_on(PgPoolOptions::new().max_connections(5).connect(&conn_str));
        match pool {
            Ok(p) => PostgresRepository { pool: p },
            Err(_e) => panic!("error when creating postgres pool")
        }
    }
}

impl Repository for PostgresRepository {
    fn load_recipe_by_id(&self, id: String) -> Recipe {

    }
    fn save_recipe(&self, r: Recipe) {

    }
    fn delete_recipe(&self, id: String) {

    }
    fn query_recipes(&self, id: String) -> Result<Vec<Recipe>, Error> {

    }
}
