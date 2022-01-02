import { getRecipes, deleteRecipe } from "./Api";
import { Link } from "react-router-dom";
import React, { FunctionComponent } from "react";
import { Recipe } from "./messages/recipe";


const EditableRecipeRow: FunctionComponent<Recipe> = ({
    title,
    id,
    description,
}: Recipe) => (
    <div key={id} className="h-24 rounded-xl bg-bg_primary p-3 grid grid-cols-6">
        <div className="font-bold text-primary">{title}</div>
        <div className="col-span-4">{description}</div>
        <div className="">
        <Link to={{ pathname: `/edit-recipe/${id}` }}>
            <button
                type="submit"
                className="justify-self-center bg-primary rounded-xl font-bold w-20 h-9 m-1 text-white hover:bg-primary_muted"
            >
                Edit
            </button>
        </Link>
        {/* TODO: Reloading page was the easiest way for me to get this working but i dont think it's what you're sposed to do */}
            <button
                type="submit"
                onClick={(e) => deleteRecipe(id).then(() => window.location.reload())}
                className="justify-self-center bg-error rounded-xl font-bold h-9 w-20 m-1 text-white hover:bg-error_muted"
            >
                Delete
            </button>
        </div>
    </div>
)


const UserEditableRecipes: FunctionComponent<Recipe[]> = (recipes: Recipe[]) => (
    <div>   
        <Link to={{ pathname: `/edit-recipe/new` }}><div className="w-48 h-24 p-8 mb-4 bg-primary hover:bg-bg_primary_muted rounded-xl shadow-md">Create New</div></Link>
        <div className='grid md:grid-rows-1 gap-4'>{recipes.map(EditableRecipeRow)}</div>
    </div>
);


export function AdminRecipesPage() {
    const default_r: Recipe[] = [];
    const [recipes_to_render, set_recipes] = React.useState(default_r);
    React.useEffect(() => {
        const getmyrecipes = async () => {
            await getRecipes().then(set_recipes);
        };
        getmyrecipes();
    },
        []
    );

    return UserEditableRecipes(recipes_to_render);
}
