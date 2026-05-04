# Go Fractals CLI - Design

## Overview

A command-line tool that generates ASCII art fractals. Supports two fractal types with configurable output.

## Usage

```bash
## Sierpinski triangle
fractals sierpinski --size 32 --depth 5

## Mandelbrot set
fractals mandelbrot --width 80 --height 24 --iterations 100

## Custom character
fractals sierpinski --size 16 --char '#'

## Help
fractals --help
fractals sierpinski --help
```

## Commands

### `sierpinski`

Generates a Sierpinski triangle using recursive subdivision.

Flags:

1. `--size` (default: 32) - Width of the triangle base in characters
1. `--depth` (default: 5) - Recursion depth
1. `--char` (default: '*') - Character to use for filled points

Output: Triangle printed to stdout, one line per row.

### `mandelbrot`

Renders the Mandelbrot set as ASCII art. Maps iteration count to characters.

Flags:

1. `--width` (default: 80) - Output width in characters
1. `--height` (default: 24) - Output height in characters
1. `--iterations` (default: 100) - Maximum iterations for escape calculation
1. `--char` (default: gradient) - Single character, or omit for gradient " .:-=+*#%@"

Output: Rectangle printed to stdout.

## Architecture

```text
cmd/
  fractals/
    main.go           # Entry point, CLI setup
internal/
  sierpinski/
    sierpinski.go     # Algorithm
    sierpinski_test.go
  mandelbrot/
    mandelbrot.go     # Algorithm
    mandelbrot_test.go
  cli/
    root.go           # Root command, help
    sierpinski.go     # Sierpinski subcommand
    mandelbrot.go     # Mandelbrot subcommand
```

## Dependencies

1. Go 1.21+
1. `github.com/spf13/cobra` for CLI

## Acceptance Criteria

1. `fractals --help` shows usage
1. `fractals sierpinski` outputs a recognizable triangle
1. `fractals mandelbrot` outputs a recognizable Mandelbrot set
1. `--size`, `--width`, `--height`, `--depth`, `--iterations` flags work
1. `--char` customizes output character
1. Invalid inputs produce clear error messages
1. All tests pass
