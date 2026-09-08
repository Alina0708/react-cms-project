(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"test100_atlas_1", frames: [[0,0,1175,551]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.installation1 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.ручка_точное_напряжение = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("tochnoe_napr");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AvOzNIedAAMAAAAmbI+dAAg");
	this.shape.setTransform(-149.5,-0.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AvOTOMAAAgmbIedAAMAAAAmbg");
	this.shape_1.setTransform(-149.5,-0.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248,-124.9,248,248);


(lib.ручка_тока = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("const_tok");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("Axk0dMAjJAAAMAAAAo7MgjJAAAg");
	this.shape.setTransform(-137.5,10.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AxkUeMAAAgo7MAjJAAAMAAAAo7g");
	this.shape_1.setTransform(-137.5,10.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-251,-121.9,251,263.9);


(lib.ручка_грубое_напряжение = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("gruboe_naprz");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AwF02MAgLAAAMAAAAptMggLAAAg");
	this.shape.setTransform(-121,31.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AwFU3MAAAgptMAgLAAAMAAAAptg");
	this.shape_1.setTransform(-121,31.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225,-102.9,225,268.9);


(lib.мультиметр = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_7wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AqxwPIVjAAMAAAAgfI1jAAg");
	this.shape.setTransform(-141,13.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AqxQQMAAAggfIVjAAMAAAAgfg");
	this.shape_1.setTransform(-141,13.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-211,-91.9,211,210);


(lib.медное_тело = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("mednoe_telo");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AuVuVIcrAAIAAcrI8rAAg");
	this.shape.setTransform(-194.25,-27.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AuVOVIAA8qIcqAAIAAcqg");
	this.shape_1.setTransform(-194.25,-27.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-287,-119.9,287,185.5);


(lib.датчик_температуры = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("datchik_tempritcha");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AzmmZMAnNAAAIAAMzMgnNAAAg");
	this.shape.setTransform(-145.5,-25.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AzmGaIAAszMAnNAAAIAAMzg");
	this.shape_1.setTransform(-145.5,-25.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-272,-67.9,272,84);


(lib.алюминивое_тело = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("al_telo");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AszumIZnAAIAAdNI5nAAg");
	this.shape.setTransform(-197,-0.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AszOnIAA9NIZnAAIAAdNg");
	this.shape_1.setTransform(-197,-0.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-280,-94.9,280,189);


(lib.Источник_питания = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("istochni_pitanya");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E70CE5").ss(1,1,1).p("AvTxGIenAAMAAAAiNI+nAAg");
	this.shape.setTransform(1.525,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CE1893").s().p("AvTRHMAAAgiNIenAAMAAAAiNg");
	this.shape_1.setTransform(1.525,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.4,-110.5,197.9,221);


// stage content:
(lib.test100 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.датчик_температуры();
	this.instance.setTransform(1018.5,381.65,0.8303,1);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.датчик_температуры(), 3);

	this.instance_1 = new lib.мультиметр();
	this.instance_1.setTransform(1263,323.8,1,1.4017);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.мультиметр(), 3);

	this.instance_2 = new lib.алюминивое_тело();
	this.instance_2.setTransform(779.05,458.35,0.6335,0.6561,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 2, false, new lib.алюминивое_тело(), 3);

	this.instance_3 = new lib.медное_тело();
	this.instance_3.setTransform(958.25,484.15,0.6573,0.6282);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 2, false, new lib.медное_тело(), 3);

	this.instance_4 = new lib.ручка_грубое_напряжение();
	this.instance_4.setTransform(490,357.5,0.2902,0.2666);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 2, false, new lib.ручка_грубое_напряжение(), 3);

	this.instance_5 = new lib.ручка_точное_напряжение();
	this.instance_5.setTransform(430.5,363.25,0.3037,0.3082);
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.ручка_точное_напряжение(), 3);

	this.instance_6 = new lib.ручка_тока();
	this.instance_6.setTransform(265.6,361,0.2793,0.2536,0,0,180,0,0.2);
	new cjs.ButtonHelper(this.instance_6, 0, 1, 2, false, new lib.ручка_тока(), 3);

	this.instance_7 = new lib.Источник_питания();
	this.instance_7.setTransform(394.55,209.95,1.4632,1);
	new cjs.ButtonHelper(this.instance_7, 0, 1, 2, false, new lib.Источник_питания(), 3);

	this.instance_8 = new lib.installation1();
	this.instance_8.setTransform(53,84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(693,444,535,191);
// library properties:
lib.properties = {
	id: 'DDA57BCD1D6AB144B01D49662B675D6B',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/test100_atlas_1.png?1664908057653", id:"test100_atlas_1"},
		{src:"sounds/_7wav.mp3?1664908057684", id:"_7wav"},
		{src:"sounds/al_telo.mp3?1664908057684", id:"al_telo"},
		{src:"sounds/const_tok.mp3?1664908057684", id:"const_tok"},
		{src:"sounds/datchik_tempritcha.mp3?1664908057684", id:"datchik_tempritcha"},
		{src:"sounds/gruboe_naprz.mp3?1664908057684", id:"gruboe_naprz"},
		{src:"sounds/istochni_pitanya.mp3?1664908057684", id:"istochni_pitanya"},
		{src:"sounds/mednoe_telo.mp3?1664908057684", id:"mednoe_telo"},
		{src:"sounds/tochnoe_napr.mp3?1664908057684", id:"tochnoe_napr"}
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
an.compositions['DDA57BCD1D6AB144B01D49662B675D6B'] = {
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