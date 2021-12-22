let upload = document.querySelector("#upload");

upload.addEventListener("click", (e) => {
    // opening file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let imagePad = document.createElement("div");
        imagePad.setAttribute("class", "upload-cont");
        imagePad.innerHTML = `
        <div class="header">
            <input type="text" name="" id="">
            <i class="far fa-window-minimize uploadIcon"></i>
            <i class="fas fa-times uploadIcon"></i>
        </div>
        <div class="image-cont">
                <img class="upload-img" src="${url}" alt="image" srcset="">
        </div>
        `;
        body.appendChild(imagePad);
        dragAndDrop(imagePad, e);
        let minimize = imagePad.querySelector(".fa-window-minimize");
        let close = imagePad.querySelector(".fa-times");
        let imageCont = imagePad.querySelector(".image-cont");
        let isClosed = false;
        cTool = "none";
        minimize.addEventListener("click", function (e) {
            if (isClosed == false) {
                imageCont.style.display = "none";
            } else {
                imageCont.style.display = "block";
            }
            isClosed = !isClosed;
        });
        close.addEventListener("click", function () {
            imagePad.remove();
        });
    });
});


// download js

let downloadBtn = document.querySelector("#download");
downloadBtn.addEventListener("click", (e) => {
    let a = document.createElement("a");
    a.download = "file.png";
    let url = canvasBoard.toDataURL();;
    a.href = url;
    a.click();
    a.remove();
});