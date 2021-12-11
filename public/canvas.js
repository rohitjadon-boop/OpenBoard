let canvas = document.querySelector('canvas');
let pencil = document.querySelector('.fa-pencil-alt');
let eraser = document.querySelector('.fa-eraser');
let black = document.querySelector('.black');
let red = document.querySelector('.red');
let blue = document.querySelector('.blue');
let pencilWidth = document.querySelector('.pencilWidth');
let eraserWidth = document.querySelector('.eraserWidth');
let downloadTool = document.querySelector('.fa-download');
let undo = document.querySelector('.fa-undo');
let redo = document.querySelector('.fa-redo');
let isEraser = false; // Check If Eraser Is True Or Not
let mouseDown = false;
let isPencil = false;
let track = -1;
let undoRedo = []; // Stores Url For Canvas To Undo Redo
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


let tool = canvas.getContext('2d');

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    let data = {
        x: e.clientX,
        y: e.clientY,
    }
    //Emits The Data To Server So That Can Be Used By Services Using It
    socket.emit('beginPath', data);
    if(isPencil) {
        canvas.addEventListener('mousemove', onMouseMove);
    }
    else if(isEraser) {
        canvas.addEventListener('mousemove', onMouseMoveForEraser);
    }
});

function beginPath(Obj) {
    tool.beginPath();
    tool.moveTo(Obj.x, Obj.y);
}

canvas.addEventListener('mouseup', (e) => {
    if(isPencil) {
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedo.push(url);
    track++;
    }
    else if(isEraser) {
        mouseDown == false;
        let url = canvas.toDataURL();
        undoRedo.push(url);
        track++;
    }
});

undo.addEventListener('click', (e) => {
    if(track >= 0) {
        let URL = undoRedo[track];
        let image = new Image();
        image.src = URL;
        image.onload = (e) => {
            tool.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        track--;
    }
});

redo.addEventListener('click', () => {
    if(track < undoRedo.length) {
        let URL = undoRedo[track];
        let image = new Image();
        image.src = URL;
        image.onload = (e) => {
            tool.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        track--;
    }
})

eraserWidth.addEventListener('change', (e) => {
    tool.lineWidth = e.target.value;
})

function onMouseMoveForEraser(e) {
    tool.strokeStyle = 'white';
    tool.lineTo(e.clientX, e.clientY);
    tool.stroke();
}

pencil.addEventListener('click', (e) => {
    isPencil = !isPencil;
});

function onMouseMove(e) {
    if(mouseDown === true) {
        let data = {
            x: e.clientX,
            y: e.clientY,
        }
        //Emmits The Data To The Server
        socket.emit('endPath', data);
    }
}

function endPath(Obj) {
    tool.lineTo(Obj.x, Obj.y);
    tool.stroke();
}

red.addEventListener('click', (e) => {
    tool.strokeStyle = 'red';
});

blue.addEventListener('click', (e) => {
    tool.strokeStyle = 'blue';
});

black.addEventListener('click', (e) => {
    tool.strokeStyle = 'black';
});

pencilWidth.addEventListener('change', (e) => {
    tool.lineWidth = e.target.value;
});

eraser.addEventListener('click', (e) => {
    isEraser = !isEraser;
});

downloadTool.addEventListener('click', (e) => {
    let url = canvas.toDataURL();
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'board.jpeg';
    anchor.click();
});

//Listenes To The Data Send By The Server
socket.on('beginPath', data => {
    beginPath(data);
});

socket.on('endPath', data => {
    endPath(data);
});









