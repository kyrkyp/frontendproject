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
  color = getRandomBgColor();
  showBgColor(color);
}

/**
 * Builds a random color hexa code
 * @returns {string} - a random color hexa code
 */
function getRandomBgColor() {
  // get a random color hexa code
  let color = "#";
  const hexa = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    color += hexa[Math.floor(Math.random() * 16)];
  }
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
