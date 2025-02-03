getTheme();

//color palette
const colors = [
  "#000",
  "#2c3e50",
  "#34495e",
  "#e74c3c",
  "#f1c40f",
  "#9b59b6",
  "#3498db",
  "#27ae60",
  "#e67e22",
];

const colorBtns = document.querySelectorAll(".theme-color");


for (let i = 0; i < colorBtns.length; i++) {
  colorBtns[i].style.backgroundColor = colors[i];
}

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeTheme(btn.style.backgroundColor);
  });
});

function changeTheme(color) {
  document.documentElement.style.setProperty("--primary-color", color);
  saveTheme(color);
}

function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    changeTheme(theme);
  }
}

function saveTheme(color) {
  localStorage.setItem("theme", color);
  signaturePad.penColor = color;

  if (colorPalette.style.display === "none") {
     colorPalette.style.display = "flex";
  }
  else {
    colorPalette.style.display = "none";
  }
}
