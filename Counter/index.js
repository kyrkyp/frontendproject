// app state - The only source of truth
const DEFAULT = 0;

let counter = DEFAULT;

const counterDOM = document.querySelector("#counter");
const btns = document.querySelectorAll(".btn");

/**
 * Listener
 */
btns.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    if (event.currentTarget.id === "btnDecr") {
      onDecreaseClicked();
    } else if (event.currentTarget.id === "btnIncr") {
      onIncreaseClicked();
    } else {
      onResetClicked();
    }
  });
});

/**
 * Controllers.
 */

/**
 * Actions taken after decrease button clicked
 * Actions: Include decreasing the counter
 */
function onDecreaseClicked() {
  decreaseCounter();
}

/**
 * Actions taken after increase button clicked
 * Actions: Include increasing the counter
 */
function onIncreaseClicked() {
  increaseCounter();
}

/**
 * Actions taken after reset button clicked
 * Actions: Include reseting the counter
 */
function onResetClicked() {
  resetCounter();
}

/**
 * Decreases the counter and syncs the UI.
 */
function decreaseCounter() {
  counter--;
  showCounter(counter);
}

/**
 * Increases the counter and syncs the UI.
 */
function increaseCounter() {
  counter++;
  showCounter(counter);
}

/**
 * Resets the counter and syncs the UI.
 */
function resetCounter() {
  counter = DEFAULT;
  showCounter(counter);
}

/**
 * Assigns the counter and styles accoringly.
 * @param {Number | String} counter - The counter value.
 */
function showCounter(counter) {
  counterDOM.innerHTML = counter;
  styleCounter(counter);
}

/**
 * Styles the counter according to its value.
 * Green when positive values. red when negative values. black when zero.
 * @param {Number} counter - The counter value.
 */
function styleCounter(counter) {
  if (counter < 0) {
    counterDOM.style.color = "red";
  } else if (counter > 0) {
    counterDOM.style.color = "green";
  } else {
    counterDOM.style.color = "black";
  }
}

// const btnDecreaseDOM = document.querySelector("#btnDecr");
// const btnResetDOM = document.querySelector("#btnRes");
// const btnIncreaseDOM = document.querySelector("#btnIncr");
// const counterDOM = document.querySelector("#counter");

// btnDecreaseDOM.addEventListener("click", function () {
//   counter--;
//   counterDOM.innerHTML = counter;
// });

// btnResetDOM.addEventListener("click", function () {
//   counter = DEFAULT;
//   counterDOM.innerHTML = counter;
// });

// btnIncreaseDOM.addEventListener("click", function () {
//   counter++;
//   counterDOM.innerHTML = counter;
// });
