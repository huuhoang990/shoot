function player(){
    this.x;
    this.y;
    
    this.width;
    this.height;
    
   
    this.radians;
    this.target_radians;
    
    this.direction;
    
    this.firing;
    this.firingTime;
    this.firingDelay;
    
    this.bg = "graphics/arrow.png";
    
     var Constructor = function(){
       this.x =  WIDTH_CANVAS/2;
       this.y = 0;
       
       this.width = 52;
       this.height = 30;
       
       this.radians = 0;
       this.target_radians = 0;
       
       this.direction = true;
        
        this.firing = false;
        this.firingTimer = Date.now();
        this.firingDelay = 200;
        
       this.bg = convertImageObj(this.bg);
     }
    this.Constructor = Constructor;
    this.Constructor();
}

player.prototype.setX = function(i){
   this.x =i;
}

player.prototype.setY = function(i){
   this.y =i;
}

player.prototype.setFiring = function(b){
    this.firing = b;
}

player.prototype.update = function(){
    //direction arrow
    if( this.target_radians != this.radians ){
        if( this.target_radians < this.radians && this.radians >= -3.1){
            this.radians = parseFloat((this.radians-0.1).toFixed(1));
        }else if( this.target_radians > this.radians ){
            //console.log(this.radians);
            //console.log(this.target_radians);
            this.radians = parseFloat((this.radians+0.1).toFixed(1));
        }
    }
    
    //fight
    if(this.firing){
        var elapsed = Date.now() - this.firingTimer;
        if(elapsed > this.firingDelay){
            this.firingTimer = Date.now();
              var bullet_player = new bullet( this.radians, this.x, this.y );
              arr_bullets.push( bullet_player );
        }
        this.firing = false;
    }
}

player.prototype.rotate = function(targetX, targetY){
    var dx = targetX - this.x;
    var dy = targetY - this.y;

    this.target_radians =  Math.atan2(dy,dx).toFixed(1);
    if(this.target_radians > 0)
        this.target_radians ;
}

player.prototype.draw = function(context){
    
    context.save();
    context.translate( this.x, this.y);
    context.rotate(  this.radians);
    context.beginPath();
    //context.fillStyle = "red";
    context.rect(0,-this.height/2, this.width, this.height);
    context.closePath();
    //context.fill();
    context.drawImage( this.bg, 0, -this.height/2);
    context.restore();
    
    /*context.save();
    context.translate(WIDTH_CANVAS/2, HEIGHT_CANVAS-this.height);
    context.rotate( this.radians);
    context.drawImage( this.bg, - this.bg.width, - this.bg.height);
    context.restore();*/ 
    //context.drawImage(this.bg, WIDTH_CANVAS/2 - this.width/2, HEIGHT_CANVAS - this.height);
}
