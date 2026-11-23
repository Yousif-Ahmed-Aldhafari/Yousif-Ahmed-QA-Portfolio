# Deterministic AI-output evaluation

Run `python3 07-Sample-Projects/ai-evaluation/evaluate.py` from the repository root. The fixture checks an output schema, allowed actions, and exact repetition of a synthetic restricted marker. The process exits unsuccessfully if a decision disagrees with the corresponding fixture label.

Inputs are authored examples. This is a rubric regression check and provides no estimate of a live model’s accuracy, security, or reliability.
