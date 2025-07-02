from typing import cast, TypedDict
import traceback
import jedi
import json

class CodeContextRequest(TypedDict):
    code: str
    line: int
    col: int


class AutocompleteSuggestion(TypedDict):
    label: str
    type: str
    detail: str
    prefixLength: int


class CodeContextResult(TypedDict):
    autocompleteSuggestions: list[AutocompleteSuggestion]
    hoverText: str


def get_code_context(request_json: str):
    try:
        code_context_request: CodeContextRequest = json.loads(request_json)
        script = jedi.Script(code_context_request["code"])

        line = code_context_request["line"]
        col = code_context_request["col"]

        completions = script.complete(line, col, fuzzy=True)

        docs = script.help(line, col)
        inferences = script.infer(line, col)

        if len(docs) > 0:
            hover_text = "\n".join(([doc.docstring() for doc in docs]))
        else:
            hover_text = ""

        if hover_text == "" and len(inferences) > 0:
            hover_text = f"{inferences[0].type} of type {inferences[0].name}"

        autocomplete_suggestions: list[AutocompleteSuggestion] = [
            {
                "label": comp.name_with_symbols,
                "type": comp.type,
                "detail": comp.description,
                "prefixLength": comp.get_completion_prefix_length(),
            }
            for comp in completions
        ]
    except Exception as e:
        print(f"Jedi Error: {type(e).__name__}, {e}")
        traceback.print_exc()
        return {"autocompleteSuggestions": [], "hoverText": ""}

    return json.dumps({
        "autocompleteSuggestions": autocomplete_suggestions,
        "hoverText": hover_text,
    })


class FuncContainer(object):
    pass

py_funcs = FuncContainer()
py_funcs.get_code_context = get_code_context #pyright: ignore
py_funcs  # pyright: ignore
