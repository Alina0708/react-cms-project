(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"video_html_atlas_1", frames: [[0,1026,1175,551],[0,0,1024,1024]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.installation1 = function() {
	this.initialize(ss["video_html_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.kisspngstopwatchcomputericonsclipartstopwatch5ad049d26e25930816667215235998264512 = function() {
	this.initialize(ss["video_html_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Пауза = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABsLpIAA3RIFoAAIAAXRgAnSLpIAA3RIFoAAIAAXRg");
	this.shape.setTransform(-242.25,-12.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289,-86.9,93.5,149);


(lib.Начать = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(10.6,1,1).p("Av2xQMAAAAihIftyvg");
	this.shape.setTransform(-227.475,11.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Av2xQIftPyI/tSvg");
	this.shape_1.setTransform(-227.475,11.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-334.2,-104.2,213.5,231.60000000000002);


(lib.Анимация3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC00").ss(13,1,1).p("Ai7D0IF3nn");
	this.shape.setTransform(-21.825,-4.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC00").s().p("ACAImQgigDgwghIgmgaQgVgOgTgGQgXgHgoACQg0ACgNgBQgjgDgagVQgdgWADgeQACgYAdgcQAjgjAHgMQALgUACggIABg3QACgeAPgWQAQgaAagBQAQgBAPALQAOAJAIAQQALAYAAArQgBBFgSA9QAYAAAbAJIAPgTQAMgPAEgLQACgHADgRQACgPAEgIQAEgIAMgLQAOgLAEgGQAGgJAFgPIAIgaQAEgJAMgQQAMgQAEgJQAIgTgBgdIgDgzIADgxQACgegEgTQgEgQgKgWIgPgiQgKgVgEgOQgHgegEgOQgHgZgNgOQgIgIgXgOQgVgNgHgKQgGgJgHgRQgHgUgFgIQgEgHgMgNQgLgNgFgIQgHgOACgQIgCgCQgLgKgFgKQgIgOABgRQABgRAJgNQARgWAhgDQAegCAaAQQAVAMAXAaIAnAsQATAVAnAnQAhAjANAfQAMAcAHA4QAGArgIAaIABACQAMAeADASQAGAXAAAhIgCA4IAABnQgDA7gVAmIgPAZQgJAPgFAKIgIAaQgFAQgGAIQgEAHgMANQgLAMgFAIQgEAIgEAQQgEATgDAGQgFAOgLAOIAGADQArAXANANQAeAdgGAfQgEAVgWAOQgSALgVAAIgFAAg");
	this.shape_1.setTransform(15.7359,0.0216);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.1,-54.9,87.7,109.9);


(lib.Анимация2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC00").ss(13,1,1).p("Ai7D0IF3nn");
	this.shape.setTransform(-21.825,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC00").s().p("AhGHrQgPgKgHgQQgHgQACgSQACgSAJgPQADgFARgTQAMgPAEgLQACgHADgRQACgPAEgIQAEgIAMgLQAOgLAEgGQAFgJAFgPIAIgaQAEgJAMgQQAMgQAEgJQAIgTgBgdIgDgzIADgyQACgdgEgTQgEgQgKgWIgPgiQgKgVgEgOQgHgegDgOQgHgZgNgOQgIgIgXgOQgVgNgIgKQgGgJgHgRQgHgUgFgIQgEgHgMgNQgLgNgFgIQgHgPACgQIgCgBQgLgKgFgKQgIgOABgRQABgRAJgNQARgWAhgDQAegCAbAQQAVAMAXAaIAmAsQATAVAnAnQAhAjANAfQAMAcAHA4QAGArgIAaIABACQAMAeADASQAGAXAAAhIgCA3IAABoQgDA7gVAmIgPAZQgJAPgFAKIgIAaQgFAQgGAIQgEAHgMANQgLAMgFAIQgEAIgEAQQgEATgDAGQgJAagdAZQgbAYgYAAIgBAAQgRAAgOgKg");
	this.shape_1.setTransform(23.4444,-0.0103);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.1,-50.1,87.7,100.2);


(lib.Анимация1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC00").ss(13,1,1).p("Ai7D0IF3nn");
	this.shape.setTransform(-20.975,13.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC00").s().p("ABnDPQgRgCgOgKQgZgTgHglQgCgIgCgUQgCgSgCgKQgJggglgrQgwgxg3gqIgVgRQgLgKgGgKQgIgOABgRQABgRAKgNQAQgWAhgDQAfgCAaAQQAWAMAXAaIAmAsQASAVAnAnQAhAjAOAeQAMAcAHA4QALBPglAWQgMAHgNAAIgHAAg");
	this.shape_1.setTransform(23.4455,-16.8174);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.2,-37.5,86,81.5);


// stage content:
(lib.video_html = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"sounds_for_videoClipwav",startFrame:0,endFrame:1080,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("sounds_for_videoClipwav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1080,1);
		/* this.stop();
		
		function f1(args){this.play();} 
		this.Начать.addEventListener(MouseEvent.CLICK,f1);
		
		function f2(args){this.stop();}
		this.Пауза.addEventListener(MouseEvent.CLICK,f2);
		 */
		 
		 this.stop();
		this.Начать.addEventListener("click",f1.bind(this));
		function f1(args){this.play();} 
		
		this.Пауза.addEventListener("click",f2.bind(this));
		function f2(args){this.stop();}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1080));

	// все_детали
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC00").ss(5,1,1).p("EghAgjwMBCBAAAMAAABHhMhCBAAAg");
	this.shape.setTransform(377.575,252.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#00CC00").ss(5,1,1).p("EAi2ALxIWBAAIAAcvI2BAAgEg42gofMBCBAAAMAAABHhMhCBAAAg");
	this.shape_1.setTransform(530.175,282.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#00CC00").ss(5,1,1).p("EAx1gTtIfzAAMAAAAybI/zAAgAKGLxIWAAAIAAcvI2AAAgEhRmgofMBCBAAAMAAABHhMhCBAAAg");
	this.shape_2.setTransform(688.65,282.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#00CC00").ss(5,1,1).p("EAx1gHLIE5AAIAAalIk5AAIAA6lIAAsiIfzAAMAAAAybI/zAAIAArUIxvAAI2AAAIAAnpIWAAAIAAHpIAAVGI2AAAIAA1GIgUAAIAA6lgEhRmgofMBCBAAAMAAABHhMhCBAAAg");
	this.shape_3.setTransform(688.65,282.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#00CC00").ss(13,1,1).p("Ai7D0IF3nn");
	this.shape_4.setTransform(1129.875,336.275);

	this.instance = new lib.Анимация1("synched",0);
	this.instance.setTransform(1150.85,323.2);
	this.instance._off = true;

	this.instance_1 = new lib.Анимация2("synched",0);
	this.instance_1.setTransform(1151.7,335.8);
	this.instance_1._off = true;

	this.instance_2 = new lib.Анимация3("synched",0);
	this.instance_2.setTransform(1151.7,340.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#00CC00").ss(13,1,1).p("Egbxgg6MA3jAAAMAAABB1Mg3jAAAg");
	this.shape_5.setTransform(386.125,278.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00CC00").s().p("AGFH5IoEo+IgjgpQgcgkgegvIg2hbIgEAnIAAACIgBABIAAABIgGAqIgBACIAAACIgBADIgRBSQgBAEgCABQgHADgCgGIgihTIAAgCIgOgoIgBgBIAAgBIgBgCIgCgIIgYhHIgBgCIAAAAIgBgBIgCgIIgBgBIAAgBIgCgJQgBgOADgQIAEgOIAHgSIAAAAIAIgQIACgCIAHgKIAAgBIABgBIALgOIAKgJIABgBIABgBQABgDADgBIABgBIAHgHIAQgMIABgBIABgBIAbgOIAAgBIABAAIAcgJIADAAQAQgDANACIAJADIABAAIAAAAIAIADIABAAIAAABIBMAfIACABIABAAIABAAIAmAQIABABIACABIBMAkQADACABADQABAHgHABIhQANIgDABIgCAAIgCAAIgpAFIgDAAIgIAAIggACIgpAHIBpBmQAkAmAeAnIAoA7IACADICkD3IACADID1F6QADAFgEADQgCADgDAAQgCAAgCgDg");
	this.shape_6.setTransform(515.0796,494.9621);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#00CC00").ss(10.6,1,1).p("Ag0g0IBpAAIAABpIhpAAg");
	this.shape_7.setTransform(469.325,426.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00CC00").s().p("Ag0A1IAAhpIBpAAIAABpg");
	this.shape_8.setTransform(469.325,426.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#00CC00").s().p("AN1K5IAAhrIBqAAIAABrgAnTAlQgNgJgGgSQgFgPACgTQADgVAQgoQAQgnADgWQAAgfADgPQADgMAHgJQAIgKALgCQAKgCAKAFQAKAFAGAKQAJAOAAAbQAJgIACgWQAHhbgPhYQgFgfgIgRQgHgPgSgZQgagjgPgMQgNgMgagOIgogWIgigYQgVgPgPgGQgigQgwAEQgfACg1ANQgpAJgWAKQgqASglAnIgRAQQgKAIgJADQgSAFgPgOQgQgNACgSQACgWAhgaIBOg+QAagTAOgEQAKgCATAAQATgBAJgCQAIgCAOgHQAOgHAIgCQAMgEAUACIAgADIAggCQATgCAMACQAVADAjAWIBoBBQAmAYATAQQAsAkAaA1QAbA6AHBfQAEAzgBAzQgBA1gLAcQgJAYgaAeIgqAzQAOADAogBQAjAAARANQALAIAFANQAEAOgHALQgLASgnAAIhwABIgGAAQgdAAgPgJg");
	this.shape_9.setTransform(375.5139,362.2886);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00CC00").s().p("AT7YtIhrAAQgWAAgPgQQgQgPAAgWIAAhrQAAgWAQgPQAPgQAWAAIBrAAQAVAAAQAQQAQAPAAAWIAABrQAAAWgQAPQgQAQgVAAIAAAAgATFXDIABAAIAAgBIgBAAIAAABgATFXDIAAgBIABAAIAAABgATGXCgAq6o2IgJgCIgBAAIAAgBIgIgDIgBAAIAAAAIhMggIgCAAIgBgBIgBAAIgngQIgCgBIhMglQgDgBgBgDQgBgHAHgBIBQgNIADgBIACAAIACgBIApgEIADAAIAIgBIAggCIAogGIAAAAIhohmQgkgngegnIgfgsIgJgOIgCgDIinj7Ij1l7QgDgEAEgEQAFgEAEAFIIFI+IAjApQAcAkAeAwIA2BcIAEgoIAAgCIABgBIAAgBIAGgrIABgBIAAgCIABgEIARhSQABgDACgCQAHgCACAGIAwB9IABABIAAABIABACIAaBOIABACIAAABIABABIACAIIABABIAAAAIACAKQABANgDAQIgEAOIgHASIAAABIgIAPIgCADIgHAKIAAAAIgBACIgLANIgKAJIgBABIgBACQgCADgCABIgBAAIgHAHIgQANIgBAAIgBABIgbAPIAAAAIgBABIgcAIIgDABIgRABIgMgBg");
	this.shape_10.setTransform(347.1979,279.1684);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00CC00").s().p("AkiaXIhrAAQgWAAgPgPQgQgQAAgWIAAhqQAAgWAQgQQAPgPAWAAIBrAAQAWAAAPAPQAQAQAAAWIAABqQAAAWgQAQQgPAPgWAAIAAAAgAjNqhIgEAAIgbgJIgBAAIgBgBIgbgOIgBgBIgBgBIgQgMIgHgHIgBgCIAAAAQgFgBAAgEIgBAAIgJgJIgLgOIgCgBIAAgBIgGgKIgCgCIgIgQIgBAAIgHgSIgDgOQgEgQACgOIACgJIAAgBIAAgBIADgIIAAgBIAAAAIABgCIAbhPIABgCIAAgBIAAgBIAwh9QABgCAEgBQACgBADABQACACABADIARBSIABADIAAACIAAACIAHAqIAAABIAAABIAAACIAFAnIALgVIAqhGQAfgvAcgkIAigpIIEo/QAEgEAFADQAFADgDAGIj1F6IgCADIimD4IgBADIgoA7QgeAngkAmIhoBmIApAHIAfACIAIAAIAEAAIApAFIACAAIABAAIAEABIBPANQADAAABAEQAEAGgHADIhLAkIgBABIgCABIgmAQIgBAAIgBAAIgCABIhLAfIgBABIgBAAIgHADIgBAAIgBAAIgJADIgMABIgQgCg");
	this.shape_11.setTransform(503.7931,268.5269);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00CC00").s().p("AGBLLIAAhrIBrAAIAABrgAiMEgIiOggQhUgSg8gFQgegDgKgFQgXgKgBgUQgBgPATgUQAWgXAEgLQADgJgBgYQAAgVAHgKQAEgGALgHIARgMQAJgJAIgQIAMgdQAHgQAMgKQAMgMAPABQARACALATQAJAQABAUQABAogPAmQgQAngcAbQAnAIAqgVQAkgSAfgjIAhgmQAUgVATgJQABgUASgfQAWglAEgNQAIgXgBgpQAAhMgLh0QgEgqgHgUQgMgigigmQgogqgTgWQgbglgQgQQgbgdgcgGQgKgDgPAAIgZAAQggAAgRgMQgLgIgDgNQgEgOAHgKQAHgMAWgGQAsgLAuAJQAuAKAkAdQAVARAYAeIApA0IAgAlIAgAlQAkAuAGAnQADAMAAAVIABAhQACAUAIAnQADAYgBAmQgCAxAAANIACAyQABAegGAUQgGAXgSAfQgmBBglAsQguA3gzAhIBnAdQAoAMAFAUQAEANgJAMQgJAMgOAFQgIADgMAAQgPAAgUgFg");
	this.shape_12.setTransform(425.4975,360.4601);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00CC00").s().p("AjTLKIAAhqIBrAAIAABqgAhIDQQgRgNgBgdQgBgJACgPIACgXQAAgKgCgbQgBgXACgOQACgWAUgoIAuhfQAXgxAdABQATAAANAVQAKARABAYQADA3gWAwQAUgPAUgYQALgPAVggQATgdAHgSQAGgRACgXIABgpIgBgoQgCgWgGgRQgEgLgHgPIgNgYQgHgOgLgjQgLgggJgQQgihBhcgtQgSgJgHgGQgNgLgCgMQgQABgVgSQgbgYgIgDQgKgFgPgCIgagCQgkgFgGgXQgDgMAHgMQAGgLAMgGQAQgJAgABQAhABASAGQAVAHAXAVIAnAlQASAPAcASIAwAeQAmAYAUAWQAWAWATAjQAOAZAZA9QATAwAJAdQAOAxACAtQACBKgeBGQgeBGg3AwQghAbgPAPQgZAagGAaQAQAFAYgBIApgEQAXgBATAHQAVAJAHASQADAJgBAJQgCAKgGAGQgGAHgNADQgHABgPABIi0AAQggAAgNgJg");
	this.shape_13.setTransform(485.1763,360.52);

	this.instance_3 = new lib.kisspngstopwatchcomputericonsclipartstopwatch5ad049d26e25930816667215235998264512();
	this.instance_3.setTransform(619,32,0.2132,0.1987);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00CC00").s().p("EguXAZmIhrAAQgWAAgPgPQgQgQAAgWIAAhqQAAgWAQgQQAPgPAWAAIBrAAQAVAAAQAPQAQAQAAAWIAABqQAAAWgQAQQgPAPgWAAIAAAAgEgvNAX8IABAAIAAAAIgBAAIAAAAgEgvNAX8IAAAAIABAAIAAAAgEgvMAX8gEAuMgJvIgJgDIgBAAIAAAAIgIgDIgBAAIAAgBIgYgLIgEgCIgwgSIgCgBIgBAAIgBAAIgmgQIgBgBIgCgBIhMgkQgDgCgBgDQgBgHAHgBIBQgNIADgBIACAAIACAAIApgFIADAAIAIAAIAggCIAogGIhohnQgkgmgegnIgog7IgCgDIilj4IgCgDIj1l6QgDgFAEgDQAFgFAEAFIIFI/IAjApQAcAkAeAvIAlA8IACAFIADAFIAMAXIAEgpIAAgCIABgBIAAgBIAGgqIABgCIAAgCIABgDIARhSQABgEACgBQAHgDACAGIAiBTIAAACIAOAoIABABIAAABIABACIAaBPIABACIAAAAIABABIACAIIABABIAAABIACAJQABAOgDAQIgEAOIgHASIAAAAIgIAQIgCACIgHAKIAAABIgBABIgLAOIgKAJIgBABIgBABQgCAEgCAAIgBABIgHAHIgQAMIgBABIgBABIgbAOIAAABIgBAAIgSAGIgIACIgCABIgDAAIgRACIgMgBg");
	this.shape_14.setTransform(771.4975,273.4184);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00CC00").s().p("A/UVDIhqAAQgWAAgQgPQgPgQAAgWIAAhqQAAgWAPgQQAQgPAWAAIBqAAQAWAAAQAPQAPAQAAAWIAABqQAAAWgPAQQgQAPgVAAIgBAAgEggJATZIAAAAIAAAAIAAAAIAAAAgEggJATZIAAAAIAAAAIAAAAgEggJATZgEAhogFOIoFo/IgigpQgcgkgfgvIg1hbIgFAnIAAACIAAABIAAABIgHAqIAAACIAAACIgBADIgRBSQgBAEgDABQgGADgDgGIgwh9IAAgBIAAgBIgBgCIgCgIIgZhHIgBgCIAAAAIAAgBIgDgIIAAgBIAAgBIgCgJQgCgOAEgQIADgOIAHgSIABAAIAIgQIACgCIAGgKIAAgBIACgBIALgOIAJgJIABgBIABgBQACgDACgBIABgBIAHgHIAQgMIABgBIABgBIAbgOIABgBIABAAIARgGIAJgCIABgBIAEAAQAQgDAMACIAJADIABAAIABAAIAHADIABAAIABABIBLAfIACABIABAAIABAAIAmAQIACABIABABIBMAkQAEACAAADQABAHgGABIhQANIgEABIgBAAIgCAAIgpAFIgEAAIgIAAIgfACIgpAHIBoBmQAkAmAeAnIApA7IABADICmD4IACADID1F6QACAFgDADQgDADgCAAQgCAAgDgDg");
	this.shape_15.setTransform(675.1021,302.5056);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},149).to({state:[{t:this.shape_1}]},14).to({state:[{t:this.shape_2}]},12).to({state:[{t:this.shape_3}]},18).to({state:[{t:this.shape_4}]},46).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance_2}]},18).to({state:[]},77).to({state:[{t:this.shape_5}]},76).to({state:[{t:this.shape_6}]},18).to({state:[{t:this.shape_8},{t:this.shape_7}]},21).to({state:[{t:this.shape_9},{t:this.shape_7}]},52).to({state:[{t:this.shape_10}]},73).to({state:[{t:this.shape_8},{t:this.shape_7}]},30).to({state:[{t:this.shape_11}]},61).to({state:[{t:this.shape_12},{t:this.shape_7}]},59).to({state:[{t:this.shape_13},{t:this.shape_7}]},100).to({state:[{t:this.shape_8},{t:this.shape_7}]},21).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.instance_3}]},11).to({state:[{t:this.shape_14},{t:this.instance_3}]},135).to({state:[{t:this.shape_15},{t:this.instance_3}]},31).wait(33));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(255).to({_off:false},0).to({_off:true,x:1151.7,y:335.8},9).wait(816));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(255).to({_off:false},9).to({_off:true,y:340.65},18).wait(798));

	// image
	this.Начать = new lib.Начать();
	this.Начать.name = "Начать";
	this.Начать.setTransform(1185.25,638.85,0.3638,0.3368,0,0,0,-126,11.6);
	new cjs.ButtonHelper(this.Начать, 0, 1, 2, false, new lib.Начать(), 3);

	this.Пауза = new lib.Пауза();
	this.Пауза.name = "Пауза";
	this.Пауза.setTransform(1216.2,650.15,0.6967,0.5584);
	new cjs.ButtonHelper(this.Пауза, 0, 1, 2, false, new lib.Пауза(), 3);

	this.instance_4 = new lib.installation1();
	this.instance_4.setTransform(53,64);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#E70CE5").ss(1,1,1).p("As4vYIZxAAIAAexI5xAAg");
	this.shape_16.setTransform(663.5,248.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CE1893").s().p("As4PZIAA+xIZxAAIAAexg");
	this.shape_17.setTransform(663.5,248.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.Пауза,p:{x:1216.2,y:650.15}},{t:this.Начать,p:{x:1185.25,y:638.85}}]}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.instance_4},{t:this.Пауза,p:{x:1211.6,y:645.85}},{t:this.Начать,p:{x:1180.65,y:634.55}}]},1079).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(693,381,535,303.79999999999995);
// library properties:
lib.properties = {
	id: 'C23D85FAF1F0464A8A18E4C5265F15A7',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/video_html_atlas_1.png?1664348064221", id:"video_html_atlas_1"},
		{src:"sounds/sounds_for_videoClipwav.mp3?1664348064240", id:"sounds_for_videoClipwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C23D85FAF1F0464A8A18E4C5265F15A7'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;