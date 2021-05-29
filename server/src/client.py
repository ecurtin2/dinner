import asyncio
from proto import RecipeStoreStub

from grpclib.client import Channel


async def main():
    channel = Channel(host="127.0.0.1", port=9090)
    service = RecipeStoreStub(channel)
    response = await service.post_recipe()
    print(response)
    # don't forget to close the channel when done!
    response = await service.post_recipe(title="Chicky chicky", description="hi dude", instructions="sup")
    response = await service.post_recipe(title="Stinky stinky", description="hi guy", instructions="do the thing")
    response = await service.query_recipes(id="*")
    print(response)
    channel.close()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
