function Enemy( type , rank ){
    this.x;
    this.y;
    
    this.radius;
    
    this.dx;
    this.dy;
    this.radian;
    this.speed;
    
    this.health;
    this.type;
    this.rank;
    
    this.color;
    
    this.ready;
    this.dead;
    
    this.hit;
    this.hitTimer;
    
    var Constructor = function( type , rank ){
        this.type = type;
        this.rank = rank;
        
        //default enemy
        if(this.type == 1){
            this.color = "rgba(0,0,255,128)";
            if(this.rank == 1){
                this.speed = 2;
                this.radius = 5;
                this.health = 1;
            }
            if(this.rank == 2){
                this.speed = 2;
                this.radius = 10;
                this.health = 2;
            }
            if(this.rank == 3){
                this.speed = 1.5;
                this.radius = 20;
                this.health = 3;
            }
            if(this.rank == 4){
                this.speed = 1.5;
                this.radius = 30;
                this.health = 4;
            }
        }
        
        //stronger, faster default
        if(this.type == 2){
            this.color =  "rgba(255 ,0 ,0, 128)";
            if(this.rank == 1){
                this.speed = 3;
                this.radius = 5;
                this.health = 2;
            }
            if(this.rank == 2){
                this.speed = 3;
                this.radius = 10;
                this.health = 3;
            }
            if( this.rank == 3){
                this.speed = 2.5;
                this.radius = 20;
                this.health = 3;
            }
            if(this.rank==4){
                this.speed = 2.5;
                this.radius = 30;
                this.health = 4;
            }
        }
        
        //slow, but hard to kill
        if(this.type == 3){
            this.color = "rgba(0,255,0,128)";
            if(this.rank == 1){
                this.speed = 1.5;
                this.radius = 5;
                this.health = 3;
            }
            if(this.rank == 2){
                this.speed = 1.5;
                this.radius = 10;
                this.health = 4;
            }
            if( this.rank == 3 ){
                this.speed = 1.5;
                this.radius = 25;
                this.health = 5;
            }
            if(this.rank == 4){
                this.speed = 1.5;
                this.radius = 45;
                this.health = 5;
            }
        }
        
         this.x = Math.random() * WIDTH_CANVAS/2 + Math.random()/4;
         this.y = HEIGHT_CANVAS + this.radius;
         
         var angle = Math.floor((Math.random() * 140)+20);
         this.radian = (angle * Math.PI)/180;
         
         this.dx = Math.cos(this.radian) * this.speed;
         this.dy = Math.sin(this.radian)*this.speed;
         
         this.ready = false;
         this.dead = false;
         
         this.hit = false;
         this.hitTimer = 0;
         
    }    
    this.Constructor = Constructor;
    this.Constructor( type , rank );
}

Enemy.prototype.getX = function(){ return this.x; }
Enemy.prototype.getY = function(){ return this.y; }
Enemy.prototype.getRadius = function(){ return this.radius; }
Enemy.prototype.isDead = function(){ return this.dead; }
Enemy.prototype.hitBullet = function(){
    this.health--;
    if(this.health <= 0){
        this.dead = true;
    }
    this.hit = true;
    this.hitTimer = Date.now();
}

Enemy.prototype.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    
    if( !this.ready ){
        if( this.x > this.radius && this.x < WIDTH_CANVAS - this.radius && 
            this.y > this.radius && HEIGHT_CANVAS - this.radius ){
            this.ready = true;
        }
    }
    
    if(this.x < this.radius && this.dx < 0)
        this.dx = -this.dx;
    if(this.y < this.radius && this.dy < 0)
        this.dy = -this.dy;
    if(this.x > WIDTH_CANVAS - this.radius && this.dx > 0)
        this.dx = -this.dx;
    if(this.y > HEIGHT_CANVAS - this.radius && this.dy > 0)
        this.dy = -this.dy;
    
    if(this.hit){
        var elapsed = Date.now() -  this.hitTimer;
        if(elapsed > 50){
            this.hit = false;
            this.hitTimer = 0;
        }
    }
    
}

Enemy.prototype.draw = function(context){
    if(this.hit){
         context.beginPath();
        context.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, false );
        context.fillStyle = "rgba(238,238,238,1)";
        context.fill();
        context.closePath();
    }else{
        context.beginPath();
        context.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, false );
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
  
}