const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const body = document.body;

// Default Setting
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;
const colors = [
  "#1abc9c",
  "#16a085",
  "#2ecc71",
  "#27ae60",
  "#3498db",
  "#2980b9",
  "#9b59b6",
  "#8e44ad",
  "#34495e",
  "#2c3e50",
  "#f1c40f",
  "#f39c12",
  "#e67e22",
  "#d35400",
  "#e74c3c",
  "#c0392b",
  "#ecf0f1",
  "#bdc3c7",
  "#95a5a6",
  "#7f8c8d",
];

// Draw Line Function
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

// Setting Line-Width Function
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

// Setting Color-Options Function
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  body.style.backgroundColor = colorValue;
}

function onColorChange() {
  const colorValue = color.value;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  body.style.backgroundColor = colorValue;
}

// Setting Fill-Mode Function
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🩸 Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🥍 Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

// Setting Destroy-Mode Function
function onDestroyClick() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

// Setting Erase-Mode Function
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

// Setting File Input Function
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = "";
  };
}

// Setting Text Input Function
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

// Setting Save-Btn Event
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

// Draw Line Event
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// Setting Line-Width Event
lineWidth.addEventListener("change", onLineWidthChange);

// Setting Color-Options Event
colorOptions.forEach((color) => {
  color.addEventListener("click", onColorClick);
});
color.addEventListener("change", onColorChange);

// Setting Fill-Mode Event
modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasClick);

// Setting Destroy-Mode Event
destroyBtn.addEventListener("click", onDestroyClick);

// Setting Erase-Mode Event
eraseBtn.addEventListener("click", onEraserClick);

// Setting File Input Event
fileInput.addEventListener("change", onFileChange);

// Setting Text Input Event
canvas.addEventListener("dblclick", onDoubleClick);

// Setting Save-Btn Event
saveBtn.addEventListener("click", onSaveClick);
