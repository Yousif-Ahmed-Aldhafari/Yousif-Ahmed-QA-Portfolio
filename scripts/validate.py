"""Check tracked Markdown targets, JSON, and GitHub workflow YAML."""
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import unquote, urlsplit

import yaml


class WorkflowLoader(yaml.SafeLoader):
    """Use YAML 1.2-style boolean values for workflow keys such as 'on'."""


WorkflowLoader.yaml_implicit_resolvers = {
    key: [rule for rule in rules if rule[0] != "tag:yaml.org,2002:bool"]
    for key, rules in yaml.SafeLoader.yaml_implicit_resolvers.items()
}
WorkflowLoader.add_implicit_resolver(
    "tag:yaml.org,2002:bool", re.compile(r"^(?:true|false)$", re.I), list("tTfF")
)

root = Path(__file__).resolve().parents[1]
tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=root).decode().split("\0")
errors = []
counts = dict.fromkeys(("Markdown", "JSON", "YAML"), 0)
for name in filter(None, tracked):
    path = root / name
    if path.suffix == ".md":
        counts["Markdown"] += 1
        for url in re.findall(r"\]\(([^)]+)\)", path.read_text()):
            parts = urlsplit(url)
            if not parts.scheme and parts.path and not (path.parent / unquote(parts.path)).exists():
                errors.append(f"{name}: missing {url}")
    if path.suffix == ".json":
        counts["JSON"] += 1
        json.loads(path.read_text())
    if path.suffix in {".yaml", ".yml"}:
        counts["YAML"] += 1
        workflow = yaml.load(path.read_text(), Loader=WorkflowLoader)
        if name.startswith(".github/workflows/") and not {"on", "jobs"} <= workflow.keys():
            errors.append(f"{name}: missing workflow triggers or jobs")
print(", ".join(f"{count} {kind}" for kind, count in counts.items()))
if errors:
    raise SystemExit("\n".join(errors))
