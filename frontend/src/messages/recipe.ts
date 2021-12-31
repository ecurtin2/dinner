/* eslint-disable */
import Long from "long";
import { grpc } from "@improbable-eng/grpc-web";
import _m0 from "protobufjs/minimal";
import { BrowserHeaders } from "browser-headers";

export const protobufPackage = "recipe";

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
  heat: number;
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

export interface GetRecipeByIdRequest {
  recipeId: string;
}

export interface GetRecipeByIdResponse {
  wasFound: boolean;
  recipe: Recipe | undefined;
}

export interface DeleteRecipeByIdRequest {
  recipeId: string;
}

export interface DeleteRecipeByIdResponse {
  success: boolean;
}

function createBaseIngredient(): Ingredient {
  return { name: "" };
}

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
    const message = createBaseIngredient();
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
    const message = createBaseIngredient();
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    return message;
  },

  toJSON(message: Ingredient): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Ingredient>, I>>(
    object: I
  ): Ingredient {
    const message = createBaseIngredient();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseRecipeIngredient(): RecipeIngredient {
  return { name: "", quantity: 0, unit: "" };
}

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
    const message = createBaseRecipeIngredient();
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
    const message = createBaseRecipeIngredient();
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.quantity =
      object.quantity !== undefined && object.quantity !== null
        ? Number(object.quantity)
        : 0;
    message.unit =
      object.unit !== undefined && object.unit !== null
        ? String(object.unit)
        : "";
    return message;
  },

  toJSON(message: RecipeIngredient): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.quantity !== undefined &&
      (obj.quantity = Math.round(message.quantity));
    message.unit !== undefined && (obj.unit = message.unit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecipeIngredient>, I>>(
    object: I
  ): RecipeIngredient {
    const message = createBaseRecipeIngredient();
    message.name = object.name ?? "";
    message.quantity = object.quantity ?? 0;
    message.unit = object.unit ?? "";
    return message;
  },
};

