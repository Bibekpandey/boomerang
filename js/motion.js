function make_movement(obj) {
            obj.tickCount+=1;
            /*
            if(keys[37] && keys[38]) {
                obj.x-=step;
                obj.y-=step;
            }else if(keys[39] && keys[38]) {
                obj.x+=step;
                obj.y-=step;
            }else if(keys[37] && keys[40]) {
                obj.x-=step;
                obj.y+=step;
            }else if(keys[39] && keys[40]) {
                obj.x+=step;
                obj.y+=step;
            }
            else*/ if(keys[37])  {
                obj.currentAction="left";
                obj.x-=obj.step;
            }
            else if(keys[38])  {
                obj.currentAction="up";
                obj.y-=obj.step;
            }
            else if(keys[39])  {
                obj.currentAction="right";
                obj.x+=obj.step;
            }
            else if(keys[40]) {
                obj.currentAction="down";
                obj.y+=obj.step;
            }
            else {}
        }
