const getStickyNotes = () => {
    return `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea></textarea>
    </div>`;
}

const dragAndDrop = (ball, event) => {
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
      ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
    }

    moveAt(event.pageX, event.pageY);
    
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };
}

const getUrl = (file) => {
    return URL.createObjectURL(file);
}

// module.exports = {
//     getStickyNotes: getStickyNotes,
//     getUrl: getUrl,
//     dragAndDrop: dragAndDrop,
// }