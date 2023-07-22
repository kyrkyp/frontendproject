let color = undefined;

/**
 * Lister
 */

document.querySelector("#btn").addEventListener("click", function () {
  onClickMeClicked();
});

/**
 * Controller
 * Actions taken after 'Click Me' button is clicked
 */

function onClickMeClicked() {
  updateBgColor();
}

/**
 * Model
 * Gets a color and updates the UI background
 */

function updateBgColor() {
  color = getBgColor();
  showBgColor(color);
}

/**
 * Chooses randomly a color from a standard list
 * @returns the background color
 */
function getBgColor() {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "purple",
    "orange",
    "brown",
    "black",
    "gray",
    "white",
  ];
  let color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

/**
 * View
 * Fills the values of the coresponding UI elenents
 * @param {string} bgColor - the given background color
 */
function showBgColor(bgColor) {
  document.querySelector("#hex").innerHTML = bgColor;
  document.body.style.backgroundColor = bgColor;
}
