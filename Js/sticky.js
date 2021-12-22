let sticky = document.querySelector("#sticky");

sticky.addEventListener("click", function (e) {
    let stickyPad = document.createElement("div");
    stickyPad.setAttribute("class", "sticky");
    stickyPad.innerHTML = `<div class="navbar">
    <input type="text" name="" id="">
    <i class="far fa-window-minimize"></i>
    <i class="fas fa-times"></i>
        </div>
    <textarea class="textarea"></textarea>`;
    body.appendChild(stickyPad);
    dragAndDrop(stickyPad,e);
    let minimize = stickyPad.querySelector(".fa-window-minimize");
    let close = stickyPad.querySelector(".fa-times");
    let textarea = stickyPad.querySelector(".textarea");
    let isClosed = false;
    cTool = "none";

    minimize.addEventListener("click", function (e) {
        if (isClosed == false) {
            textarea.style.display = "none";
        } else {
            textarea.style.display = "block";
        }
        isClosed = !isClosed;
    });
    close.addEventListener("click", function () {
        stickyPad.remove();
    });
});
function dragAndDrop(ele, event) {
    ele.onmousedown = function (event) {

        let shiftX = event.clientX - ele.getBoundingClientRect().left;
        let shiftY = event.clientY - ele.getBoundingClientRect().top;

        ele.style.position = 'absolute';
        ele.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);

        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            ele.style.left = pageX - shiftX + 'px';
            ele.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the ball, remove unneeded handlers
        ele.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            ele.onmouseup = null;
        };

    };

    ele.ondragstart = function () {
        return false;
    };
}

