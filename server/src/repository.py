from pathlib import Path
from typing import List
import config
from proto import Recipe


def recipe_path(recipe_id: str) -> Path:
    return config.storage_dir / f"recipes/id={recipe_id}.proto"


def write(p: Path, b: bytes):
    p.parent.mkdir(exist_ok=True, parents=True)
    p.write_bytes(b)


def save(r: Recipe):
    write(recipe_path(r.id), bytes(r))


def load(recipe_id: str) -> Recipe:
    b = recipe_path(recipe_id).read_bytes()
    return Recipe().parse(b)


def delete(recipe_id: str):
    recipe_path(recipe_id).unlink(missing_ok=True)


def load_where(id: str = "*") -> List[Recipe]:
    return [Recipe().parse(data=p.read_bytes()) for p in (config.storage_dir / f"recipes").rglob("*.proto")]