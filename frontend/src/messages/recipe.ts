/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

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

export interface RecipeQuery {
  id: string;
}

export interface PostRecipeResponse {
  status: PostRecipeResponse_Status;
}

export enum PostRecipeResponse_Status {
  SUCCESS = 0,
  FAIL = 1,
  UNRECOGNIZED = -1,
}

export function postRecipeResponse_StatusFromJSON(
  object: any
): PostRecipeResponse_Status {
  switch (object) {
    case 0:
    case "SUCCESS":
      return PostRecipeResponse_Status.SUCCESS;
    case 1:
    case "FAIL":
      return PostRecipeResponse_Status.FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PostRecipeResponse_Status.UNRECOGNIZED;
  }
}

export function postRecipeResponse_StatusToJSON(
  object: PostRecipeResponse_Status
): string {
  switch (object) {
    case PostRecipeResponse_Status.SUCCESS:
      return "SUCCESS";
    case PostRecipeResponse_Status.FAIL:
      return "FAIL";
    default:
      return "UNKNOWN";
  }
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

const basePostRecipeResponse: object = { status: 0 };

export const PostRecipeResponse = {
  encode(
    message: PostRecipeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
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
          message.status = reader.int32() as any;
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
    if (object.status !== undefined && object.status !== null) {
      message.status = postRecipeResponse_StatusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    return message;
  },

  toJSON(message: PostRecipeResponse): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = postRecipeResponse_StatusToJSON(message.status));
    return obj;
  },

  fromPartial(object: DeepPartial<PostRecipeResponse>): PostRecipeResponse {
    const message = { ...basePostRecipeResponse } as PostRecipeResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    return message;
  },
};

export const RecipeStoreService = {
  getRecipe: {
    path: "/RecipeStore/GetRecipe",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecipeQuery) =>
      Buffer.from(RecipeQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RecipeQuery.decode(value),
    responseSerialize: (value: Recipe) =>
      Buffer.from(Recipe.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Recipe.decode(value),
  },
  queryRecipes: {
    path: "/RecipeStore/QueryRecipes",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RecipeQuery) =>
      Buffer.from(RecipeQuery.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RecipeQuery.decode(value),
    responseSerialize: (value: RecipeList) =>
      Buffer.from(RecipeList.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RecipeList.decode(value),
  },
  postRecipe: {
    path: "/RecipeStore/PostRecipe",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Recipe) =>
      Buffer.from(Recipe.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Recipe.decode(value),
    responseSerialize: (value: PostRecipeResponse) =>
      Buffer.from(PostRecipeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PostRecipeResponse.decode(value),
  },
} as const;

export interface RecipeStoreServer extends UntypedServiceImplementation {
  getRecipe: handleUnaryCall<RecipeQuery, Recipe>;
  queryRecipes: handleUnaryCall<RecipeQuery, RecipeList>;
  postRecipe: handleUnaryCall<Recipe, PostRecipeResponse>;
}

export interface RecipeStoreClient extends Client {
  getRecipe(
    request: RecipeQuery,
    callback: (error: ServiceError | null, response: Recipe) => void
  ): ClientUnaryCall;
  getRecipe(
    request: RecipeQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Recipe) => void
  ): ClientUnaryCall;
  getRecipe(
    request: RecipeQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Recipe) => void
  ): ClientUnaryCall;
  queryRecipes(
    request: RecipeQuery,
    callback: (error: ServiceError | null, response: RecipeList) => void
  ): ClientUnaryCall;
  queryRecipes(
    request: RecipeQuery,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RecipeList) => void
  ): ClientUnaryCall;
  queryRecipes(
    request: RecipeQuery,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RecipeList) => void
  ): ClientUnaryCall;
  postRecipe(
    request: Recipe,
    callback: (error: ServiceError | null, response: PostRecipeResponse) => void
  ): ClientUnaryCall;
  postRecipe(
    request: Recipe,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: PostRecipeResponse) => void
  ): ClientUnaryCall;
  postRecipe(
    request: Recipe,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: PostRecipeResponse) => void
  ): ClientUnaryCall;
}

export const RecipeStoreClient = (makeGenericClientConstructor(
  RecipeStoreService,
  "RecipeStore"
) as unknown) as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): RecipeStoreClient;
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
