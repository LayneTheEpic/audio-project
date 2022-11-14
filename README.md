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
- [x] Controlling ramp up time, pulse length (% relative to beat time in frames)


## Misc ideas
- [x] Separate out background color handling better
- [ ] Pulses based on volume intensity?
- [x] Sidebar
	- [x] Move upload function and settings into it
- [ ] Show a little animation for drawing out the canvas
- [x] timing accuracy
	- [x] this is like really important but I really uhgfduhgdjfksfgldjgldkfjgkldfgj
- [ ] settings as json?
	- [ ] localStorage?
	- [x] possibly cache BeatData in LS based on file name? or checksum
	- [x] how to checksum? not needed
- [x] instead of using input boxes, turn the "Fade in time (%)" into links that create a screen-wide popup, background opacity
- [ ] screen reader support (ARIA)

### Programming todo
- [x] more object oriented
	- [x] wil need: an interface for the audio file, one for bg animation, one for line visualization
	- [ ] stop beat animation after audio file stops
	- [x] yeah no like actually though I'm going to have to restructure the entire codebase (again) if I want to go OOP which I think I absolutely have to
	- [x] functional really just does not work here, or maybe I just suck at functional programming



code dump
```ts
if(fadeValue + rampValue + sustainValue > 100) {
	animationLabel.textContent = "(Error: Frame times >100%!)";
	return;
}
```
