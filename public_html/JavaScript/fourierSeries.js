/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
            
var width = myCanvas.width;
var height = myCanvas.height;
            
function scanningCircle (x, y, r, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
    
    this.currentGraph = []; // x axis, y axis
}
            
scanningCircle.prototype.rotate = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
                
    this.xcat = Math.cos(this.angle * Math.PI / 180) * this.r;
    this.ycat = Math.sin(this.angle * Math.PI / 180) * this.r;
    
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.xcat, this.y + this.ycat);
    ctx.stroke();
                
    this.angle++;
}
            
scanningCircle.prototype.graph = function () {
    ctx.moveTo(this.x + this.xcat, this.y + this.ycat);
    ctx.lineTo(this.x*2, this.y + this.ycat);
    ctx.stroke();
    
    this.currentGraph.push(this.y + this.ycat);
    
    for (var offset = 0; offset < this.currentGraph.length; offset++) {
        ctx.fillRect(this.x*2 + offset, this.currentGraph[offset], 1, 1);
    }
    
    ctx.fill();
}
            
var obj = new scanningCircle(width/4, height/2, 50, 0);
            
function core () {
    ctx.clearRect(0, 0, width, height);
                
    obj.rotate();
    obj.graph();
}
            
setInterval(core, 1000/60);
