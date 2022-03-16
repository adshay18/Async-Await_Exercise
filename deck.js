const deck = {
	drawnCards: [],
	async init() {
		let { data: shuffledDeck } = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
		this.deckId = shuffledDeck.deck_id;
	},
	async populateDeck() {
		let { data: res } = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=52`);
		try {
			for (card in res.cards) {
				let value = res.cards[card].value;
				let suit = res.cards[card].suit;
				let image = res.cards[card].image;
				this.drawnCards[card] = {
					value,
					suit,
					image
				};
			}
		} catch (e) {
			console.log('Eroor occured:', e);
		}
	}
};

let cardNum = 0;
let newDeck = $('.new');

let button = $('.draw');
let container = $('.cards');

button.on('submit', function(e) {
	e.preventDefault();

	let i = cardNum;
	if (i < 1) {
		container.append(
			`<img src="${deck.drawnCards[i].image}" alt="${deck.drawnCards[i].value} of ${deck.drawnCards[i].suit}">`
		);
	} else {
		container.children().remove();
		container.append(
			`<img src="${deck.drawnCards[i].image}" alt="${deck.drawnCards[i].value} of ${deck.drawnCards[i].suit}">`
		);
	}

	cardNum += 1;
});

newDeck.click(function(e) {
	location.reload();
});

if ((cardNum = 52)) {
	cardNum = cardNum - 52;
}

async function onLoad() {
	await deck.init();
	deck.populateDeck();
}
onLoad();
