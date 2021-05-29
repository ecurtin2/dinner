from pathlib import Path
from typing import List
import config
from proto import Recipe


def write(p: Path, b: bytes):
    p.parent.mkdir(exist_ok=True, parents=True)
    p.write_bytes(b)


def save(r: Recipe):
    write(config.storage_dir / f"recipes/id={r.id}.proto", bytes(r))


def load(recipe_id: str) -> Recipe:
    b = (config.storage_dir / f"recipes/id={recipe_id}.proto").read_bytes()
    return Recipe().parse(b)


def load_where(id: str = "*") -> List[Recipe]:
    return [Recipe().parse(data=p.read_bytes()) for p in (config.storage_dir / f"recipes").rglob("*.proto")]