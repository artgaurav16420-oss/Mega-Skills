# Go Fractals CLI - Implementation Plan

Execute this plan using the `mega-skills:subagent-driven-development` skill.

## Context

Building a CLI tool that generates ASCII fractals. See `design.md` for full specification.

## Tasks

### Task 1: Project Setup

Create the Go module and directory structure.

#### Do

1. Initialize `go.mod` with module name `github.com/mega-skills-test/fractals`
1. Create directory structure: `cmd/fractals/`, `internal/sierpinski/`, `internal/mandelbrot/`, `internal/cli/`
1. Create minimal `cmd/fractals/main.go` that prints "fractals cli"
1. Add `github.com/spf13/cobra` dependency

#### Verify

1. `go build ./cmd/fractals` succeeds
1. `./fractals` prints "fractals cli"

---

### Task 2: CLI Framework with Help

Set up Cobra root command with help output.

#### Do (2)

1. Create `internal/cli/root.go` with root command
1. Configure help text showing available subcommands
1. Wire root command into `main.go`

#### Verify (2)

1. `./fractals --help` shows usage with "sierpinski" and "mandelbrot" listed as available commands
1. `./fractals` (no args) shows help

---

### Task 3: Sierpinski Algorithm

Implement the Sierpinski triangle generation algorithm.

#### Do (3)

1. Create `internal/sierpinski/sierpinski.go`
1. Implement `Generate(size, depth int, char rune) []string` that returns lines of the triangle
1. Use recursive midpoint subdivision algorithm
1. Create `internal/sierpinski/sierpinski_test.go` with tests:
1. Small triangle (size=4, depth=2) matches expected output
1. Size=1 returns single character
1. Depth=0 returns filled triangle

#### Verify (3)

1. `go test ./internal/sierpinski/...` passes

---

### Task 4: Sierpinski CLI Integration

Wire the Sierpinski algorithm to a CLI subcommand.

#### Do (4)

1. Create `internal/cli/sierpinski.go` with `sierpinski` subcommand
1. Add flags: `--size` (default 32), `--depth` (default 5), `--char` (default '*')
1. Call `sierpinski.Generate()` and print result to stdout

#### Verify (4)

1. `./fractals sierpinski` outputs a triangle
1. `./fractals sierpinski --size 16 --depth 3` outputs smaller triangle
1. `./fractals sierpinski --help` shows flag documentation

---

### Task 5: Mandelbrot Algorithm

Implement the Mandelbrot set ASCII renderer.

#### Do (5)

1. Create `internal/mandelbrot/mandelbrot.go`
1. Implement `Render(width, height, maxIter int, char string) []string`
1. Map complex plane region (-2.5 to 1.0 real, -1.0 to 1.0 imaginary) to output dimensions
1. Map iteration count to character gradient " .:-=+*#%@" (or single char if provided)
1. Create `internal/mandelbrot/mandelbrot_test.go` with tests:
1. Output dimensions match requested width/height
1. Known point inside set (0,0) maps to max-iteration character
1. Known point outside set (2,0) maps to low-iteration character

#### Verify (5)

1. `go test ./internal/mandelbrot/...` passes

---

### Task 6: Mandelbrot CLI Integration

Wire the Mandelbrot algorithm to a CLI subcommand.

#### Do (6)

1. Create `internal/cli/mandelbrot.go` with `mandelbrot` subcommand
1. Add flags: `--width` (default 80), `--height` (default 24), `--iterations` (default 100), `--char` (default "")
1. Call `mandelbrot.Render()` and print result to stdout

#### Verify (6)

1. `./fractals mandelbrot` outputs recognizable Mandelbrot set
1. `./fractals mandelbrot --width 40 --height 12` outputs smaller version
1. `./fractals mandelbrot --help` shows flag documentation

---

### Task 7: Character Set Configuration

Ensure `--char` flag works consistently across both commands.

#### Do (7)

1. Verify Sierpinski `--char` flag passes character to algorithm
1. For Mandelbrot, `--char` should use single character instead of gradient
1. Add tests for custom character output

#### Verify (7)

1. `./fractals sierpinski --char '#'` uses '#' character
1. `./fractals mandelbrot --char '.'` uses '.' for all filled points
1. Tests pass

---

### Task 8: Input Validation and Error Handling

Add validation for invalid inputs.

#### Do (8)

1. Sierpinski: size must be > 0, depth must be >= 0
1. Mandelbrot: width/height must be > 0, iterations must be > 0
1. Return clear error messages for invalid inputs
1. Add tests for error cases

#### Verify (8)

1. `./fractals sierpinski --size 0` prints error, exits non-zero
1. `./fractals mandelbrot --width -1` prints error, exits non-zero
1. Error messages are clear and helpful

---

### Task 9: Integration Tests

Add integration tests that invoke the CLI.

#### Do (9)

1. Create `cmd/fractals/main_test.go` or `test/integration_test.go`
1. Test full CLI invocation for both commands
1. Verify output format and exit codes
1. Test error cases return non-zero exit

#### Verify (9)

1. `go test ./...` passes all tests including integration tests

---

### Task 10: README

Document usage and examples.

#### Do (10)

1. Create `README.md` with:
1. Project description
1. Installation: `go install ./cmd/fractals`
1. Usage examples for both commands
1. Example output (small samples)

#### Verify (10)

1. README accurately describes the tool
1. Examples in README actually work
