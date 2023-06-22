//functino that creates the cards

function renderCard(animals) {
  console.log(animals);
  const mainDiv = document.querySelector("#main");

  for (const animal of animals) {
    const Card = document.createElement("div");
    Card.classList.add("card");
    Card.innerHTML = `   
     
            <h1 class="card-title">${animal.name}</h1>
            <div class="card-body card-bodyHover">
              <img src="${animal.image}" class="card-img" alt=""  />
                <button class="card-btn">view more</button>
              </div>
            </div>
      

          
  `;

    mainDiv.append(Card);
  }

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

function FetAllData() {
  fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((data) => renderCard(data));
}
FetAllData();
