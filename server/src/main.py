import asyncio
import os
from hashlib import sha1

from proto import (
    RecipeStoreBase,
    Recipe,
    PostRecipeResponse,
    RecipeIngredient,
    RecipeList,
    GetRecipyByIdResponse,
RecipeEmbedding,
)
from grpclib.server import Server
from grpclib.utils import graceful_exit
from typing import Optional, List

import logging

from repository import save, load_where, load

logger = logging.getLogger(__name__)


class RecipeStoreService(RecipeStoreBase):
    async def get_recipe_by_id(self, recipe_id: str) -> "GetRecipyByIdResponse":
        logger.info(f"{__class__}.get_recipe id={id}")

        was_found = False
        try:
            r = load(recipe_id=recipe_id)
            was_found = True
        except FileNotFoundError:
            r = Recipe()
        return GetRecipyByIdResponse(was_found, r)

    async def query_recipes(self, id: str) -> "RecipeList":
        logger.info(f"{__class__}.query_recipes id={id}")
        recipes = load_where(id=id)
        return RecipeList(recipes)

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

        if not request.id:
            request.id = sha1(bytes(request)).hexdigest()
        save(request)

        return PostRecipeResponse(recipe_id=request.id)


async def start_server(*, host: str, port: int):
    server = Server([RecipeStoreService()])

    with graceful_exit([server]):
        await server.start(host, port)
        logger.info(f"Serving on {host}:{port}")
        await server.wait_closed()


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="{asctime} <{name}> [{levelname}] {message}",
        style="{",
        datefmt="%Y-%m-%d:%H:%M:%S",
    )
    host = os.getenv("SERVICE_HOST", "127.0.0.1")
    port = int(os.getenv("SERVICE_PORT", "50051"))
    asyncio.run(start_server(host=host, port=port))
