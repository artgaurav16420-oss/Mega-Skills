# templates-animation

## Overview

Community of 54 nodes

- **Size**: 54 nodes
- **Cohesion**: 0.2204
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| ease_out_quad | Function | skills\slack-gif-creator\core\easing.py | 22-24 |
| ease_in_bounce | Function | skills\slack-gif-creator\core\easing.py | 51-53 |
| ease_out_bounce | Function | skills\slack-gif-creator\core\easing.py | 56-68 |
| ease_in_out_bounce | Function | skills\slack-gif-creator\core\easing.py | 71-75 |
| get_easing | Function | skills\slack-gif-creator\core\easing.py | 117-119 |
| interpolate | Function | skills\slack-gif-creator\core\easing.py | 122-137 |
| calculate_arc_motion | Function | skills\slack-gif-creator\core\easing.py | 194-220 |
| create_blank_frame | Function | skills\slack-gif-creator\core\frame_composer.py | 14-26 |
| draw_circle | Function | skills\slack-gif-creator\core\frame_composer.py | 29-51 |
| draw_text | Function | skills\slack-gif-creator\core\frame_composer.py | 97-131 |
| draw_emoji | Function | skills\slack-gif-creator\core\frame_composer.py | 134-157 |
| draw_emoji_enhanced | Function | skills\slack-gif-creator\core\frame_composer.py | 270-320 |
| Particle | Class | skills\slack-gif-creator\core\visual_effects.py | 16-103 |
| __init__ | Function | skills\slack-gif-creator\core\visual_effects.py | 19-43 |
| update | Function | skills\slack-gif-creator\core\visual_effects.py | 45-57 |
| is_alive | Function | skills\slack-gif-creator\core\visual_effects.py | 59-61 |
| get_alpha | Function | skills\slack-gif-creator\core\visual_effects.py | 63-65 |
| render | Function | skills\slack-gif-creator\core\visual_effects.py | 67-103 |
| ParticleSystem | Class | skills\slack-gif-creator\core\visual_effects.py | 106-210 |
| __init__ | Function | skills\slack-gif-creator\core\visual_effects.py | 109-111 |
| emit | Function | skills\slack-gif-creator\core\visual_effects.py | 113-141 |
| emit_confetti | Function | skills\slack-gif-creator\core\visual_effects.py | 143-169 |
| emit_sparkles | Function | skills\slack-gif-creator\core\visual_effects.py | 171-192 |
| update | Function | skills\slack-gif-creator\core\visual_effects.py | 194-201 |
| render | Function | skills\slack-gif-creator\core\visual_effects.py | 203-206 |
| get_particle_count | Function | skills\slack-gif-creator\core\visual_effects.py | 208-210 |
| create_bounce_animation | Function | skills\slack-gif-creator\templates\bounce.py | 19-84 |
| create_explode_animation | Function | skills\slack-gif-creator\templates\explode.py | 23-237 |
| create_particle_burst | Function | skills\slack-gif-creator\templates\explode.py | 240-293 |
| create_fade_animation | Function | skills\slack-gif-creator\templates\fade.py | 20-146 |
| apply_opacity | Function | skills\slack-gif-creator\templates\fade.py | 149-172 |
| create_crossfade | Function | skills\slack-gif-creator\templates\fade.py | 175-248 |
| create_fade_to_color | Function | skills\slack-gif-creator\templates\fade.py | 251-287 |
| create_flip_animation | Function | skills\slack-gif-creator\templates\flip.py | 20-192 |
| create_quick_flip | Function | skills\slack-gif-creator\templates\flip.py | 195-224 |
| create_nope_flip | Function | skills\slack-gif-creator\templates\flip.py | 227-253 |
| create_morph_animation | Function | skills\slack-gif-creator\templates\morph.py | 20-197 |
| create_reaction_morph | Function | skills\slack-gif-creator\templates\morph.py | 200-229 |
| create_shape_morph | Function | skills\slack-gif-creator\templates\morph.py | 232-282 |
| create_move_animation | Function | skills\slack-gif-creator\templates\move.py | 19-157 |
| create_path_from_points | Function | skills\slack-gif-creator\templates\move.py | 160-196 |
| create_pulse_animation | Function | skills\slack-gif-creator\templates\pulse.py | 20-153 |
| create_attention_pulse | Function | skills\slack-gif-creator\templates\pulse.py | 156-185 |
| create_breathing_animation | Function | skills\slack-gif-creator\templates\pulse.py | 188-228 |
| create_shake_animation | Function | skills\slack-gif-creator\templates\shake.py | 19-109 |
| create_slide_animation | Function | skills\slack-gif-creator\templates\slide.py | 19-137 |
| create_multi_slide | Function | skills\slack-gif-creator\templates\slide.py | 140-231 |
| create_spin_animation | Function | skills\slack-gif-creator\templates\spin.py | 20-146 |
| create_loading_spinner | Function | skills\slack-gif-creator\templates\spin.py | 149-231 |
| create_wiggle_animation | Function | skills\slack-gif-creator\templates\wiggle.py | 20-230 |

*... and 4 more members.*

## Execution Flows

- **create_quick_flip** (criticality: 0.53, depth: 3)
- **create_nope_flip** (criticality: 0.53, depth: 3)
- **create_reaction_morph** (criticality: 0.53, depth: 3)
- **create_attention_pulse** (criticality: 0.53, depth: 3)
- **create_breathing_animation** (criticality: 0.53, depth: 3)
- **create_explode_animation** (criticality: 0.52, depth: 2)
- **create_fade_animation** (criticality: 0.52, depth: 2)
- **create_crossfade** (criticality: 0.52, depth: 2)
- **create_fade_to_color** (criticality: 0.52, depth: 2)
- **create_shape_morph** (criticality: 0.52, depth: 2)
- *... and 18 more flows.*

## Dependencies

### Outgoing

- `int` (63 edge(s))
- `get` (51 edge(s))
- `convert` (41 edge(s))
- `append` (36 edge(s))
- `range` (32 edge(s))
- `sin` (25 edge(s))
- `new` (22 edge(s))
- `max` (21 edge(s))
- `uniform` (14 edge(s))
- `alpha_composite` (14 edge(s))
- `cos` (12 edge(s))
- `min` (10 edge(s))
- `len` (10 edge(s))
- `paste` (10 edge(s))
- `abs` (9 edge(s))

### Incoming

- `skills\slack-gif-creator\core\easing.py` (11 edge(s))
- `skills\slack-gif-creator\core\frame_composer.py` (5 edge(s))
- `skills\slack-gif-creator\templates\fade.py` (4 edge(s))
- `skills\slack-gif-creator\templates\flip.py` (3 edge(s))
- `skills\slack-gif-creator\templates\morph.py` (3 edge(s))
- `skills\slack-gif-creator\templates\pulse.py` (3 edge(s))
- `skills\slack-gif-creator\templates\zoom.py` (3 edge(s))
- `skills\slack-gif-creator\core\visual_effects.py` (2 edge(s))
- `skills\slack-gif-creator\templates\explode.py` (2 edge(s))
- `skills\slack-gif-creator\templates\move.py` (2 edge(s))
- `skills\slack-gif-creator\templates\slide.py` (2 edge(s))
- `skills\slack-gif-creator\templates\spin.py` (2 edge(s))
- `skills\slack-gif-creator\templates\wiggle.py` (2 edge(s))
- `skills\slack-gif-creator\templates\bounce.py` (1 edge(s))
- `skills\slack-gif-creator\templates\shake.py` (1 edge(s))
