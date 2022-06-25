import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { RecipeServiceClientImpl, Recipe, GrpcWebImpl } from "./messages/recipe";
import { grpc } from '@improbable-eng/grpc-web';

const meta = new grpc.Metadata({"authorization-token": "eJYze...."})

const URL = process.env.REACT_APP_API_URL!;

const rpc = new GrpcWebImpl(URL, {
  transport: NodeHttpTransport(),
  debug: false,
  metadata: meta,
});

const client = new RecipeServiceClientImpl(rpc);

export function loginUser(googleId: string, accessToken: string, tokenId: string) {
    meta.append("google-id", googleId);
    meta.append("google-access-token", accessToken);
    meta.append("google-token-id", tokenId);
    console.log("Logged in user: " + googleId);
}

export function isLoggedIn(): boolean {
    return meta.has("google-id");
}

export async function getRecipes(): Promise<Recipe[]> {
  console.log(URL + "[GET] recipes");
  const r_list = await client.QueryRecipes({id: "*"});
  return r_list.recipes;
}

export function getRecipe(id: string): Promise<Recipe | undefined> {
  console.log(URL + " [GET] recipe/" + id);
  const response = client.GetRecipeById({recipeId: id})
  const recipe: Promise<Recipe | undefined> = response.then(r => {
      if (r.wasFound) {
        return r.recipe;
      } else {
        return undefined;
      }
  }).catch(error => {return undefined})
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
