---
name: paper-to-code
description: High-fidelity workflow for implementing academic papers into production code. Covers reference extraction, concept analysis, and architectural verification.
---

# Paper-to-Code

Transform theoretical research into executable, production-ready code. This skill enforces a structured 4-stage process to bridge the gap between academic methodology and technical implementation.

## The Research Implementation Loop

### 1. Section Extraction
- **Methodology**: Identify the core mathematical contribution or architectural shift.
- **Algorithms**: Extract pseudocode and state transition diagrams.
- **Hyperparameters**: Map out the exact values (LR, batch size, decay) used in the successful replication.

### 2. Concept Analysis
- **Formula Translation**: Convert mathematical equations (LaTeX) into vectorized code (NumPy/PyTorch/TensorFlow).
- **Hypothesis Mapping**: Define the "Expected Outcome" of the algorithm as a unit test.

### 3. YAML Planning (Architecture First)
- Generate a detailed implementation plan in YAML/JSON to ensure architectural fidelity before writing a single line of code.
- Define module boundaries and data flow between components.

### 4. Incremental Generation & Verification
- **File-by-File Build**: Produce modular code, focusing on reproducibility.
- **The Claim Audit**: Compare the final code behavior against the paper's specific performance claims.

## Rules

- **Reproducibility First**: All code must include a configuration file or seeding mechanism to match the paper's environment.
- **Mathematical Integrity**: Use high-precision libraries where specified. Document any "engineering shortcuts" taken to optimize performance.
- **Verified Sources**: Always link code comments to specific page numbers or equation labels in the source paper.

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "I'll just implement the general idea" | **STOP.** Papers succeed due to specific details. Implement the exact algorithm before optimizing. |
| "The pseudocode is probably efficient" | **STOP.** Academic pseudocode often ignores complexity. Optimize for production without changing logic. |
| "I'll skip the hyperparameter search" | **STOP.** Most models are brittle. Use the exact values from the paper for the baseline. |

## The Iron Law

**No research implementation is complete without a benchmark script proving that the code produces the same results (within epsilon) as the paper's baseline.**

---
Source: Adapted from Orchestra Research AI-Research-SKILLs
