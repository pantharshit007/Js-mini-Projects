//remember to replace para here
const para = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

const inputElement = document.getElementById("inputElement");

const quoteElement = document.getElementById('quote');

const messageElement = document.getElementById('message')

// array to store individual words
let words = [];
// current word index
let wordIndex = 0;
//starting time to calculate time taken
let startTime = Date.now();

function startTyping() {
    inputElement.removeAttribute("disabled");

    const quoteIndex = Math.floor(Math.random() * para.length);
	const quote = para[quoteIndex];

    //spliting the words of para and accessing them using .innerText
    words = quote.split(' ');
    wordIndex = 0;

    // in order to highlight indivdual words 
    const spanWords = words.map(function (word) {
        //i wasted my 3 damn hours on gpt and vs just to resolve a error where queryElement.childnodes was also considering space as node and what was the solution just adding a space here
        return `<span>${word} </span>`
    })
    // joining new span added words together 
    quoteElement.innerHTML = spanWords.join('') 
    //highlighting the first word here
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText='';

    //////// INPUT BOX \\\\\\
    // clear any existing text
    inputElement.value = '';
    //focusing on input box
    inputElement.focus();

    //starting the timer
    startTime = new Date().getTime();
  }

  function typedWordUpdate() {
    // highlighted word user is on
    const highlightedWord = words[wordIndex];
    // typed word by user
    const typedWord = inputElement.value;

    //reached final word of para
    if (typedWord === highlightedWord && wordIndex === words.length - 1) {
        const elapsedTime = (new Date().getTime()) - startTime;
        // Congratulation Message
const message = `CONGRATS! You finished in <span id= "mess">${(elapsedTime / 1000).toFixed(2)} sec</span>`;
messageElement.innerHTML = message;


        messageElement.innerHTML = message;

    }
    // if user typed correct word in input box
    else if(typedWord.endsWith(' ') && typedWord.trim() === highlightedWord) {
        // clearing the input box 
        inputElement.value = '';
        //moving onto the next word
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
        //or misspelled
        else {
            inputElement.classList.add('missSpell');
        }
    }
  }

  function resetTyping(){
    inputElement.value = '';
    inputElement.className = '';
    inputElement.setAttribute("disabled", true);
    messageElement.innerHTML='';
    //reseting the className for all the eleme
    for (wordClass of quoteElement.childNodes){
        // wordClass.removeChild('highlight');
        wordClass.className = "";
    }
  }

  function restartTyping(){
    inputElement.className='';
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

