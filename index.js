document.addEventListener("DOMContentLoaded",()=>{

// Function that creates the cards
function renderCard(animals) {
  const mainDiv = document.querySelector("#main");

  for (const animal of animals) {
    const Card = document.createElement("div");
    Card.classList.add("card");
    Card.innerHTML = `
      <h1 class="card-title">${animal.name}</h1>
      <div class="card-body card-bodyHover">
        <img src="${animal.image}" class="card-img" alt="" />
        <div class="">
        <button type="button" class="card-btn votes" data-animal-id="${animal.id}" data-animal-votes="${animal.votes}"> Votes: ${animal.votes}</button>
        <button type="button" class="card-btn reset" > Reset </button>
      </div>
      </div>
    `;

    mainDiv.append(Card);
  }

  let cardsBtn = mainDiv.querySelectorAll(".card .votes");
  console.log(cardsBtn);

  cardsBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const animalID = btn.getAttribute("data-animal-id");
      const animalVotes = parseInt(btn.getAttribute("data-animal-votes"));
      console.log(animalVotes);

      IncreaseVoteCount(animalID, animalVotes, btn);
    });
  });

  clickAnimalName(mainDiv);
}

// Function to display the details of the animal when the name is clicked
function clickAnimalName(mainDiv) {
  let cards = mainDiv.querySelectorAll(".card");
  cards.forEach((card) => {
    let cardbody = card.lastElementChild;
    card.firstElementChild.addEventListener("click", () => {
      cardbody.style.top = "0";
    });
    card.addEventListener("mouseleave", () => {
      cardbody.style.top = "-100%";
    });
  });
}

// Function to increase the vote count when the vote button is clicked
function IncreaseVoteCount(animalID, animalVotes, btn) {
  fetch(`http://localhost:3000/characters/${animalID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      votes: animalVotes + 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      btn.setAttribute("data-animal-votes", data.votes);
      btn.textContent = `Votes: ${data.votes}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function FetchAllData() {
  fetch("http://localhost:3000/characters")
    .then((res) => {
      if (res.ok) {
        console.log("HTTP request SUCCESSFUL");
      } else {
        console.log("HTTP request NOT SUCCESSFUL");
      }
      return res.json();
    })
    .then((data) => renderCard(data))
    .catch((error) => console.log(error));
}

FetchAllData();

})