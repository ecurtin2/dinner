use std::fs::File;
use std::fs;
use std::fs::OpenOptions;
use std::io::{Write, Read, Cursor};
use prost::{Message, DecodeError};
use crate::recipe::Recipe;
use log::{debug, info};


pub fn load_recipe_from_file(name: String) -> Result<Recipe, DecodeError> {
    debug!("Reading recipe from local file: {}", name);
    let data = fs::read(name).expect("Unable to read file");
    let recipe = Recipe::decode(&mut Cursor::new(data));
    match recipe {
        Ok(ref r) =>  println!("{}", r.description),
        Err(ref _e) => (),
    }
    recipe
}

pub fn load_recipe(id: String) -> Recipe {
    debug!("Loading recipe {}", id);
    let fname = format!("data/recipe_{}.pb", id);
    let recipe = load_recipe_from_file(fname);
    match recipe {
        Ok(r) => {
            info!("Success reading {}", id);
            r
        }
        Err(ref e) => panic!("Error trying to read recipe {}: {}", id, e)
    }
}

pub fn delete_recipe(id: String) {
    debug!("Deleting a recipe {}", id)
}

pub fn query_recipes(id: String) -> Vec<Recipe> {
    debug!("querying for a recipe {}", id);
    vec![load_recipe(id)]
}

pub fn save_recipe(r: Recipe) -> String {
    println!("saving recipe: {:?}", r);
    let path = format!("data/recipe_{}.pb", r.id);
    // Clone because of borrow checker and returning it but that might be stupid.
    let mut file = File::create(path.clone()).expect("cannot open");
    let mut buf: Vec<u8> = Vec::with_capacity(1000);
    r.encode(&mut buf).unwrap();
    file.write_all(&buf).expect("failed to write ");
    path
}
