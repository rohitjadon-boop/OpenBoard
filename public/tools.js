let optionsCont = document.querySelector('.options-cont');
let toolsCont = document.querySelector('.tools-cont');
let pencilCont = document.querySelector('.pencil-cont');
let eraserCont = document.querySelector('.eraser-width-range');
let stickyCont = document.querySelector('.fa-sticky-note');
let stickyNote = document.querySelector('.sticky-note');
let uploadCont = document.querySelector('.fa-upload');
let remove = document.querySelector('.remove');
let optionsContFlag = true;
let pencilContFlag = false;
let eraserContFlag = false;


optionsCont.addEventListener('click', (e) => {
    optionsContFlag = !optionsContFlag;
    optionsContFlag ? openTool() : closeTool();
});

const openTool = () => {
    let iconEle = optionsCont.children[0];
    iconEle.classList.remove("fa-times");
    iconEle.classList.add("fa-bars");
    toolsCont.style.display = 'flex';
};

const closeTool = () => {
    let iconEle = optionsCont.children[0];
    iconEle.classList.remove("fa-bars");
    iconEle.classList.add("fa-times");
    toolsCont.style.display = 'none';
};

toolsCont.addEventListener('click', (e) => {
    if(e.target.classList[1] === 'fa-pencil-alt') {
        pencilContFlag = !pencilContFlag;
        if(pencilContFlag) {
            pencilCont.style.display = 'block';
        }
        else {
            pencilCont.style.display = 'none';
        }
    }

    else if(e.target.classList[1] === 'fa-eraser') {
        eraserContFlag = !eraserContFlag;
        if(eraserContFlag) {
            eraserCont.style.display = 'block';
        }
        else {
            eraserCont.style.display = 'none';
        }
    }
});

stickyCont.addEventListener('click', (e) => {
    let sticky = document.createElement('div');
    sticky.setAttribute('class', 'sticky-note')
    sticky.innerHTML = getStickyNotes();
    document.body.appendChild(sticky);
    let minimize = document.querySelector('.minimize');
    let remove = document.querySelector('.remove');
    noteActions(minimize, remove, sticky);
    // sticky.onmousedown = function(event) {
    //     dragAndDrop(sticky, event);
    // };

    // sticky.ondragstart = function() {
    //     return false;
    // };
});


function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener('click', (e) => {
        stickyCont.remove();
    });

    minimize.addEventListener('click', (e) => {
        let noteCont = document.querySelector('.note-cont');
        let disp = getComputedStyle(noteCont).getPropertyValue('display');
        if(disp === 'none') {
            noteCont.style.display = 'block';
        }
        else {
            noteCont.style.display = 'none';
        }
    })
}

function init() {
    pencilCont.style.display = 'none';
    eraserCont.style.display = 'none';
};

uploadCont.addEventListener('click', (e) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.addEventListener('change', (e) => {
        let file = input.files[0];
        let url = getUrl(file);
        let sticky = document.createElement('div');
        sticky.setAttribute('class', 'sticky-note')
        sticky.innerHTML = getStickyNotes();
        document.body.appendChild(sticky);
        let minimize = document.querySelector('.minimize');
        let remove = document.querySelector('.remove');
        noteActions(minimize, remove, sticky);
    });
})

init();


