---
name: advanced-rag-optimizer
description: Elite workflow for building and optimizing production-grade Retrieval-Augmented Generation (RAG) systems. Includes advanced chunking, hybrid search, reranking, and evaluation strategies.
---

# Advanced RAG Optimizer

Master Retrieval-Augmented Generation to build applications that provide accurate, grounded responses with verifiable source citations. This skill minimizes hallucinations by enabling agents to access and retrieve domain-specific knowledge effectively.

## Optimization Workflow

### 1. Chunking Strategy
- **Recursive Character Splitting**: Use for generic text to maintain semantic context.
- **Semantic Chunking**: Use embedding similarity to find natural break points.
- **Markdown-Aware Splitting**: Respect document structure (headers, lists, tables).

### 2. Retrieval Refinement
- **Hybrid Search**: Combine semantic (Vector) and keyword (BM25/FTS) retrieval for maximum coverage.
- **Query Transformation**: Implement Multi-Query generation and HyDE (Hypothetical Document Embeddings).
- **Contextual Compression**: Filter and summarize retrieved documents before passing to the generator.

### 3. Precision & Reranking
- **Cross-Encoders**: Use models like Cohere Rerank to re-order the top-k results.
- **MMR (Maximal Marginal Relevance)**: Balance relevance with document diversity to avoid redundant context.

### 4. Evaluation (LLM-as-a-Judge)
- **Faithfulness**: Is the answer derived solely from the retrieved context?
- **Answer Relevance**: Does the answer directly address the user's query?
- **Context Precision**: How many retrieved documents were actually useful?

## Rules

- **Normalize Embeddings**: Always normalize vector embeddings before performing cosine similarity checks.
- **Citation Enforcement**: Every fact in the generated answer MUST be linked to a specific retrieved chunk ID or source URL.
- **HNSW for Scale**: Use Flat indices for small datasets (<10k), but mandate HNSW (Hierarchical Navigable Small World) for large-scale production databases.

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "I'll just use the default chunk size of 500" | **STOP.** Arbitrary chunking leads to context fragmentation. Use document-aware splitting. |
| "Vector search is enough" | **STOP.** Vector search fails on specific keyword matches (acronyms, IDs). Use Hybrid Search. |
| "More context is always better" | **STOP.** Too much irrelevant context leads to "Lost in the Middle" syndrome and higher token costs. |

## The Iron Law

**No RAG system is production-ready without a verified evaluation suite (RAGAS/TruLens) proving its faithfulness and retrieval precision.**

---
Source: Adapted from Antigravity Awesome Skills (rag-implementation)
