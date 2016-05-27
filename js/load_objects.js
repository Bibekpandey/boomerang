function loadObjects(canvas) {
    var objects = new Array();

    // load images first
    var boyImg = new Image();
        boyImg.src = "images/boy.png";
    var hillImg = new Image();
        hillImg.src = "images/jungle.jpg";

    // load player
    var boy = GameObject({
            step:3,
            context:canvas.getContext("2d"),
            image:boyImg,
            width:832,
            height:1344,
            name:'boy',
            frameDetails: { 
                numActions:21, // number of actions(walk, fly, jump, etc)
                numFrames:{ // number of frames in action
                    "right":9,
                    "left":9,
                    "up":9,
                    "down":9,
                },
                action:{
                    "right": 11, // row in sprite image
                    "left":9,
                    "up":8,
                    "down":10
                },
            },
            currentAction:"right",
            defaultAction:0,
            frameWidth:64,
            frameHeight:64,
            ticksPerFrame:2
        });

        // load background
        var hills = GameObject({
            context:canvas.getContext("2d"),
            image:hillImg,
            numberOfFrames:1,
            width:1500,
            height:1100,
            name:'background'
        });

        // render function for background
        hills.render = function () {
            this.context.drawImage(this.image,
                0,0, this.width, this.height, 0,0, 720,480);
            this.update();
        };

        objects.push(boy);
        objects.push(hills);
        return objects;
}
