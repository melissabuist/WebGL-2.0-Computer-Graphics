//CMPT 370 Assignment 2
//Melissa Buist
//Javascript file for a program that starts as a cross and changes shape and color on different key presses
//October 4, 2021

"use strict";

//declare variables
var gl;
var favShape;
var cross;
var letter;
var program;
var program2;
var program3;
var t_vPosition;
var s_vPosition;
var c_vPosition;
var tBuffer;
var sBuffer;
var cBuffer;
var t_cBuffer;
var s_cBuffer;
var c_cBuffer;
var shape = 1; //1: cross, 2: favorite shape 3: letter
var colorT = [0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1];
var colorS = [0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1];
var colorC = [0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1];
var t_ColorLoc;
var s_ColorLoc;
var c_ColorLoc;

//load canvas and draw shapes using vertexes 
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }


    cross = new Float32Array([
        -0.75,  0.5,
        -0.75, 0,
         0.75,  0.5,
	 0.75, 0.5,
	-0.75, 0,
	 0.75, 0,  
	-0.25, 1,
	 0.25, 1,
	 0.25, -1,
	 0.25, -1,
	 -0.25, -1,
	 -0.25, 1
    ]);

    favShape = new Float32Array([
        -1, 0.5,
         -0.75, -0.5,
         -0.5, 0.5,
	-0.25, -0.5,
	0, 0.5,
	0.25, -0.5
	
    ]);

    letter = new Float32Array([
	-0.75, 1,
        -1, 1 ,
        -1, -1,
	 1, -1,
	 1, -0.75,
	-0.75, -0.75
	
    ]);

    //make canvas
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1, 1, 1, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);
    //initialize shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    program2 = initShaders( gl, "vertex-shader", "fragment-shader" );
    program3 = initShaders( gl, "vertex-shader", "fragment-shader" );
    //creates buffer for each shape
    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, favShape, gl.STATIC_DRAW );

    t_vPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );

    t_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorT), gl.STATIC_DRAW );

    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
    
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );

    gl.enableVertexAttribArray(t_ColorLoc);


    sBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, cross, gl.STATIC_DRAW );
    s_vPosition = gl.getAttribLocation( program2, "aPosition" );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );

    s_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );

    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);

    render();

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(letter), gl.STATIC_DRAW );
    c_vPosition = gl.getAttribLocation( program3, "aPosition" );
    gl.vertexAttribPointer( c_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( c_vPosition );

    c_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, c_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );

    c_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(c_ColorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(c_ColorLoc); 

    window.addEventListener('keydown', this.checkKey);

};

//listens to keyboard input and draws shape and changes color based in that 

function render() {
    if(shape==2){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
    }else if(shape==1){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLES, 0, 12 );
    }else if(shape==3){
        gl.clear( gl.COLOR_BUFFER_BIT );
    	gl.drawArrays( gl.LINE_LOOP, 0, 6 );
    }
}

function checkKey(e){
    switch(e.keyCode){
        case 49: 
            if(shape==2){
                colorT = [0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0];
                favShape_Binding();
            }else if(shape==1){
                colorS = [0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0];
                cross_Binding();
            }else if(shape==3){
		colorC = [0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0];
		letter_Binding();
	    }
            render();
            break;

        case 50: 
            if(shape==2){
                colorT = [1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5];
                favShape_Binding();
            }else if(shape==1){
                colorS = [1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5];
                cross_Binding();
            }else if(shape==3){
		colorC = [1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5, 1,1,0.5];
		letter_Binding();
	    }
            render();
            break;
        case 51: 
            if(shape==2){
                colorT = [0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67];
                favShape_Binding();
            }else if(shape==1){
                colorS = [0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67];
                cross_Binding();
            }else if(shape==3){
		colorC = [0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67, 0,0.8,0.67];
		letter_Binding();
	    }
            render();
            break;
       

        case 67:
            shape = 1;
            cross_Binding();
            render();
            break;
        case 82:
            shape = 2;
            favShape_Binding();
            render();
            break;  
        case 76:
            shape = 3;
            letter_Binding();
            render();
            break;  
    }   
}

//bind the shapes
function favShape_Binding(){
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorT), gl.STATIC_DRAW );
    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}

function cross_Binding(){
    gl.useProgram( program2 );
    gl.enableVertexAttribArray( s_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}

function letter_Binding(){
    gl.useProgram( program3 );
    gl.enableVertexAttribArray( c_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.vertexAttribPointer( c_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, c_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(c_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}