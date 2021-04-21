import React, { FunctionComponent } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe, RecipeList } from "./Types";
import { getRecipes, getRecipe } from "./Api";

const RecipeCard: FunctionComponent<Recipe> = ({
  id,
  title,
  paragraph,
  description,
  teaser_image_png_b64,
}: Recipe) => (
  <Link to={{ pathname: `/recipes/${id}` }}>
    <div className="bg-white hover:bg-gray-200 rounded-xl shadow-md m-2">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            alt="Recipe Teaser"
            className="h-48 w-full object-cover md:w-48 rounded-xl"
            src={`${teaser_image_png_b64}`}
          ></img>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>

          <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {description}
          </p>
          <p className="mt-2 text-gray-500">{paragraph}</p>
        </div>
      </div>
    </div>
  </Link>
);

const RecipeCardGrid: FunctionComponent<RecipeList> = ({
  recipes,
}: RecipeList) => (
  <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
    {recipes.map(RecipeCard)}
  </div>
);

function SingleRecipePage(recipe: Recipe) {
  return (
    <div className="divide-y-4 divide-yellow-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl">{recipe.title}</h1>
        <img
          alt="teaser"
          className="h-96 object-scale-down object-center m-auto"
          src={`${recipe.teaser_image_png_b64}`}
        ></img>
        <h1 className="text-2xl">Description</h1>
        {recipe.description}
      </div>

      {/* Ingredients */}
      <div>
        <h1 className="text-2xl">Ingredients</h1>
        {recipe.ingredients.map((ing) => {
          return (
            <div className="grid grid-cols-3 gap-4 m-auto w-1/2">
              <div>{ing.name}</div>
              <div>{ing.quantity}</div>
              <div>{ing.unit}</div>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div>
        <h1 className="text-2xl">Instructions</h1>
        {recipe.paragraph}
      </div>
    </div>
  );
}

function RecipeNotFound(id: string) {
  return (
    <div>
      <h1>Recipe: {id} not found</h1>
    </div>
  );
}

function RecipesPage() {
  let recipes: Recipe[] = getRecipes();
  const { id } = useParams<{ id: string }>();
  if (id) {
    let recipe = getRecipe(id);
    if (recipe === undefined) {
      return RecipeNotFound(id);
    } else {
      return SingleRecipePage(recipe);
    }
  } else {
    return <RecipeCardGrid recipes={recipes} />;
  }
}

export { RecipeCardGrid, RecipeCard, SingleRecipePage };
export default RecipesPage;
