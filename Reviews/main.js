// App state
const reviews = [
  {
    id: 0,
    personaName: "Anna B.",
    job: "Web Designer",
    img: "https://img.freepik.com/free-photo/cheerful-middle-aged-woman-with-curly-hair_1262-20859.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    id: 1,
    personaName: "John S.",
    job: "Java Jr. Developer",
    img: "https://img.freepik.com/free-photo/portrait-beautiful-mature-blonde-bearded-guy-with-trendy-hairdo-casual-grey-shirt-smiling_176420-15741.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    personaName: "Peter J.",
    job: "UX Designer",
    img: "https://img.freepik.com/free-photo/handsome-businessman-glasses-looking-satisfied-smiling-holding-hands-waist-standing_1258-26388.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

let personaId = Math.floor(Math.random() * reviews.length);

window.addEventListener("DOMContentLoaded", () => {
  showPersonaById(personaId);

  this.document.querySelector("#prevBtn").addEventListener("click", () => {
    onPrevBtnClicked();
  });

  this.document.querySelector("#nextBtn").addEventListener("click", () => {
    onNextBtnClicked();
  });
});

function showPersonaById(personaId) {
  const persona = reviews.find((p) => p.id === personaId);
  const { personaName, job, img: image, description } = persona;

  document.querySelector("#personaImg").src = image;
  document.querySelector("#personaName").innerHTML = personaName;
  document.querySelector("#personaJob").innerHTML = job;
  document.querySelector("#personaDesc").innerHTML = description;
}

//Controllers
/**
 * actions after prev button clicked
 * show previous persona
 */
function onPrevBtnClicked() {
  showPrevPersona();
}

/**
 * actions after next button clicked
 * show next persona
 */
function onNextBtnClicked() {
  showNextPersona();
}

/**
 * show previous persona
 */
function showPrevPersona() {
  personaId = personaId < 0 ? reviews.length - 1 : --personaId;
  showPersonaById(personaId);
}

/**
 * show next persona
 */
function showNextPersona() {
  personaId = personaId > reviews.length - 1 ? 0 : ++personaId;
  showPersonaById(personaId);
}
