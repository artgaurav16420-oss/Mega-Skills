---
name: high-fidelity-pptx
description: "Master-level presentation generation using Marp and PptxGenJS. Transforms complex markdown/logic into cinematic, high-impact PowerPoint slides (Kimi-style)."
---

# High-Fidelity PPTX (Beast Mode)

This skill provides elite-level presentation capabilities. It transforms the agent into a cinematic designer, capable of producing slides that match the visual quality of premium AI tools like Kimi.

## The Designer's Mindset

- **Visual Storytelling**: Don't just list facts. Use the "Rule of Thirds" and high-contrast color theory.
- **Cinematic Pacing**: Every slide must have a clear focus (Image, Stat, or Quote). Never use more than 5 bullets per slide.
- **Brand Fidelity**: Every presentation MUST follow a consistent visual motif (e.g., specific rounded corners, icon styles, and font pairings).

## Technical Workflows

### 1. Marp Cinematic Engine (Recommended)
Use Marp for lightning-fast, highly styled markdown slides.

```bash
# Convert markdown to high-quality PPTX
powershell -ExecutionPolicy Bypass -Command "marp --pptx presentation.md"

# Convert to editable PPTX (requires LibreOffice)
powershell -ExecutionPolicy Bypass -Command "marp --pptx --pptx-editable presentation.md"
```

### 2. PptxGenJS (Granular Control)
Use for complex, programmatic layouts that require precise shape and table positioning.

```javascript
import pptxgen from "pptxgenjs";
let pres = new pptxgen();
let slide = pres.addSlide();
slide.addText("Elite Engineering", { x:1, y:1, color:"363636", fill:"F1F1F1" });
pres.writeFile({ fileName: "BeastMode.pptx" });
```

## Elite Layout Options

| Layout | Use Case | Implementation Tip |
| :--- | :--- | :--- |
| **Half-Bleed** | High-impact visuals | 50% slide width image on left, text on right. |
| **The Big Stat** | Data-driven narratives | 72pt font for the number, 18pt for the label. |
| **Process Flow** | Methodology descriptions | Use arrows and sequence numbers (1, 2, 3) in circles. |
| **The Grid** | Comparison & Features | Use 2x2 or 2x3 cards with icons. |

## Rules

- **Palette Dominance**: One color must dominate (60-70% visual weight). Never give all colors equal weight.
- **Typography Pairing**: Use a bold header font (e.g., Arial Black, Impact) paired with a clean body font (e.g., Calibri, Inter).
- **No Bullet Bloat**: If a slide has more than 5 bullets, split it into two slides.
- **High-Contrast**: Every element MUST be readable. White text on dark backgrounds or vice-versa.

## Red Flags

| Thought | Reality |
| :--- | :--- |
| "I'll just use title + bullets" | **STOP.** Hallucination of a slide. Every slide needs a visual element (Icon, Image, or Chart). |
| "I'll use the default blue theme" | **STOP.** Generic and unprofessional. Use a content-informed custom palette. |
| "I'll add an accent line under the title" | **STOP.** Hallmark of AI-generated "slop." Use whitespace or background shapes instead. |

## The Iron Law

**A presentation is a visual performance. Every slide must pass a "Subagent Visual QA" check for alignment, contrast, and overlapping elements before delivery.**

---
Source: Mega-Skills Elite Design Series
