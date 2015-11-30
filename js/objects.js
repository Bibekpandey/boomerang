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
        obj.ticksPerFrame=2;
        obj.numberOfFrames = options.numberOfFrames || 1;
        obj.dx=0,obj.dy=0;
    obj.velocity = function (t) {
        var vel = {vx:0,vy:0};
        return vel;
    };
    obj.accn_func = function(t) {};

    obj.context = options.context;
    obj.width = options.width;
    obj.height= options.height;
    obj.image = options.image;

    obj.render = function() {
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
        this.tickCount+=1;
        if(this.tickCount>this.ticksPerFrame) {
            this.tickCount=0;
            this.frameIndex = (this.frameIndex+1)%this.numberOfFrames;
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
                console.log('Collision :' + objects[x].name+ ' and ' + objects[y].name);
                console.log(JSON.stringify(objects[x].getRect()) + ' ' + JSON.stringify(objects[y].getRect()));
            }
        }
    }
}

function collisionRect(rectA, rectB) {
    // check diagonals of any rectangle crosses sides of other
    var d1 = line(rectA.x1,rectA.y1,rectA.x2,rectA.y2),
        d2 = line(rectA.x2,rectA.y1, rectA.x1,rectA.y2);

    // rectB's xs and ys
    var x1=rectB.x1, x2=rectB.x2, y1=rectB.y1, y2=rectB.y2;

    return linesIntersect(d1, line(x1,y1,x2,y1)) ||
            linesIntersect(d1, line(x2,y1,x2,y2)) ||
            linesIntersect(d1, line(x2,y2,x1,y2)) ||
            linesIntersect(d1, line(x1,y2,x1,y1)) ||
            linesIntersect(d2, line(x1,y1,x2,y1)) ||
            linesIntersect(d2, line(x2,y1,x2,y2)) ||
            linesIntersect(d2, line(x2,y2,x1,y2)) ||
            linesIntersect(d2, line(x1,y2,x1,y1));
}

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

