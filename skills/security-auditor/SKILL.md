---
name: security-auditor
description: Elite security auditor for code, AI skills, and infrastructure. Performs non-intrusive static analysis to identify malicious patterns, data leaks, and vulnerability vectors (SQLi, XSS, Mobile threats).
---

# Security Auditor

This skill provides expert-level security auditing and threat detection. It transforms the agent into a "Red Team" assistant that proactively identifies vulnerabilities and logical bugs before they are committed or merged.

## Overview

Perform comprehensive security reviews across Windows, macOS, Linux, and Mobile (Android/iOS) ecosystems. Prioritize data protection, input validation, and authorization correctness.

## Rules

- **Static Analysis Only**: Never execute potentially malicious code during an audit. Perform non-intrusive analysis of source files and configurations.
- **Surface Mapping**: Systematically map all user inputs, database queries, and external API endpoints.
- **Reporting Format**: Every audit must produce a structured report including:
  - **Severity Score (0-10)**: Based on exploitability and impact.
  - **Threat Analysis**: Description of the vulnerability and potential exploit scenarios.
  - **Mitigation**: Specific, actionable code changes or configuration updates.

## Threat Detection Categories

### 1. Privilege & Access
- Patterns: `sudo`, `chown`, `chmod`, `icacls`, `Set-ExecutionPolicy`.
- Risk: Masking malicious activity or establishing unauthorized persistence.

### 2. Information Disclosure & Exfiltration
- Patterns: `curl`, `wget`, `scp`, `ftp`, `Invoke-WebRequest`.
- Sensitive Targets: `.env`, `.ssh`, `cookies.sqlite`, macOS Keychains, Windows Credentials, Mobile Keystores.

### 3. Web Vulnerabilities (OWASP)
- **SQL Injection**: Unsanitized input in DB queries or ORM bypasses.
- **XSS**: Reflecting user input in HTML/JS without proper encoding.
- **CSRF**: Missing token validation on state-changing requests.

### 4. Mobile Security (Android/iOS)
- **Android**: Dangerous permissions in `AndroidManifest.xml`, use of `adb shell`, or hardcoded keys in `strings.xml`.
- **iOS**: Manipulation of `Entitlements.plist` or insecure storage in `Info.plist`.

### 5. Persistence & Obfuscation
- Patterns: `reg add` (Run keys), `crontab`, `launchctl`, `systemd` units.
- Encoding: Base64, Hex, XOR loops, or `atob()` in unusual contexts.

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "I'll run this script to see what it does" | **STOP.** Violation of Static Analysis Only rule. Analyze code, don't run it. |
| "It's just a local utility, security doesn't matter" | Local utilities are common vectors for privilege escalation. Audit everything. |
| "This Base64 blob is probably fine" | Obfuscation is a primary indicator of malicious payloads. Decode and inspect. |

## The Iron Law

**Every vulnerability identified must be accompanied by a concrete mitigation strategy.** Do not simply flag issues; solve them.

---
Source: Adapted from Antigravity Awesome Skills (audit-skills)
