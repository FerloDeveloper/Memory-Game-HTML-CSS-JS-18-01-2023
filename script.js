let cards = [
	"red",
	"blue",
	"green",
	"yellow",
	"orange",
	"hotpink",
	"red",
	"blue",
	"green",
	"yellow",
	"orange",
	"hotpink",
];

let revealedCards = []; // array per tenere traccia delle carte scoperte.
let revealCounter = 0; // contatore per le carte scoperte nel turno (max 2).
let totalRevealed = 0; // contatore per le carte totali scoperte.

let winText = document.querySelector("h2");

// Mischia le carte.
for (let i = 0; i < cards.length; i++) {
	let randomIndex = Math.floor(Math.random() * cards.length);
	let temp = cards[i];

	cards[i] = cards[randomIndex];
	cards[randomIndex] = temp;
}

// Crea dinamicamente le caselle del gioco utilizzando un ciclo.
let gameBoard = document.getElementById("game-board");

for (let i = 0; i < cards.length; i++) {
	let card = cards[i];
	let cardElement = document.createElement("div");

	cardElement.classList.add("card");
	cardElement.style.backgroundColor = "gray";

	cardElement.addEventListener("click", function () {
		if (revealCounter < 2) {
			revealCounter++;
			cardElement.style.backgroundColor = card;
			revealedCards.push(cardElement);
		}

		if (revealCounter === 2) {
			if (
				revealedCards[0].style.backgroundColor ===
				revealedCards[1].style.backgroundColor
			) {
				//le carte sono uguali quindi non vengono nascoste.
				revealCounter = 0;
				revealedCards = [];
				totalRevealed += 2;
			} else {
				setTimeout(function () {
					revealCounter = 0;

					revealedCards.forEach(function (element) {
						element.style.backgroundColor = "gray";
					});

					revealedCards = [];
				}, 1000); // tempo di scoperta delle carte.
			}

			if (totalRevealed === cards.length) {
				winText.style.display = "block";
			}
		}
	});

	gameBoard.appendChild(cardElement);
}
