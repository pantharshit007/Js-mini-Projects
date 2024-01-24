// remember to replace para here
const para = [
    'Human strength lies in the ability to change yourself.',
    'There is nothing more deceptive than an obvious fact.',
    'Fear is not evil. It tells you what weakness is. And once you know your weakness, you can become stronger as well as kinder.',
    "If you don't take risks, you can't create a future.",
    "If you don't share someone's pain, you can never understand them.",
    'Knowing what it feels like to be in pain, is exactly why we try to be kind to others.',
    "Everything has a beginning and an end. Life is just a cycle of starts and stops. There are ends we don't desire, but they're inevitable, we have to face them. It's what being human is all about.",
    "You need to accept the fact that you're not the best and have all the will to strive to be better than anyone you face.",
    "People who can't throw something important away can never hope to change anything.",
    "Even if I searched the world over, no one could compare to you.",
    "Love is like a mirror that reflects your bad side. Especially when it's unrequited, you get envious, jealous, prejudiced, and resentful. You have to face all sorts of emotions, but there's no reason to find that shameful.",
];

const inputElement = document.getElementById("inputElement");
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');

// array to store individual words
let words = [];
// current word index
let wordIndex = 0;
// starting time to calculate time taken
let startTime = Date.now();

function startTyping() {
    inputElement.removeAttribute("disabled");

    const quoteIndex = Math.floor(Math.random() * para.length);
    const quote = para[quoteIndex];

    // splitting the words of para and accessing them using .innerText
    words = quote.split(' ');
    wordIndex = 0;

    // in order to highlight individual words
    const spanWords = words.map(function (word) {
        // i wasted my 3 damn hours on gpt and vs just to resolve an error where queryElement.childnodes was also considering space as node and what was the solution just adding a space here
        return `<span>${word} </span>`
    })
    // joining new span added words together
    quoteElement.innerHTML = spanWords.join('')
    // highlighting the first word here
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';

    // INPUT BOX
    // clear any existing text
    inputElement.value = '';
    // focusing on input box
    inputElement.focus();

    // starting the timer
    startTime = new Date().getTime();
}

function typedWordUpdate() {
    // highlighted word user is on
    const highlightedWord = words[wordIndex];
    // typed word by user
    const typedWord = inputElement.value;

    // Reached final word of para
    if (typedWord === highlightedWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;

        // Calculate time in seconds
        const timeInSeconds = elapsedTime / 1000;

        // Convert to minutes if greater than 60 seconds
        const timeDisplay = (timeInSeconds > 60) ?
            `${(timeInSeconds / 60).toFixed(2)} min` :
            `${timeInSeconds.toFixed(2)} sec`;

        // Congratulation Message
        const message = `CONGRATS! You finished in <span id="mess">${timeDisplay}</span>`;
        messageElement.innerHTML = message;

        inputElement.value = '';
        inputElement.className = '';
        inputElement.setAttribute("disabled", true);
    }

    // if user typed correct word in input box
    else if (typedWord.endsWith(' ') && typedWord.trim() === highlightedWord) {
        // clearing the input box
        inputElement.value = '';
        // moving onto the next word
        wordIndex++;
        highlightCurrentWord(highlightedWord);
    }
    // currently writing correct
    else if (highlightedWord.startsWith(typedWord)) {
        // User is typing the current word correctly
        inputElement.classList.remove('error', 'missSpell');
        inputElement.classList.add('goodGoing');
    } else {
        // User made an error
        inputElement.classList.remove('goodGoing');
        if (typedWord.length > highlightedWord.length || highlightedWord === typedWord) {
            inputElement.classList.add('error');
        }
        // or misspelled
        else {
            inputElement.classList.add('missSpell');
        }
    }
}

function resetTyping() {
    inputElement.value = '';
    inputElement.className = '';
    inputElement.setAttribute("disabled", true);
    messageElement.innerHTML = '';
    quoteElement.innerHTML = '';

    // resetting the className for all the eleme
    for (wordClass of quoteElement.childNodes) {
        // wordClass.removeChild('highlight');
        wordClass.className = "";
    }

}

function restartTyping() {
    inputElement.className = '';
    startTyping();
}

// Highlight the current word
function highlightCurrentWord() {
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
    }

    quoteElement.childNodes[wordIndex].className = 'highlight';
}
