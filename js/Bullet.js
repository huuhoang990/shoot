
function bullet( radian, x, y ){
    this.x;
    this.y;
    
    this.dx;
    this.dy;
    
    this.radius;
    this.radian;
    
    this.speed;
    
    this.color;
    
    var Constructor = function( radian, x, y ){
       
       
        this.x = x;
        this.y = y;
                
        this.speed = 10;
        
        this.radius = 2;
        this.radian = radian;
        
        this.dx = Math.cos(this.radian) * this.speed;
        this.dy = Math.sin(this.radian) * this.speed;
    }
    this.Constructor = Constructor;
    this.Constructor(radian, x, y);
}

bullet.prototype.getX = function(){ return this.x; }
bullet.prototype.getY = function(){ return this.y; }
bullet.prototype.getRadius = function(){ return this.radius; }

bullet.prototype.update = function(){
    this.x += this.dx;
    this.y += this.dy ;
    
    if( this.x < -this.radius || this.x > WIDTH_CANVAS + this.radius ||
        this.y < - this.radius || this.y > HEIGHT_CANVAS + this.radius){
        return true;
    }
    return false;
}

bullet.prototype.draw = function(context){

    context.beginPath();
    context.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, false );
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}