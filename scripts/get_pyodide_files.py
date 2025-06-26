from pathlib import Path
import json
import shutil
import os
import subprocess
import sys

if len(sys.argv) != 2:
    print("Path to source pyodide files must be provided. No additional arguments may be supplied.")
    exit(1)

source_dir = Path(sys.argv[1])

script_dir = Path(os.path.dirname(os.path.realpath(__file__)))

destination_dir = script_dir / "../public/pyodide"
pyodide_info_file = script_dir / "../src/pyodide-info.json"

# These are the high level packages that need to be exposed to EP and the user for code cells
# All needed dependencies will be autmatically added
seed_packages = [
    "sympy",
    "numpy",
    "coolprop",
    "scipy",
    "matplotlib",
    "jedi",
    "scikit-learn",
]

base_files = [
    "pyodide-lock.json",
    "pyodide.asm.js",
    "pyodide.asm.wasm",
    "pyodide.js",
    "python_stdlib.zip",
]

seed_packages.sort()

with open(source_dir / "pyodide-lock.json") as package_file:
    packages = json.load(package_file)


python_version = packages["info"]["python"]
packages = packages["packages"]

available_packages = {}
needed_packages = set(seed_packages)
for package in seed_packages:
    needed_packages.update(packages[package]["depends"])
    for import_name in packages[package]["imports"]:
        available_packages[import_name] = {
            "pyodideName": package,
            "version": packages[package]["version"],
        }

needed_files = set(base_files)

for needed_package in needed_packages:
    needed_files.add(packages[needed_package]["file_name"])

pyodide_info = {
    "pythonVersion": python_version,
    "availablePackages": available_packages,
}
with open(pyodide_info_file, "w") as file:
    json.dump(pyodide_info, file)


# clear contents of destination directory if it exists
if os.path.exists(destination_dir):
    shutil.rmtree(destination_dir)

os.makedirs(destination_dir)

# copy required files from source to destination
for file in needed_files:
    shutil.copy(source_dir / file, destination_dir)

subprocess.run(
    [
        "uvx",
        "--from", "pyodide-cli",
        "--with", "pyodide-build",
        "--python", python_version,
        "pyodide", "py-compile", destination_dir,
    ]
)
