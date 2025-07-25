let isChangingFont = false; 

function updateTextFont(inputText) {
  const outputElement = document.getElementById("outputText");
  outputElement.innerHTML = inputText;
}

document.addEventListener("mouseup", function (event) {
  const fontMenu = document.getElementById("fontMenu");
  const selectedText = window.getSelection().toString();
  const fontSamples = document.getElementById("fontSamples");
  if (selectedText.length === 1 && !fontSamples.contains(event.target)) {
    event.preventDefault();
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;
    fontMenu.style.display = "block";
    fontMenu.style.top = `${y}px`;
    fontMenu.style.left = `${x}px`;
    const selectedLetter = selectedText.charAt(0);
    updateFontSelectOptions(selectedLetter);
  } else {
    fontMenu.style.display = "none";
  }
});

function updateFontSelectOptions(selectedLetter) {
  const fontSelect = document.getElementById("fontSelect");
  fontSelect.innerHTML = "";
  if (selectedLetter) {
    const font1Option = document.createElement("option");
    font1Option.value = "Font1";
    font1Option.style.fontFamily = "Font1";
    font1Option.style.fontSize = "50px";
    font1Option.textContent = selectedLetter;
    fontSelect.appendChild(font1Option);
    const font2Option = document.createElement("option");
    font2Option.value = "Font2";
    font2Option.style.fontFamily = "Font2";
    font2Option.style.fontSize = "50px";
    font2Option.textContent = selectedLetter;
    fontSelect.appendChild(font2Option);
  }
}

function changeSelectedFont() {
  const fontSelect = document.getElementById("fontSelect");
  const selectedFont = fontSelect.value;
  const selectedText = window.getSelection().toString();
  if (selectedText.length === 1 && selectedFont) {
    isChangingFont = true; 
    const fontSamples = document.getElementById("fontSamples");
    if (selectedFont === "Font2") {
      const currentFontSize = window.getComputedStyle(fontSamples).fontSize;
      const currentFontSizeNumber = parseFloat(currentFontSize);
      const newFontSize = currentFontSizeNumber * 2;
      fontSamples.style.fontSize = `${newFontSize}px`;
    } else {
      fontSamples.style.fontSize = "24";
    }
    fontSamples.style.fontFamily = selectedFont;
    fontSamples.textContent = selectedText;
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    const span = document.createElement("span");
    span.style.fontFamily = selectedFont;
    span.textContent = selectedText;
    range.insertNode(span);
    setTimeout(() => {
      isChangingFont = false; 
    }, 10);
    const fontMenu = document.getElementById("fontMenu");
    fontMenu.style.display = "none";
  }
}
