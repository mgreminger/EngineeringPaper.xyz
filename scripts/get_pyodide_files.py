# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "pkginfo",
#     "packaging",
#     "pyodide-lock==0.1.0a9",
# ]
# ///
from pathlib import Path
import json
import shutil
import os
import subprocess
import sys
from pyodide_lock import PyodideLockSpec
from pyodide_lock.utils import add_wheels_to_spec

if len(sys.argv) != 2:
    print("Path to source pyodide files must be provided. No additional arguments may be supplied.")
    exit(1)

source_dir = Path(sys.argv[1])

script_dir = Path(os.path.dirname(os.path.realpath(__file__)))

destination_dir = script_dir / "../public/pyodide"
lockfile = destination_dir / "pyodide-lock.json"
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
    "drawsvg",
    "six",
    "pandas",
    "polars",
    "jinja2",
    "rich",
    "nlopt"
]

packages_to_hide_from_ui = [
    "six",
    "pylab",
    "mpl_toolkits",
    "isympy",
    "jedi"
]

base_files = [
    "pyodide-lock.json",
    "pyodide.asm.js",
    "pyodide.asm.wasm",
    "pyodide.js",
    "python_stdlib.zip",
]



with open(source_dir / "pyodide-lock.json") as package_file:
    packages = json.load(package_file)


python_version = packages["info"]["python"]
pyodide_version = packages["info"]["version"]
packages = packages["packages"]

available_packages = {}

# clear contents of destination directory if it exists
if os.path.exists(destination_dir):
    shutil.rmtree(destination_dir)

os.makedirs(destination_dir)

# first, download any packages that are not bundled with pyodide (must be pure python)
new_packages = []
for package in seed_packages:
    if not package in packages:
        subprocess.run(['uvx', 'pip', 'download',
                        '-d', destination_dir,
                        package ])
        new_packages.append(package)

wheels_to_add = os.listdir(destination_dir)

print(f"{wheels_to_add=}")

needed_packages = set(seed_packages)
for package in seed_packages:
    if package in packages:
        needed_packages.update(packages[package]["depends"])
        for import_name in packages[package]["imports"]:
            if import_name not in packages_to_hide_from_ui:
                available_packages[import_name] = {
                    "pyodideName": package,
                    "version": packages[package]["version"],
                }

needed_files = set(base_files)

for needed_package in needed_packages:
    if needed_package in packages:
        needed_files.add(packages[needed_package]["file_name"])

# copy required files from source to destination
for file in needed_files:
    shutil.copy(source_dir / file, destination_dir)


# add new wheels to lockfile
lock_spec = PyodideLockSpec.from_json(lockfile)
wheel_paths = [destination_dir / wheel for wheel in wheels_to_add]
lock_spec = add_wheels_to_spec(lock_spec, wheel_paths)

for package in new_packages:
    if package not in packages_to_hide_from_ui:
        available_packages[package] = {
                    "pyodideName": package,
                    "version": lock_spec.packages[package].version,
                }

lock_spec.to_json(lockfile)

pyodide_info = {
    "pythonVersion": python_version,
    "pyodideVersion": pyodide_version,
    "availablePackages": available_packages,
}
with open(pyodide_info_file, "w") as file:
    json.dump(pyodide_info, file, indent=2)

print('Compiling packages...')
subprocess.run(
    [
        "uvx",
        "--from", "pyodide-cli==0.3.0",
        "--with", "pyodide-build==0.30.5",
        "--python", python_version,
        "pyodide", "py-compile", "--silent", destination_dir,
    ]
)

print('...finished.')
