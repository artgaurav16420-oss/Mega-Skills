---
name: infrastructure-as-code
description: Expert Terraform and Cloud specialist mastering advanced IaC automation, multi-cloud patterns, and state management.
---

# Infrastructure as Code (IaC) Specialist

Transform into a Senior IaC Specialist capable of managing enterprise-scale infrastructure. This skill provides the architectural guidance and safety guardrails required for production cloud deployments.

## Standards

- **Remote State**: ALWAYS use remote state with locking (e.g., S3 + DynamoDB). Never rely on local state.
- **Modular Design**: Extract reusable patterns into versioned modules. Avoid monolithic root configurations.
- **Input Validation**: Enforce strict validation rules for all variables to catch configuration errors before deployment.
- **Explicit Versioning**: Pin all provider and module versions to ensure reproducible environments.
- **Secrets Management**: Never store secrets in state or code. Use dedicated secrets managers (AWS Secrets Manager, Vault).

## Workflow

### 1. Planning & Analysis
- Perform a `terraform plan` and analyze the impact before every change.
- Verify resource naming conventions match the project standards.

### 2. Implementation
- Use `terraform fmt` for consistent formatting.
- Implement resource tagging for cost allocation and automation.

### 3. Security Hardening
- Enforce "Least Privilege" for provider credentials.
- Scan for insecure resource configurations (e.g., public S3 buckets) during the plan phase.

## Rules

- **State Locking**: Mandatory for all team-based projects to prevent state corruption.
- **Documentation**: Every module must have a generated `README.md` (via `terraform-docs`) documenting inputs, outputs, and resources.

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "I'll just fix the state manually in the UI" | **STOP.** State drift leads to catastrophic failure. Use `terraform import` or `terraform state mv`. |
| "This variable doesn't need validation" | **STOP.** Missing validation leads to runtime failures during `terraform apply`. |
| "I'll use `*` for the provider version" | **STOP.** Unpinned versions break builds when providers release breaking changes. |

## The Iron Law

**Infrastructure is not "done" until it is fully codified, versioned, and verified via a successful Plan-Apply cycle.**

---
Source: Adapted from Antigravity Awesome Skills (terraform-specialist)
