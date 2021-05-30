# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: recipe.proto
# plugin: python-betterproto
from dataclasses import dataclass
from typing import Dict, List, Optional

import betterproto
from betterproto.grpc.grpclib_server import ServiceBase
import grpclib


@dataclass(eq=False, repr=False)
class Ingredient(betterproto.Message):
    name: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class RecipeIngredient(betterproto.Message):
    name: str = betterproto.string_field(1)
    quantity: int = betterproto.int32_field(2)
    unit: str = betterproto.string_field(3)


@dataclass(eq=False, repr=False)
class RecipeEmbedding(betterproto.Message):
    salt: float = betterproto.float_field(1)
    fat: float = betterproto.float_field(2)
    acid: float = betterproto.float_field(3)
    head: float = betterproto.float_field(4)
    umami: float = betterproto.float_field(5)


@dataclass(eq=False, repr=False)
class Recipe(betterproto.Message):
    id: str = betterproto.string_field(1)
    title: str = betterproto.string_field(2)
    description: str = betterproto.string_field(3)
    instructions: str = betterproto.string_field(4)
    teaser_image: str = betterproto.string_field(5)
    embedding: "RecipeEmbedding" = betterproto.message_field(6)
    ingredients: List["RecipeIngredient"] = betterproto.message_field(7)


@dataclass(eq=False, repr=False)
class RecipeList(betterproto.Message):
    recipes: List["Recipe"] = betterproto.message_field(1)


@dataclass(eq=False, repr=False)
class RecipeQuery(betterproto.Message):
    id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class PostRecipeResponse(betterproto.Message):
    recipe_id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class GetRecipyByIdRequest(betterproto.Message):
    recipe_id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class GetRecipyByIdResponse(betterproto.Message):
    was_found: bool = betterproto.bool_field(1)
    recipe: "Recipe" = betterproto.message_field(2)


@dataclass(eq=False, repr=False)
class DeleteRecipeByIdRequest(betterproto.Message):
    recipe_id: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class DeleteRecipeByIdResponse(betterproto.Message):
    pass


class RecipeStoreStub(betterproto.ServiceStub):
    async def get_recipe_by_id(self, *, recipe_id: str = "") -> "GetRecipyByIdResponse":

        request = GetRecipyByIdRequest()
        request.recipe_id = recipe_id

        return await self._unary_unary(
            "/RecipeStore/GetRecipeById", request, GetRecipyByIdResponse
        )

    async def delete_recipe_by_id(
        self, *, recipe_id: str = ""
    ) -> "DeleteRecipeByIdResponse":

        request = DeleteRecipeByIdRequest()
        request.recipe_id = recipe_id

        return await self._unary_unary(
            "/RecipeStore/DeleteRecipeById", request, DeleteRecipeByIdResponse
        )

    async def query_recipes(self, *, id: str = "") -> "RecipeList":

        request = RecipeQuery()
        request.id = id

        return await self._unary_unary("/RecipeStore/QueryRecipes", request, RecipeList)

    async def post_recipe(
        self,
        *,
        id: str = "",
        title: str = "",
        description: str = "",
        instructions: str = "",
        teaser_image: str = "",
        embedding: "RecipeEmbedding" = None,
        ingredients: Optional[List["RecipeIngredient"]] = None,
    ) -> "PostRecipeResponse":
        ingredients = ingredients or []

        request = Recipe()
        request.id = id
        request.title = title
        request.description = description
        request.instructions = instructions
        request.teaser_image = teaser_image
        if embedding is not None:
            request.embedding = embedding
        if ingredients is not None:
            request.ingredients = ingredients

        return await self._unary_unary(
            "/RecipeStore/PostRecipe", request, PostRecipeResponse
        )


class RecipeStoreBase(ServiceBase):
    async def get_recipe_by_id(self, recipe_id: str) -> "GetRecipyByIdResponse":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def delete_recipe_by_id(self, recipe_id: str) -> "DeleteRecipeByIdResponse":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def query_recipes(self, id: str) -> "RecipeList":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def post_recipe(
        self,
        id: str,
        title: str,
        description: str,
        instructions: str,
        teaser_image: str,
        embedding: "RecipeEmbedding",
        ingredients: Optional[List["RecipeIngredient"]],
    ) -> "PostRecipeResponse":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def __rpc_get_recipe_by_id(self, stream: grpclib.server.Stream) -> None:
        request = await stream.recv_message()

        request_kwargs = {
            "recipe_id": request.recipe_id,
        }

        response = await self.get_recipe_by_id(**request_kwargs)
        await stream.send_message(response)

    async def __rpc_delete_recipe_by_id(self, stream: grpclib.server.Stream) -> None:
        request = await stream.recv_message()

        request_kwargs = {
            "recipe_id": request.recipe_id,
        }

        response = await self.delete_recipe_by_id(**request_kwargs)
        await stream.send_message(response)

    async def __rpc_query_recipes(self, stream: grpclib.server.Stream) -> None:
        request = await stream.recv_message()

        request_kwargs = {
            "id": request.id,
        }

        response = await self.query_recipes(**request_kwargs)
        await stream.send_message(response)

    async def __rpc_post_recipe(self, stream: grpclib.server.Stream) -> None:
        request = await stream.recv_message()

        request_kwargs = {
            "id": request.id,
            "title": request.title,
            "description": request.description,
            "instructions": request.instructions,
            "teaser_image": request.teaser_image,
            "embedding": request.embedding,
            "ingredients": request.ingredients,
        }

        response = await self.post_recipe(**request_kwargs)
        await stream.send_message(response)

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        return {
            "/RecipeStore/GetRecipeById": grpclib.const.Handler(
                self.__rpc_get_recipe_by_id,
                grpclib.const.Cardinality.UNARY_UNARY,
                GetRecipyByIdRequest,
                GetRecipyByIdResponse,
            ),
            "/RecipeStore/DeleteRecipeById": grpclib.const.Handler(
                self.__rpc_delete_recipe_by_id,
                grpclib.const.Cardinality.UNARY_UNARY,
                DeleteRecipeByIdRequest,
                DeleteRecipeByIdResponse,
            ),
            "/RecipeStore/QueryRecipes": grpclib.const.Handler(
                self.__rpc_query_recipes,
                grpclib.const.Cardinality.UNARY_UNARY,
                RecipeQuery,
                RecipeList,
            ),
            "/RecipeStore/PostRecipe": grpclib.const.Handler(
                self.__rpc_post_recipe,
                grpclib.const.Cardinality.UNARY_UNARY,
                Recipe,
                PostRecipeResponse,
            ),
        }
