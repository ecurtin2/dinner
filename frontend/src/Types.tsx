export type Ingredient = {
  name: string;
};

export type RecipeIngredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  paragraph: string;
  ingredients: RecipeIngredient[];
  teaser_image_png_b64: string;
};

export type RecipeList = {
  recipes: Recipe[];
};
