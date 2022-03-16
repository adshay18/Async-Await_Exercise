// Part 1 - Number Facts

// 1. Make a request to get a fact about my favorite number
async function getFact() {
	try {
		let { data: favNumberFact } = await axios.get('http://numbersapi.com/9/?json');
		console.log(favNumberFact.text);
	} catch (e) {
		console.log('Error occured:', e);
	}
}
getFact();
// -> 9 is the number of circles of Hell in Dante's Divine Comedy.

// 2. Figure out how to get data on multiple numbers in a single request, put all the number facts on the page.
const list = $('.number-facts');
async function getMultipleNumbers() {
	let { data: numberFacts } = await axios.get('http://numbersapi.com/1..10,100');
	for (num in numberFacts) {
		try {
			list.append(`<li class='list-group-item'>${numberFacts[num]}</li>`);
		} catch (e) {
			console.log('Error occured:', e);
		}
	}
}
getMultipleNumbers();

// 3. Use the api to get 4 facts on your favorite number and display them all on the page
const favList = $('.9-facts');

async function getFourFacts() {
	let baseURL = 'http://numbersapi.com/9/?json';
	let facts = await Promise.all([ axios.get(baseURL), axios.get(baseURL), axios.get(baseURL), axios.get(baseURL) ]);
	try {
		for (fact in facts) {
			favList.append(`<li class="list-group-item">${facts[fact].data.text}</li>`);
		}
	} catch (e) {
		console.log('Error occured:', e);
	}
}
getFourFacts();

// Part 2 - Deck of Cards

// 1. Request 1 card from a shuffled deck, console.log its value and suit
const deck = {
	async init() {
		let newDeck = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
		this.deckId = newDeck.data.deck_id;
	},
	async drawCard() {
		let { data: deck } = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
		try {
			for (card in deck.cards) {
				let value = deck.cards[card].value;
				let suit = deck.cards[card].suit;
				console.log(`${value} of ${suit}.`);
			}
		} catch (e) {
			console.log('Error occured:', e);
		}
	}
};
async function getCard() {
	await deck.init();
	deck.drawCard();
}
getCard();

// deck.drawCard();
// 2. Request 1 card from a newly shuffled deck. Make another request to get another card from the same deck, console.log both values once you have them
const deck2 = {
	drawnCards: [],
	async init() {
		let freshDeck = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
		this.deckId = freshDeck.data.deck_id;
	},
	async drawCard() {
		let { data: deck } = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
		try {
			for (card in deck.cards) {
				let value = deck.cards[card].value;
				let suit = deck.cards[card].suit;
				this.drawnCards.push(`${value} of ${suit}.`);
			}
		} catch (e) {
			console.log('Error occured:', e);
		}
	}
};
async function get2Cards() {
	await deck2.init();
	await deck2.drawCard();
	await deck2.drawCard();
	for (card in deck2.drawnCards) {
		console.log(deck2.drawnCards[card]);
	}
}
get2Cards();
// 3. Build an html page that lets you draw cards from a single deck until all the cards are gone. Display each card on the page. Solution will be on deck.html, deck.css and deck.js
