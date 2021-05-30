/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "";

export interface Ingredient {
  name: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeEmbedding {
  salt: number;
  fat: number;
  acid: number;
  head: number;
  umami: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string;
  teaserImage: string;
  embedding: RecipeEmbedding | undefined;
  ingredients: RecipeIngredient[];
}

export interface RecipeList {
  recipes: Recipe[];
}

export interface RecipeQuery {
  id: string;
}

export interface PostRecipeResponse {
  recipeId: string;
}

export interface GetRecipyByIdRequest {
  recipeId: string;
}

export interface GetRecipyByIdResponse {
  wasFound: boolean;
  recipe: Recipe | undefined;
}

export interface DeleteRecipeByIdRequest {
  recipeId: string;
}

export interface DeleteRecipeByIdResponse {}

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

const baseRecipeEmbedding: object = {
  salt: 0,
  fat: 0,
  acid: 0,
  head: 0,
  umami: 0,
};

export const RecipeEmbedding = {
  encode(
    message: RecipeEmbedding,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.salt !== 0) {
      writer.uint32(13).float(message.salt);
    }
    if (message.fat !== 0) {
      writer.uint32(21).float(message.fat);
    }
    if (message.acid !== 0) {
      writer.uint32(29).float(message.acid);
    }
    if (message.head !== 0) {
      writer.uint32(37).float(message.head);
    }
    if (message.umami !== 0) {
      writer.uint32(45).float(message.umami);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecipeEmbedding {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecipeEmbedding } as RecipeEmbedding;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.salt = reader.float();
          break;
        case 2:
          message.fat = reader.float();
          break;
        case 3:
          message.acid = reader.float();
          break;
        case 4:
          message.head = reader.float();
          break;
        case 5:
          message.umami = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecipeEmbedding {
    const message = { ...baseRecipeEmbedding } as RecipeEmbedding;
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = Number(object.salt);
    } else {
      message.salt = 0;
    }
    if (object.fat !== undefined && object.fat !== null) {
      message.fat = Number(object.fat);
    } else {
      message.fat = 0;
    }
    if (object.acid !== undefined && object.acid !== null) {
      message.acid = Number(object.acid);
    } else {
      message.acid = 0;
    }
    if (object.head !== undefined && object.head !== null) {
      message.head = Number(object.head);
    } else {
      message.head = 0;
    }
    if (object.umami !== undefined && object.umami !== null) {
      message.umami = Number(object.umami);
    } else {
      message.umami = 0;
    }
    return message;
  },

  toJSON(message: RecipeEmbedding): unknown {
    const obj: any = {};
    message.salt !== undefined && (obj.salt = message.salt);
    message.fat !== undefined && (obj.fat = message.fat);
    message.acid !== undefined && (obj.acid = message.acid);
    message.head !== undefined && (obj.head = message.head);
    message.umami !== undefined && (obj.umami = message.umami);
    return obj;
  },

  fromPartial(object: DeepPartial<RecipeEmbedding>): RecipeEmbedding {
    const message = { ...baseRecipeEmbedding } as RecipeEmbedding;
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = object.salt;
    } else {
      message.salt = 0;
    }
    if (object.fat !== undefined && object.fat !== null) {
      message.fat = object.fat;
    } else {
      message.fat = 0;
    }
    if (object.acid !== undefined && object.acid !== null) {
      message.acid = object.acid;
    } else {
      message.acid = 0;
    }
    if (object.head !== undefined && object.head !== null) {
      message.head = object.head;
    } else {
      message.head = 0;
    }
    if (object.umami !== undefined && object.umami !== null) {
      message.umami = object.umami;
    } else {
      message.umami = 0;
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
    if (message.embedding !== undefined) {
      RecipeEmbedding.encode(
        message.embedding,
        writer.uint32(50).fork()
      ).ldelim();
    }
    for (const v of message.ingredients) {
      RecipeIngredient.encode(v!, writer.uint32(58).fork()).ldelim();
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
          message.embedding = RecipeEmbedding.decode(reader, reader.uint32());
          break;
        case 7:
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
    if (object.embedding !== undefined && object.embedding !== null) {
      message.embedding = RecipeEmbedding.fromJSON(object.embedding);
    } else {
      message.embedding = undefined;
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
    message.embedding !== undefined &&
      (obj.embedding = message.embedding
        ? RecipeEmbedding.toJSON(message.embedding)
        : undefined);
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
    if (object.embedding !== undefined && object.embedding !== null) {
      message.embedding = RecipeEmbedding.fromPartial(object.embedding);
    } else {
      message.embedding = undefined;
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

const baseRecipeQuery: object = { id: "" };

export const RecipeQuery = {
  encode(
    message: RecipeQuery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecipeQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecipeQuery } as RecipeQuery;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecipeQuery {
    const message = { ...baseRecipeQuery } as RecipeQuery;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: RecipeQuery): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<RecipeQuery>): RecipeQuery {
    const message = { ...baseRecipeQuery } as RecipeQuery;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const basePostRecipeResponse: object = { recipeId: "" };

export const PostRecipeResponse = {
  encode(
    message: PostRecipeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recipeId !== "") {
      writer.uint32(10).string(message.recipeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PostRecipeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePostRecipeResponse } as PostRecipeResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PostRecipeResponse {
    const message = { ...basePostRecipeResponse } as PostRecipeResponse;
    if (object.recipeId !== undefined && object.recipeId !== null) {
      message.recipeId = String(object.recipeId);
    } else {
      message.recipeId = "";
    }
    return message;
  },

  toJSON(message: PostRecipeResponse): unknown {
    const obj: any = {};
    message.recipeId !== undefined && (obj.recipeId = message.recipeId);
    return obj;
  },

  fromPartial(object: DeepPartial<PostRecipeResponse>): PostRecipeResponse {
    const message = { ...basePostRecipeResponse } as PostRecipeResponse;
    if (object.recipeId !== undefined && object.recipeId !== null) {
      message.recipeId = object.recipeId;
    } else {
      message.recipeId = "";
    }
    return message;
  },
};

const baseGetRecipyByIdRequest: object = { recipeId: "" };

export const GetRecipyByIdRequest = {
  encode(
    message: GetRecipyByIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recipeId !== "") {
      writer.uint32(10).string(message.recipeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetRecipyByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetRecipyByIdRequest } as GetRecipyByIdRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRecipyByIdRequest {
    const message = { ...baseGetRecipyByIdRequest } as GetRecipyByIdRequest;
    if (object.recipeId !== undefined && object.recipeId !== null) {
      message.recipeId = String(object.recipeId);
    } else {
      message.recipeId = "";
    }
    return message;
  },

  toJSON(message: GetRecipyByIdRequest): unknown {
    const obj: any = {};
    message.recipeId !== undefined && (obj.recipeId = message.recipeId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetRecipyByIdRequest>): GetRecipyByIdRequest {
    const message = { ...baseGetRecipyByIdRequest } as GetRecipyByIdRequest;
    if (object.recipeId !== undefined && object.recipeId !== null) {
      message.recipeId = object.recipeId;
    } else {
      message.recipeId = "";
    }
    return message;
  },
};

const baseGetRecipyByIdResponse: object = { wasFound: false };

export const GetRecipyByIdResponse = {
  encode(
    message: GetRecipyByIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.wasFound === true) {
      writer.uint32(8).bool(message.wasFound);
    }
    if (message.recipe !== undefined) {
      Recipe.encode(message.recipe, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetRecipyByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetRecipyByIdResponse } as GetRecipyByIdResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.wasFound = reader.bool();
          break;
        case 2:
          message.recipe = Recipe.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRecipyByIdResponse {
    const message = { ...baseGetRecipyByIdResponse } as GetRecipyByIdResponse;
    if (object.wasFound !== undefined && object.wasFound !== null) {
      message.wasFound = Boolean(object.wasFound);
    } else {
      message.wasFound = false;
    }
    if (object.recipe !== undefined && object.recipe !== null) {
      message.recipe = Recipe.fromJSON(object.recipe);
    } else {
      message.recipe = undefined;
    }
    return message;
  },

  toJSON(message: GetRecipyByIdResponse): unknown {
    const obj: any = {};
    message.wasFound !== undefined && (obj.wasFound = message.wasFound);
    message.recipe !== undefined &&
      (obj.recipe = message.recipe ? Recipe.toJSON(message.recipe) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetRecipyByIdResponse>
  ): GetRecipyByIdResponse {
    const message = { ...baseGetRecipyByIdResponse } as GetRecipyByIdResponse;
    if (object.wasFound !== undefined && object.wasFound !== null) {
      message.wasFound = object.wasFound;
    } else {
      message.wasFound = false;
    }
    if (object.recipe !== undefined && object.recipe !== null) {
      message.recipe = Recipe.fromPartial(object.recipe);
    } else {
      message.recipe = undefined;
    }
    return message;
  },
};

const baseDeleteRecipeByIdRequest: object = { recipeId: "" };

export const DeleteRecipeByIdRequest = {
  encode(
    message: DeleteRecipeByIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recipeId !== "") {
      writer.uint32(10).string(message.recipeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteRecipeByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteRecipeByIdRequest,
    } as DeleteRecipeByIdRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRecipeByIdRequest {
    const message = {
      ...baseDeleteRecipeByIdRequest,
    } as DeleteRecipeByIdRequest;
    if (object.recipeId !== undefined && object.recipeId !== null) {
      message.recipeId = String(object.recipeId);
    } else {
      message.recipeId = "";
    }
    return message;
  },

  toJSON(message: DeleteRecipeByIdRequest): unknown {
    const obj: any = {};
    message.recipeId !== undefined && (obj.recipeId = message.recipeId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteRecipeByIdRequest>
  ): DeleteRecipeByIdRequest {
    const message = {
      ...baseDeleteRecipeByIdRequest,
    } as DeleteRecipeByIdRequest;
    if (object.recipeId !== undefined && object.recipeId !== null) {
      message.recipeId = object.recipeId;
    } else {
      message.recipeId = "";
    }
    return message;
  },
};

const baseDeleteRecipeByIdResponse: object = {};

export const DeleteRecipeByIdResponse = {
  encode(
    _: DeleteRecipeByIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteRecipeByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteRecipeByIdResponse,
    } as DeleteRecipeByIdResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): DeleteRecipeByIdResponse {
    const message = {
      ...baseDeleteRecipeByIdResponse,
    } as DeleteRecipeByIdResponse;
    return message;
  },

  toJSON(_: DeleteRecipeByIdResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<DeleteRecipeByIdResponse>
  ): DeleteRecipeByIdResponse {
    const message = {
      ...baseDeleteRecipeByIdResponse,
    } as DeleteRecipeByIdResponse;
    return message;
  },
};

export interface RecipeStore {
  GetRecipeById(
    request: DeepPartial<GetRecipyByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetRecipyByIdResponse>;
  DeleteRecipeById(
    request: DeepPartial<DeleteRecipeByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<DeleteRecipeByIdResponse>;
  QueryRecipes(
    request: DeepPartial<RecipeQuery>,
    metadata?: grpc.Metadata
  ): Promise<RecipeList>;
  PostRecipe(
    request: DeepPartial<Recipe>,
    metadata?: grpc.Metadata
  ): Promise<PostRecipeResponse>;
}

export class RecipeStoreClientImpl implements RecipeStore {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  GetRecipeById(
    request: DeepPartial<GetRecipyByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetRecipyByIdResponse> {
    return this.rpc.unary(
      RecipeStoreGetRecipeByIdDesc,
      GetRecipyByIdRequest.fromPartial(request),
      metadata
    );
  }

  DeleteRecipeById(
    request: DeepPartial<DeleteRecipeByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<DeleteRecipeByIdResponse> {
    return this.rpc.unary(
      RecipeStoreDeleteRecipeByIdDesc,
      DeleteRecipeByIdRequest.fromPartial(request),
      metadata
    );
  }

  QueryRecipes(
    request: DeepPartial<RecipeQuery>,
    metadata?: grpc.Metadata
  ): Promise<RecipeList> {
    return this.rpc.unary(
      RecipeStoreQueryRecipesDesc,
      RecipeQuery.fromPartial(request),
      metadata
    );
  }

  PostRecipe(
    request: DeepPartial<Recipe>,
    metadata?: grpc.Metadata
  ): Promise<PostRecipeResponse> {
    return this.rpc.unary(
      RecipeStorePostRecipeDesc,
      Recipe.fromPartial(request),
      metadata
    );
  }
}

export const RecipeStoreDesc = {
  serviceName: "RecipeStore",
};

export const RecipeStoreGetRecipeByIdDesc: UnaryMethodDefinitionish = {
  methodName: "GetRecipeById",
  service: RecipeStoreDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetRecipyByIdRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetRecipyByIdResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const RecipeStoreDeleteRecipeByIdDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteRecipeById",
  service: RecipeStoreDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteRecipeByIdRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...DeleteRecipeByIdResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const RecipeStoreQueryRecipesDesc: UnaryMethodDefinitionish = {
  methodName: "QueryRecipes",
  service: RecipeStoreDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RecipeQuery.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...RecipeList.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const RecipeStorePostRecipeDesc: UnaryMethodDefinitionish = {
  methodName: "PostRecipe",
  service: RecipeStoreDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Recipe.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...PostRecipeResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR
  extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({
            ...this.options?.metadata.headersMap,
            ...metadata?.headersMap,
          })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
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
