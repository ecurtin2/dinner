import React, { FunctionComponent } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe, RecipeList } from "./messages/recipe";
import { getRecipes, getRecipe } from "./Api";

const RecipeCard: FunctionComponent<Recipe> = ({
  id,
  title,
  instructions,
  description,
  teaserImage,
}: Recipe) => (
  <Link key={id}  to={{ pathname: `/recipes/${id}` }}>
    <div className="bg-white hover:bg-bg_primary_muted rounded-xl shadow-md">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            alt="Recipe Teaser"
            className="h-56 w-full object-cover md:w-48 rounded-xl"
            src={`${teaserImage}`}
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

const RecipeCardGrid: FunctionComponent<RecipeList> = ({ recipes, }: RecipeList) => (
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
          src={`${recipe.teaserImage}`}
        ></img>
        <SectionHeader name="Description" />
        {recipe.description}
      </div>

      {/* Ingredients */}
      <div>
        <SectionHeader name="Ingredients" />
        {recipe.ingredients.map((ing) => {
          return (
            <div key={ing.name} className="grid grid-cols-2 w-1/2">
              <div className="">{ing.name}</div>
              <div className="text-right">{ing.quantity} {ing.unit}</div>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div>
        <SectionHeader name="Instructions" />
        {recipe.instructions}
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

function RecipePage() {
    const { id } = useParams<{ id: string }>();
    const [recipe_to_render, set_recipe] = React.useState<Recipe | undefined>(undefined);
    React.useEffect( () => {
            const getmyrecipe = async () => {
                await getRecipe(id).then(set_recipe);
            };
            getmyrecipe();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    if (recipe_to_render === undefined) {
      return RecipeNotFound(id);
    } else {
      return SingleRecipePage(recipe_to_render);
    }
}

function MultiRecipePage() {
    const default_r: Recipe[] = [];
    const [recipes_to_render, set_recipes] = React.useState(default_r);

    try {
    React.useEffect( () => {
            const getmyrecipes = async () => {
                await getRecipes().then(r => set_recipes(r ?? default_r));
            };
            getmyrecipes();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return <RecipeCardGrid recipes={recipes_to_render} />;
  } catch (e: any) {
    console.log("Error on recipe card grid", e)
    return <RecipeCardGrid recipes={[]} />;
  }
}

export { RecipeCardGrid, RecipeCard, SingleRecipePage, RecipePage, MultiRecipePage };
