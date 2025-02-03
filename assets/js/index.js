var wrapper = document.getElementById("s-p");
var clearButton = wrapper.querySelector("[data-action=clear]");
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
var colorPalette = document.querySelector('.color-palette')
var undoButton = wrapper.querySelector("[data-action=undo]");
var savePNGButton = wrapper.querySelector("[data-action=png]");
var saveJPGButton = wrapper.querySelector("[data-action=jpg]");
var saveSVGButton = wrapper.querySelector("[data-action=svg]");
var canvas = wrapper.querySelector("canvas");

var signaturePad = new SP(canvas, {
    backgroundColor: '#ffffff00' 
});

function resizeCanvas() {
 
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  

    signaturePad.clear();
  }
  

  resizeCanvas();
  
// Download function
  function download(dataURL, filename) {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);
  
    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
  
    window.URL.revokeObjectURL(url);
  }
  

  function dataURLToBlob(dataURL) {
    
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
  
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
  
    return new Blob([uInt8Array], { type: contentType });
  }
  
  clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
  });
  
  undoButton.addEventListener("click", function (event) {
    var data = signaturePad.toData();
  
    if (data) {
      data.pop(); 
      signaturePad.fromData(data);
    }
  });
  
  changeColorButton.addEventListener("click", function (event) {
    if (colorPalette.style.display === "none") {
      colorPalette.style.display = "flex";
    }
    else if (colorPalette.style.display === "") {
      colorPalette.style.display = "flex";
    } else {
      colorPalette.style.display = "none";
    }
  });
  
  savePNGButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = signaturePad.toDataURL();
      download(dataURL, "signature.png");
    }
  });
  
  saveJPGButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = signaturePad.toDataURL("image/jpeg");
      download(dataURL, "signature.jpg");
    }
  });
  
  saveSVGButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = signaturePad.toDataURL('image/svg+xml');
      download(dataURL, "signature.svg");
    }
  });
  