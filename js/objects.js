/*
    ADDING CUSTOM EVENT AND DISPATCHING
    -custom event lets add more data to event object
    var newevent = new CustomEvent('event', {'extradata':'data'});
    // add event listener
    element.addEventListener('event', callback);
    // dispatch event;
    element.dispatchEvent(newevent);
*/

// KEYPRESS DETECTION(jquery)
// $(document).keypress(function(e) {alert(String.fromCharCode(e.which));})

// sprite object
function sprite(options) {
    var obj = {};
    obj.frameIndex=0;
        obj.tickCount=0;
        obj.ticksPerFrame=2;
        obj.numberOfFrames = options.numberOfFrames || 5*2;
        obj.dx=0,obj.dy=0;

    obj.context = options.context;
    obj.width = options.width;
    obj.height= options.height;
    obj.image = options.image;

    obj.render = function() {
        obj.context.clearRect(0,0,this.width/this.numberOfFrames, this.height);
        obj.context.drawImage(obj.image, 
            this.frameIndex * this.width / this.numberOfFrames,
            0, 
            this.width / this.numberOfFrames, 
            this.height,
            this.x,
            this.y,
            this.width / this.numberOfFrames,
            this.height
        );
    };

    obj.update = function() {
        //this.x+=0.3;
        //this.y+=0.4;
        this.tickCount+=1;
        if(this.tickCount>this.ticksPerFrame) {
            this.tickCount=0;
            this.frameIndex = (this.frameIndex+1)%this.numberOfFrames;
        }
    };
    return obj;
}

// new events
var TargetHitEvent = new CustomEvent('target_hit', {});
var CollideEvent =  new CustomEvent('collide', {});

// GAME OBJECT
function GameObject(properties) {
    var obj = {};
    obj.sprite = properties.sprite;
}
