# audio-project
Messing with the web audio API

Batch files are for my teacher



## Settings options

### Color modes
- [ ] pulse (current)
- [ ] flat colors (no fade in)
- [ ] solid
- [ ] custom cycle

### Visualizer options
- [x] Number of bars
- [ ] Line type
- [ ] Line location
- [ ] Visualizer softness (smoothing constant)
- [ ] Controlling ramp up time, pulse length (% relative to beat time in frames)


## Misc ideas
- [ ] Separate out background color handling better
- [ ] Pulses based on volume intensity?
- [x] Sidebar
	- [x] Move upload function and settings into it
- [ ] Show a little animation for drawing out the canvas
- [ ] use delta from rAF to ensure timing accuracy
	- [ ] this is like really important but I really uhgfduhgdjfksfgldjgldkfjgkldfgj
	- [ ] could precompute at what points the peaks appear and just check "hey is it at this time if yes then animate peak"
	- [ ] sum deltas from rAF, compare to starting time, and if it's within a close enough margin, animate the peak
- [ ] stop animating after audio file ends
- [ ] settings as json?
	- [ ] localStorage?
	- [x] possibly cache BeatData in LS based on file name? or checksum
	- [x] how to checksum? not needed

### Programming todo
- [ ] more object oriented
	- [ ] wil need: an interface for the audio file, one for bg animation, one for line visualization
	- [ ] stop beat animation after audio file stops
	- [ ] yeah no like actually though I'm going to have to restructure the entire codebase (again) if I want to go OOP which I think I absolutely have to
	- [ ] functional really just does not work here, or maybe I just suck at functional programming
