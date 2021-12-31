use std::fs::File;
use std::fs;
use std::io::{Write, Cursor, Error};
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

pub fn query_recipes(id: String) -> Result<Vec<Recipe>, Error> {
    info!("QUERYING RECIPE {}", id);
    let mut entries = fs::read_dir("data")?
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, Error>>()?;
    entries.sort();

    println!("{:?}", entries);

    debug!("querying for a recipe {}", id);
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
