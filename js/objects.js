/*
    ADDING CUSTOM EVENT AND DISPATCHING
    -custom event lets add more data to event object
    var newevent = new CustomEvent('event', {'extradata':'data'});
    // add event listener
    element.addEventListener('event', callback);
    // dispatch event;
    element.dispatchEvent(newevent);
*/

// GameObject object
function GameObject(options) {
    var obj = {};
    obj.type = options.type || "GameObject";
    obj.name = options.name || "NoName";
    obj.frameIndex=0;
    obj.tickCount=0;
    obj.ticksPerFrame=options.ticksPerFrame || 2;
    obj.frameDetails = options.frameDetails;
    obj.dx=0,
    obj.dy=0;

    obj.velocity = function (t) {
        var vel = {vx:0,vy:0};
        return vel;
    };

    obj.x= obj.y=0;

    obj.accn_func = function(t) {};

    obj.context = options.context;
    obj.width = options.width;
    obj.height= options.height;
    obj.image = options.image;

    obj.frameWidth = options.frameWidth || this.width;
    obj.frameHeight= options.frameHeight || this.height;

    obj.currentAction = options.currentAction;
    obj.currentFrame = 0;

    obj.render = function() {
        obj.context.drawImage(obj.image, 

            this.currentFrame * this.width/13,

            this.frameDetails.action[this.currentAction] * 
                    this.height / this.frameDetails.numActions, 

            this.width / 13,//this.frameDetails.numFrames[this.currentAction], 
            this.height/21,
            this.x,
            this.y,
            this.width / 13,
            this.height/21
        );
    };

    obj.update = function() {
            //this.tickCount+=1;
            if(this.tickCount > this.ticksPerFrame) {
                this.tickCount=0;
                this.currentFrame = (this.currentFrame+1) %
                    this.frameDetails.numFrames[this.currentAction];
            }
        };


    obj.getRect = function () {
        return {x1:this.x,
            y1:this.y,
            x2:this.x+this.width/this.numberOfFrames,
            y2:this.y+this.height/this.numberOfFrames
        }
    }
    return obj;
}

function checkCollision(objects) {
    for(var x=0;x<objects.length;x++) {
        for(var y=x+1;y<objects.length;y++) {
            if(collisionRect(objects[x].getRect(), 
                                        objects[y].getRect())) {
                var stat='Collision :' + objects[x].name+ ' and ' + objects[y].name;
                stat+=('<br>'+JSON.stringify(objects[x].getRect()) + ' ' + JSON.stringify(objects[y].getRect()));
                $('span').text(stat);
            }
            else $('span').text('');
        }
    }
}

function collisionRect(rectA, rectB) {
    // Just check if any corner of rectA lies within rect B
    // might not work for some special conditions, which are
    // not expected to occur in the game
    return pointInside(rectA.x1,rectA.y1, rectB) ||
        pointInside(rectA.x2, rectA.y1, rectB) ||
        pointInside(rectA.x2, rectA.y2, rectB) ||
        pointInside(rectA.x1, rectA.y2, rectB);
}

// check if point lies inside rect or not
function pointInside(x, y, rect) {
    return rect.x1<=x && rect.x2>=x && rect.y1<=y && rect.y2>=y;
}

// checking if lines intersect or not.. not working well
function linesIntersect(lineA, lineB) {
    // idea is to put two points of a line into the eqn or other
    // and if product is <=0 intersect else false

    var funcX;
    var funcY;
    // find eqn of lineA
    if(Math.abs(lineA.x1-lineA.x2)<=0.001) {
        var m = (lineA.y2-lineA.y1)/(lineA.x2-lineA.x1);
        var c = lineA.y1-lineA.x1*m;
        funcX = function(x, y) {
            return y - m*x - c;
        }
    }
    else {
        funcX = function(x, y){ return lineA.x1-x; }
    }

    // eqn of lineB
    if(Math.abs(lineB.x1!=lineB.x2)<=0.001) {
        var m = (lineB.y2-lineB.y1)/(lineB.x2-lineA.x1);
        var c = lineB.y1 - lineB.x1*m;
        funcY = function(x, y) {
            return y-m*x - c;
        }
    }
    else {
        funcY = function(x, y) { return lineB.x1-x; }
    }

    return funcX(lineB.x1,lineB.y1)*funcX(lineB.x2,lineB.y2)<=0
        && funcY(lineA.x1,lineA.y1)*funcY(lineA.x2,lineA.y2)<=0;
}

function line(a,b,c,d) {
    return {x1:a,x2:c,y1:b,y2:d};
}

// new events
var TargetHitEvent = new CustomEvent('target_hit', {});
var CollideEvent =  new CustomEvent('collide', {});

