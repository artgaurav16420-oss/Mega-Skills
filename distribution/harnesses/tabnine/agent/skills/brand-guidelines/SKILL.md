---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
license: Complete terms in LICENSE.txt
---

# Anthropic Brand Styling

## Overview

To access Anthropic's official brand identity and style resources, use this skill.

**Keywords**: branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, Anthropic brand, visual formatting, visual design

## Brand Guidelines

### Colors

#### Main Colors

1. Dark: `#141413` - Primary text and dark backgrounds

1. Light: `#faf9f5` - Light backgrounds and text on dark

1. Mid Gray: `#b0aea5` - Secondary elements

1. Light Gray: `#e8e6dc` - Subtle backgrounds

#### Accent Colors

1. Orange: `#d97757` - Primary accent

1. Blue: `#6a9bcc` - Secondary accent

1. Green: `#788c5d` - Tertiary accent

### Typography

1. **Headings**: Poppins (with Arial fallback)

1. **Body Text**: Lora (with Georgia fallback)

1. **Note**: Fonts should be pre-installed in your environment for best results

## Features

### Smart Font Application

1. Applies Poppins font to headings (24pt and larger)

1. Applies Lora font to body text

1. Automatically falls back to Arial/Georgia if custom fonts unavailable

1. Preserves readability across all systems

### Text Styling

1. Headings (24pt+): Poppins font

1. Body text: Lora font

1. Smart color selection based on background

1. Preserves text hierarchy and formatting

### Shape and Accent Colors

1. Non-text shapes use accent colors

1. Cycles through orange, blue, and green accents

1. Maintains visual interest while staying on-brand

## Technical Details

### Font Management

1. Uses system-installed Poppins and Lora fonts when available

1. Provides automatic fallback to Arial (headings) and Georgia (body)

1. No font installation required - works with existing system fonts

1. For best results, pre-install Poppins and Lora fonts in your environment

### Color Application

1. Uses RGB color values for precise brand matching

1. Applied via python-pptx's RGBColor class

1. Maintains color fidelity across different systems
