//CMPT 370 Assignment 2
//Melissa Buist
//Javascript file for a program that is a star animation in which it changes the speed and color on button press
//October 20, 2021

"use strict";
//declare variables
var gl;
var star;

var theta = 0.0;
var thetaLoc;

var c_vPosition;
var c_cBuffer;
var c_ColorLoc;

var color = [0,0,0,1];

var speed = 100;
var direction = true;

var theta = 0.0;


//load canvas and draw shapes using vertexes 

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

  
    star = new Float32Array([
         0,  0.5,
         0.15,  0.25,
         0.5,  0.25,
         0.3,   0,
         0.5, -0.25,
         0.15, -0.25,
         0, -0.5,
	-0.15, -0.25,
	-0.5, -0.25,
	-0.3, 0,
	-0.5, 0.25,
	-0.15, 0.25,
	 
    ]);

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, star, gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc);

    thetaLoc = gl.getUniformLocation(program, "uTheta");

    // Initialize event handlers

    document.getElementById("slider").onchange = function(event) {
        speed = 100 - event.target.value;
    };
    document.getElementById("Direction").onclick = function (event) {
        direction = !direction;
    };

    document.getElementById("Start").onclick = function (event) {
        speed = 0;
    };

    document.getElementById("Stop").onclick = function (event) {
        speed = 2000;
    };


    document.getElementById("Controls").onclick = function( event) {
        switch(event.target.index) {
          case 0:
            color = [1.0, 0.0, 0.0, 1.0];
	    star_Binding();
	    render();
            break;

         case 1:
            color = [0.0, 1.0, 0.0, 1.0];
            star_Binding();
	    render();
            break;

         case 2:
            color = [0.0, 1.0, 1.0, 1.0];
            star_Binding();
	    render();
            break;

         case 3:
            color = [0.0, 0.0, 1.0, 1.0];
            star_Binding();
	    render();
            break;
       }
    };

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch( key ) {
          case '1':
            color = [1.0, 0.0, 0.0, 1.0];
	    star_Binding();
	    render();
            break;

          case '2':
            color = [0.0, 1.0, 0.0, 1.0];
	    star_Binding();
	    render();
            break;

          case '3':
            color = [0.0, 1.0, 1.0, 1.0];
	    star_Binding();
	    render();
            break;

          case '4':
            color = [0.0, 0.0, 1.0, 1.0];
	    star_Binding();
	    render();
            break;
        }
    };


    render();
};

//render the shape animation

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    theta += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.LINE_LOOP, 0, 12);

    setTimeout(
        function () {requestAnimationFrame(render);},
        speed
    );
}


function star_Binding(){
    gl.useProgram( program );
    gl.enableVertexAttribArray( c_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.vertexAttribPointer( c_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, c_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(c_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}
