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
    <div className="bg-white hover:bg-primary_muted rounded-xl shadow-md">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            alt="Recipe Teaser"
            className="h-56 w-full object-cover md:w-48 rounded-xl"
            src={`${teaser_image_png_b64}`}
          ></img>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-primary font-semibold">
            {title}
          </div>

          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {description}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

const RecipeCardGrid: FunctionComponent<RecipeList> = ({
  recipes,
}: RecipeList) => (
  <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
    {recipes.map(RecipeCard)}
  </div>
);

type SectionHeaderProps = {
    name: string;
}

function SectionHeader(props: SectionHeaderProps) {
    return <h1 className="text-2xl pb-4 pt-8">{props.name}</h1>
}

function SingleRecipePage(recipe: Recipe) {
  return (
    <div className="max-w-screen-md m-auto">
      {/* Header */}
      <div>
        <SectionHeader name={recipe.title} />
        <img
          alt="teaser"
          className="object-scale-down object-center m-auto"
          src={`${recipe.teaser_image_png_b64}`}
        ></img>
        <SectionHeader name="Description" />
        {recipe.description}
      </div>

      {/* Ingredients */}
      <div>
        <SectionHeader name="Ingredients" />
        {recipe.ingredients.map((ing) => {
          return (
            <div className="grid grid-cols-2 w-1/2">
              <div className="">{ing.name}</div>
              <div className="text-right">{ing.quantity} {ing.unit}</div>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div>
        <SectionHeader name="Instructions" />
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

export { RecipeCardGrid, RecipeCard, SingleRecipePage,  RecipesPage };
