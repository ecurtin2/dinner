/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "Recipes";

export interface Ingredient {
  name: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string;
  teaserImage: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeList {
  recipes: Recipe[];
}

const baseIngredient: object = { name: "" };

export const Ingredient = {
  encode(
    message: Ingredient,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ingredient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIngredient } as Ingredient;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Ingredient {
    const message = { ...baseIngredient } as Ingredient;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: Ingredient): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<Ingredient>): Ingredient {
    const message = { ...baseIngredient } as Ingredient;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseRecipeIngredient: object = { name: "", quantity: 0, unit: "" };

export const RecipeIngredient = {
  encode(
    message: RecipeIngredient,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    if (message.unit !== "") {
      writer.uint32(26).string(message.unit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecipeIngredient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecipeIngredient } as RecipeIngredient;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.quantity = reader.int32();
          break;
        case 3:
          message.unit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecipeIngredient {
    const message = { ...baseRecipeIngredient } as RecipeIngredient;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = Number(object.quantity);
    } else {
      message.quantity = 0;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = String(object.unit);
    } else {
      message.unit = "";
    }
    return message;
  },

  toJSON(message: RecipeIngredient): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.quantity !== undefined && (obj.quantity = message.quantity);
    message.unit !== undefined && (obj.unit = message.unit);
    return obj;
  },

  fromPartial(object: DeepPartial<RecipeIngredient>): RecipeIngredient {
    const message = { ...baseRecipeIngredient } as RecipeIngredient;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = object.quantity;
    } else {
      message.quantity = 0;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = object.unit;
    } else {
      message.unit = "";
    }
    return message;
  },
};

const baseRecipe: object = {
  id: "",
  title: "",
  description: "",
  instructions: "",
  teaserImage: "",
};

export const Recipe = {
  encode(
    message: Recipe,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.instructions !== "") {
      writer.uint32(34).string(message.instructions);
    }
    if (message.teaserImage !== "") {
      writer.uint32(42).string(message.teaserImage);
    }
    for (const v of message.ingredients) {
      RecipeIngredient.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Recipe {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecipe } as Recipe;
    message.ingredients = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.instructions = reader.string();
          break;
        case 5:
          message.teaserImage = reader.string();
          break;
        case 6:
          message.ingredients.push(
            RecipeIngredient.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Recipe {
    const message = { ...baseRecipe } as Recipe;
    message.ingredients = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.instructions !== undefined && object.instructions !== null) {
      message.instructions = String(object.instructions);
    } else {
      message.instructions = "";
    }
    if (object.teaserImage !== undefined && object.teaserImage !== null) {
      message.teaserImage = String(object.teaserImage);
    } else {
      message.teaserImage = "";
    }
    if (object.ingredients !== undefined && object.ingredients !== null) {
      for (const e of object.ingredients) {
        message.ingredients.push(RecipeIngredient.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Recipe): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.instructions !== undefined &&
      (obj.instructions = message.instructions);
    message.teaserImage !== undefined &&
      (obj.teaserImage = message.teaserImage);
    if (message.ingredients) {
      obj.ingredients = message.ingredients.map((e) =>
        e ? RecipeIngredient.toJSON(e) : undefined
      );
    } else {
      obj.ingredients = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Recipe>): Recipe {
    const message = { ...baseRecipe } as Recipe;
    message.ingredients = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.instructions !== undefined && object.instructions !== null) {
      message.instructions = object.instructions;
    } else {
      message.instructions = "";
    }
    if (object.teaserImage !== undefined && object.teaserImage !== null) {
      message.teaserImage = object.teaserImage;
    } else {
      message.teaserImage = "";
    }
    if (object.ingredients !== undefined && object.ingredients !== null) {
      for (const e of object.ingredients) {
        message.ingredients.push(RecipeIngredient.fromPartial(e));
      }
    }
    return message;
  },
};

const baseRecipeList: object = {};

export const RecipeList = {
  encode(
    message: RecipeList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.recipes) {
      Recipe.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecipeList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecipeList } as RecipeList;
    message.recipes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipes.push(Recipe.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecipeList {
    const message = { ...baseRecipeList } as RecipeList;
    message.recipes = [];
    if (object.recipes !== undefined && object.recipes !== null) {
      for (const e of object.recipes) {
        message.recipes.push(Recipe.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: RecipeList): unknown {
    const obj: any = {};
    if (message.recipes) {
      obj.recipes = message.recipes.map((e) =>
        e ? Recipe.toJSON(e) : undefined
      );
    } else {
      obj.recipes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RecipeList>): RecipeList {
    const message = { ...baseRecipeList } as RecipeList;
    message.recipes = [];
    if (object.recipes !== undefined && object.recipes !== null) {
      for (const e of object.recipes) {
        message.recipes.push(Recipe.fromPartial(e));
      }
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
