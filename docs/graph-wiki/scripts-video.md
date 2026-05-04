# scripts-video

## Overview

Community of 4 nodes

- **Size**: 4 nodes
- **Cohesion**: 0.0769
- **Dominant Language**: python

## Members

| Name | Kind | File | Lines |
|------|------|------|-------|
| check_yt_dlp | Function | skills\youtube-downloader\scripts\download_video.py | 13-19 |
| get_video_info | Function | skills\youtube-downloader\scripts\download_video.py | 22-30 |
| download_video | Function | skills\youtube-downloader\scripts\download_video.py | 33-100 |
| main | Function | skills\youtube-downloader\scripts\download_video.py | 103-141 |

## Execution Flows

- **main** (criticality: 0.37, depth: 2)

## Dependencies

### Outgoing

- `print` (11 edge(s))
- `add_argument` (5 edge(s))
- `run` (4 edge(s))
- `extend` (3 edge(s))
- `get` (3 edge(s))
- `replace` (1 edge(s))
- `append` (1 edge(s))
- `loads` (1 edge(s))
- `ArgumentParser` (1 edge(s))
- `parse_args` (1 edge(s))
- `exit` (1 edge(s))

### Incoming

- `skills\youtube-downloader\scripts\download_video.py` (4 edge(s))