function createBaseRecipeEmbedding(): RecipeEmbedding {
  return { salt: 0, fat: 0, acid: 0, heat: 0, umami: 0 };
}

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
    if (message.heat !== 0) {
      writer.uint32(37).float(message.heat);
    }
    if (message.umami !== 0) {
      writer.uint32(45).float(message.umami);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecipeEmbedding {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecipeEmbedding();
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
          message.heat = reader.float();
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
    const message = createBaseRecipeEmbedding();
    message.salt =
      object.salt !== undefined && object.salt !== null
        ? Number(object.salt)
        : 0;
    message.fat =
      object.fat !== undefined && object.fat !== null ? Number(object.fat) : 0;
    message.acid =
      object.acid !== undefined && object.acid !== null
        ? Number(object.acid)
        : 0;
    message.heat =
      object.heat !== undefined && object.heat !== null
        ? Number(object.heat)
        : 0;
    message.umami =
      object.umami !== undefined && object.umami !== null
        ? Number(object.umami)
        : 0;
    return message;
  },

  toJSON(message: RecipeEmbedding): unknown {
    const obj: any = {};
    message.salt !== undefined && (obj.salt = message.salt);
    message.fat !== undefined && (obj.fat = message.fat);
    message.acid !== undefined && (obj.acid = message.acid);
    message.heat !== undefined && (obj.heat = message.heat);
    message.umami !== undefined && (obj.umami = message.umami);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecipeEmbedding>, I>>(
    object: I
  ): RecipeEmbedding {
    const message = createBaseRecipeEmbedding();
    message.salt = object.salt ?? 0;
    message.fat = object.fat ?? 0;
    message.acid = object.acid ?? 0;
    message.heat = object.heat ?? 0;
    message.umami = object.umami ?? 0;
    return message;
  },
};

function createBaseRecipe(): Recipe {
  return {
    id: "",
    title: "",
    description: "",
    instructions: "",
    teaserImage: "",
    embedding: undefined,
    ingredients: [],
  };
}

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
    const message = createBaseRecipe();
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
    const message = createBaseRecipe();
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.title =
      object.title !== undefined && object.title !== null
        ? String(object.title)
        : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    message.instructions =
      object.instructions !== undefined && object.instructions !== null
        ? String(object.instructions)
        : "";
    message.teaserImage =
      object.teaserImage !== undefined && object.teaserImage !== null
        ? String(object.teaserImage)
        : "";
    message.embedding =
      object.embedding !== undefined && object.embedding !== null
        ? RecipeEmbedding.fromJSON(object.embedding)
        : undefined;
    message.ingredients = (object.ingredients ?? []).map((e: any) =>
      RecipeIngredient.fromJSON(e)
    );
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

  fromPartial<I extends Exact<DeepPartial<Recipe>, I>>(object: I): Recipe {
    const message = createBaseRecipe();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.instructions = object.instructions ?? "";
    message.teaserImage = object.teaserImage ?? "";
    message.embedding =
      object.embedding !== undefined && object.embedding !== null
        ? RecipeEmbedding.fromPartial(object.embedding)
        : undefined;
    message.ingredients =
      object.ingredients?.map((e) => RecipeIngredient.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecipeList(): RecipeList {
  return { recipes: [] };
}

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
    const message = createBaseRecipeList();
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
    const message = createBaseRecipeList();
    message.recipes = (object.recipes ?? []).map((e: any) =>
      Recipe.fromJSON(e)
    );
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

  fromPartial<I extends Exact<DeepPartial<RecipeList>, I>>(
    object: I
  ): RecipeList {
    const message = createBaseRecipeList();
    message.recipes = object.recipes?.map((e) => Recipe.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecipeQuery(): RecipeQuery {
  return { id: "" };
}

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
    const message = createBaseRecipeQuery();
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
    const message = createBaseRecipeQuery();
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    return message;
  },

  toJSON(message: RecipeQuery): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecipeQuery>, I>>(
    object: I
  ): RecipeQuery {
    const message = createBaseRecipeQuery();
    message.id = object.id ?? "";
    return message;
  },
};

function createBasePostRecipeResponse(): PostRecipeResponse {
  return { recipeId: "" };
}

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
    const message = createBasePostRecipeResponse();
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
    const message = createBasePostRecipeResponse();
    message.recipeId =
      object.recipeId !== undefined && object.recipeId !== null
        ? String(object.recipeId)
        : "";
    return message;
  },

  toJSON(message: PostRecipeResponse): unknown {
    const obj: any = {};
    message.recipeId !== undefined && (obj.recipeId = message.recipeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PostRecipeResponse>, I>>(
    object: I
  ): PostRecipeResponse {
    const message = createBasePostRecipeResponse();
    message.recipeId = object.recipeId ?? "";
    return message;
  },
};

function createBaseGetRecipeByIdRequest(): GetRecipeByIdRequest {
  return { recipeId: "" };
}

export const GetRecipeByIdRequest = {
  encode(
    message: GetRecipeByIdRequest,
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
  ): GetRecipeByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRecipeByIdRequest();
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

  fromJSON(object: any): GetRecipeByIdRequest {
    const message = createBaseGetRecipeByIdRequest();
    message.recipeId =
      object.recipeId !== undefined && object.recipeId !== null
        ? String(object.recipeId)
        : "";
    return message;
  },

  toJSON(message: GetRecipeByIdRequest): unknown {
    const obj: any = {};
    message.recipeId !== undefined && (obj.recipeId = message.recipeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRecipeByIdRequest>, I>>(
    object: I
  ): GetRecipeByIdRequest {
    const message = createBaseGetRecipeByIdRequest();
    message.recipeId = object.recipeId ?? "";
    return message;
  },
};

function createBaseGetRecipeByIdResponse(): GetRecipeByIdResponse {
  return { wasFound: false, recipe: undefined };
}

export const GetRecipeByIdResponse = {
  encode(
    message: GetRecipeByIdResponse,
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
  ): GetRecipeByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRecipeByIdResponse();
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

  fromJSON(object: any): GetRecipeByIdResponse {
    const message = createBaseGetRecipeByIdResponse();
    message.wasFound =
      object.wasFound !== undefined && object.wasFound !== null
        ? Boolean(object.wasFound)
        : false;
    message.recipe =
      object.recipe !== undefined && object.recipe !== null
        ? Recipe.fromJSON(object.recipe)
        : undefined;
    return message;
  },

  toJSON(message: GetRecipeByIdResponse): unknown {
    const obj: any = {};
    message.wasFound !== undefined && (obj.wasFound = message.wasFound);
    message.recipe !== undefined &&
      (obj.recipe = message.recipe ? Recipe.toJSON(message.recipe) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRecipeByIdResponse>, I>>(
    object: I
  ): GetRecipeByIdResponse {
    const message = createBaseGetRecipeByIdResponse();
    message.wasFound = object.wasFound ?? false;
    message.recipe =
      object.recipe !== undefined && object.recipe !== null
        ? Recipe.fromPartial(object.recipe)
        : undefined;
    return message;
  },
};

function createBaseDeleteRecipeByIdRequest(): DeleteRecipeByIdRequest {
  return { recipeId: "" };
}

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
    const message = createBaseDeleteRecipeByIdRequest();
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
    const message = createBaseDeleteRecipeByIdRequest();
    message.recipeId =
      object.recipeId !== undefined && object.recipeId !== null
        ? String(object.recipeId)
        : "";
    return message;
  },

  toJSON(message: DeleteRecipeByIdRequest): unknown {
    const obj: any = {};
    message.recipeId !== undefined && (obj.recipeId = message.recipeId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRecipeByIdRequest>, I>>(
    object: I
  ): DeleteRecipeByIdRequest {
    const message = createBaseDeleteRecipeByIdRequest();
    message.recipeId = object.recipeId ?? "";
    return message;
  },
};

function createBaseDeleteRecipeByIdResponse(): DeleteRecipeByIdResponse {
  return { success: false };
}

export const DeleteRecipeByIdResponse = {
  encode(
    message: DeleteRecipeByIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteRecipeByIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRecipeByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRecipeByIdResponse {
    const message = createBaseDeleteRecipeByIdResponse();
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    return message;
  },

  toJSON(message: DeleteRecipeByIdResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRecipeByIdResponse>, I>>(
    object: I
  ): DeleteRecipeByIdResponse {
    const message = createBaseDeleteRecipeByIdResponse();
    message.success = object.success ?? false;
    return message;
  },
};

export interface RecipeService {
  GetRecipeById(
    request: DeepPartial<GetRecipeByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetRecipeByIdResponse>;
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

export class RecipeServiceClientImpl implements RecipeService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetRecipeById = this.GetRecipeById.bind(this);
    this.DeleteRecipeById = this.DeleteRecipeById.bind(this);
    this.QueryRecipes = this.QueryRecipes.bind(this);
    this.PostRecipe = this.PostRecipe.bind(this);
  }

  GetRecipeById(
    request: DeepPartial<GetRecipeByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<GetRecipeByIdResponse> {
    return this.rpc.unary(
      RecipeServiceGetRecipeByIdDesc,
      GetRecipeByIdRequest.fromPartial(request),
      metadata
    );
  }

  DeleteRecipeById(
    request: DeepPartial<DeleteRecipeByIdRequest>,
    metadata?: grpc.Metadata
  ): Promise<DeleteRecipeByIdResponse> {
    return this.rpc.unary(
      RecipeServiceDeleteRecipeByIdDesc,
      DeleteRecipeByIdRequest.fromPartial(request),
      metadata
    );
  }

  QueryRecipes(
    request: DeepPartial<RecipeQuery>,
    metadata?: grpc.Metadata
  ): Promise<RecipeList> {
    return this.rpc.unary(
      RecipeServiceQueryRecipesDesc,
      RecipeQuery.fromPartial(request),
      metadata
    );
  }

  PostRecipe(
    request: DeepPartial<Recipe>,
    metadata?: grpc.Metadata
  ): Promise<PostRecipeResponse> {
    return this.rpc.unary(
      RecipeServicePostRecipeDesc,
      Recipe.fromPartial(request),
      metadata
    );
  }
}

export const RecipeServiceDesc = {
  serviceName: "recipe.RecipeService",
};

export const RecipeServiceGetRecipeByIdDesc: UnaryMethodDefinitionish = {
  methodName: "GetRecipeById",
  service: RecipeServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetRecipeByIdRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GetRecipeByIdResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const RecipeServiceDeleteRecipeByIdDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteRecipeById",
  service: RecipeServiceDesc,
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

export const RecipeServiceQueryRecipesDesc: UnaryMethodDefinitionish = {
  methodName: "QueryRecipes",
  service: RecipeServiceDesc,
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

export const RecipeServicePostRecipeDesc: UnaryMethodDefinitionish = {
  methodName: "PostRecipe",
  service: RecipeServiceDesc,
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
