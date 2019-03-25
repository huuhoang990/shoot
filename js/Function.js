var drawBackground = function (context){
    var width = context.canvas.width;
    var height = context.canvas.height;
    context.fillStyle="rgb(0,100,255)";
    context.fillRect(0,0,width,height); 
}

var convertImageObj = function (src){
    var imgObj = new Image();
    imgObj.src = src;
    return imgObj;
}