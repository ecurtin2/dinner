import asyncio
import os

from proto import (
    RecipeStoreBase,
    Recipe,
    PostRecipeResponse,
    RecipeIngredient,
    PostRecipeResponseStatus,
    RecipeList,
)
from grpclib.server import Server
from grpclib.utils import graceful_exit
from typing import Optional, List

import logging

logger = logging.getLogger(__name__)
from pathlib import Path


STORAGE_DIR = Path(os.getenv("STORAGE_DIR", "."))
RECIPES_DIR = STORAGE_DIR / "recipes"


class RecipeStoreService(RecipeStoreBase):
    async def get_recipe(self, id: str) -> "Recipe":
        logger.info(f"[GET] Recipe id={id}")
        return Recipe(id=id)

    async def query_recipes(self, id: str) -> "RecipeList":
        return RecipeList([Recipe().parse(data=p.read_bytes()) for p in RECIPES_DIR.rglob("*.proto")])

    async def post_recipe(
        self,
        id: str,
        title: str,
        description: str,
        instructions: str,
        teaser_image: str,
        ingredients: Optional[List["RecipeIngredient"]],
    ) -> "PostRecipeResponse":
        logger.info(f"[POST] id={id} title={title}")
        recipe = Recipe(
            id=id,
            title=title,
            description=description,
            instructions=instructions,
            teaser_image=teaser_image,
            ingredients=ingredients,
        )
        file_path = RECIPES_DIR / f"id={id}.proto"
        RECIPES_DIR.mkdir(parents=True, exist_ok=True)
        try:
            file_path.write_bytes(bytes(recipe))
            logger.info(f"Wrote to {file_path}")
            return PostRecipeResponse(status=PostRecipeResponseStatus.SUCCESS)
        except Exception as e:
            logger.error(f"Error when writing {file_path}")
            logger.exception(e)
            return PostRecipeResponse(status=PostRecipeResponseStatus.FAIL)


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

    host = os.getenv("HOSTNAME", "127.0.0.1")
    port = int(os.getenv("PORT", "50051"))
    asyncio.run(start_server(host=host, port=port))
