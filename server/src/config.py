import os
from pathlib import Path

storage_dir = Path(os.getenv("DINNER_STORAGE_DIR", "."))
