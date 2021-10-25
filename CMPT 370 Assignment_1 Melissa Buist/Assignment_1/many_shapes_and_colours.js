"use strict";

var gl;
var triangle;
var square;
var circle = [];
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
var shape = 1; //1: triangle, 2: square 3: circle
var colorT = [0,0,1, 1,0,0, 0,1,0];
var colorS = [0,0,1, 1,0,0, 0,1,0, 1,1,0];
var colorC = [1,0,0];
var t_ColorLoc;
var s_ColorLoc;
var c_ColorLoc;
const stops = 1000; 

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    triangle = new Float32Array([
        -1, -1 ,
         0,  1 ,
         1, -1
    ]);

    square = new Float32Array([
        -1,  1,
        -1, -1,
         1,  1,
         1, -1
    ]);

    for(var i=0.0;i<stops;i++){
        circle.push(Math.cos(i*2*Math.PI/stops));
        circle.push(Math.sin(i*2*Math.PI/stops));
    }

    circle.push(0.0);
    circle.push(0.0);

    for(var i=0; i<=stops; i++){
        colorC.push(colorC);
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    program2 = initShaders( gl, "vertex-shader", "fragment-shader" );
    program3 = initShaders( gl, "vertex-shader", "fragment-shader" );

    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW );

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

    render();

    sBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, square, gl.STATIC_DRAW );
    s_vPosition = gl.getAttribLocation( program2, "aPosition" );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );

    s_cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );

    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(circle), gl.STATIC_DRAW );
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


function render() {
    if(shape==1){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }else if(shape==2){
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }else if(shape==3){
        gl.clear( gl.COLOR_BUFFER_BIT );
    	gl.drawArrays( gl.TRIANGLE_FAN, 0, stops+2 );
    }
}

function checkKey(e){
    switch(e.keyCode){
        case 49: 
            if(shape==1){
                colorT = [1,0,0, 1,0,0, 1,0,0];
                triangle_Binding();
            }else if(shape==2){
                colorS = [1,0,0, 1,0,0, 1,0,0, 1,0,0];
                square_Binding();
            }else if(shape==3){
		colorC = [1,0,0];
		circle_Binding();
	    }
            render();
            break;

        case 50: 
            if(shape==1){
                colorT = [0,1,0, 0,1,0, 0,1,0];
                triangle_Binding();
            }else if(shape==2){
                colorS = [0,1,0, 0,1,0, 0,1,0, 0,1,0];
                square_Binding();
            }else if(shape==3){
		colorC = [0,1,0];
		circle_Binding();
	    }
            render();
            break;
        case 51: 
            if(shape==1){
                colorT = [0,0,1, 0,0,1, 0,0,1];
                triangle_Binding();
            }else if(shape==2){
                colorS = [0,0,1, 0,0,1, 0,0,1, 0,0,1];
                square_Binding();
            }else if(shape==3){
		colorC = [0,0,1];
		circle_Binding();
	    }
            render();
            break;
        case 52: 
            if(shape==1){
                colorT = [1,0,1, 1,0,1, 1,0,1];
                triangle_Binding();
            }else if(shape==2){
                colorS = [1,0,1, 1,0,1, 1,0,1, 1,0,1];
                square_Binding();
            }else if(shape==3){
		colorC = [1,0,1];
		circle_Binding();
	    }
            render();
            break;
        case 53: 
            if(shape==1){
                colorT = [1,0.94,0.5, 1,0.94,0.5, 1,0.94,0.5];
                triangle_Binding();
            }else if(shape==2){
                colorS = [1,0.94,0.5, 1,0.94,0.5, 1,0.94,0.5, 1,0.94,0.5];
                square_Binding();
            }else if(shape==3){
		colorC = [1,0.94,0.5];
		circle_Binding();
	    }
            render();
            break;

        case 83:
            shape = 2;
            square_Binding();
            render();
            break;
        case 84:
            shape = 1;
            triangle_Binding();
            render();
            break;  
        case 67:
            shape = 3;
            circle_Binding();
            render();
            break;  
    }   
}

function triangle_Binding(){
    gl.useProgram( program );
    gl.enableVertexAttribArray( t_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.vertexAttribPointer( t_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, t_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorT), gl.STATIC_DRAW );
    t_ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(t_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}

function square_Binding(){
    gl.useProgram( program2 );
    gl.enableVertexAttribArray( s_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, sBuffer );
    gl.vertexAttribPointer( s_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, s_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorS), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program2, "aColor");
    gl.vertexAttribPointer(s_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}

function circle_Binding(){
    gl.useProgram( program3 );
    gl.enableVertexAttribArray( c_vPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.vertexAttribPointer( c_vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, c_cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorC), gl.STATIC_DRAW );
    s_ColorLoc = gl.getAttribLocation( program3, "aColor");
    gl.vertexAttribPointer(c_ColorLoc, 3, gl.FLOAT, false, 0, 0);
}