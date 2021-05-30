import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { RecipeStoreClientImpl, Recipe, GrpcWebImpl } from "./messages/recipe";
import { grpc } from '@improbable-eng/grpc-web';

const rpc = new GrpcWebImpl('http://localhost:8080', {
  transport: NodeHttpTransport(),
  debug: true,
  metadata: new grpc.Metadata(),
});

const client = new RecipeStoreClientImpl(rpc);

export async function getRecipes(): Promise<Recipe[]> {
  console.log("[GET] recipes");
  const r_list = await client.QueryRecipes({id: "*"});
  return r_list.recipes;
}

export function getRecipe(id: string): Promise<Recipe | undefined> {
  console.log("[GET] recipe/" + id);
  const response = client.GetRecipeById({recipeId: id})
  const recipe: Promise<Recipe | undefined> = response.then(r => {
      if (r.wasFound) {
        return r.recipe;
      } else {
        return undefined;
      }
  })
  return recipe
}


export function deleteRecipe(id: string): Promise<boolean> {
    console.log("[DELETE] recipe/" + id);
    const response = client.DeleteRecipeById({recipeId: id});
    return response.then(r => true);
}

export function postRecipe(recipe: Recipe): Promise<string> {
  console.log("[POST] recipe");
  const response = client.PostRecipe(recipe);
  return response.then(r => r.recipeId);
}
