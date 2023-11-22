// Button listener for displaying the buttons for spelling
document.addEventListener('DOMContentLoaded', function () {
    const startLearningBtn = document.getElementById('startLearningBtn');
    
    startLearningBtn.addEventListener('click', function () {
        // Get the selected grade value
        const gradeSelect = document.getElementById('gradeSelect');
        const selectedGrade = gradeSelect.value;
        
        // Load all words from selected grade's word bank
        let selectedWordBank = loadWordBank(selectedGrade);

        // Randomnly select 10 words from the bank
        let wordsToTest = getRandomWordsFromArray(selectedWordBank)

        // Generate a button for each word
        // When pressed, each button speaks the word but doesn't display it
        generateWordButtons(wordsToTest)
    });
});

// Load the word bank for a given grade from a CSV file
async function loadWordBank(grade) {
    try {
        const response = await fetch(`WordBanks/Grade${grade}.csv`);
        const csvData = await response.text();
        wordsForGrade = parseCSV(csvData);
        return wordsForGrade;
    } catch (error) {
        throw new Error(`Error loading word bank for grade ${grade}: ${error.message}`);
    }
}

// Parse CSV data
function parseCSV(csvData) {
    const lines = csvData.split('\n');
    let wordBank = [];

    lines.forEach(line => {
        const word = line.trim();
        if (word) {
            wordBank.push(word);
        }
    });

    return wordBank;
}

// Get 10 random words from an array
function getRandomWordsFromArray(wordsArray) {
    let selectedRandomnWords = getRandomWords(wordsArray);
    return selectedRandomnWords;
}

// Get random words from the array
function getRandomWords(fullArray) {
    let randomWords = [];
    
    for (let i = 0; i < 10; i++) {
        const j = Math.floor(Math.random() * fullArray.length - 1);
        shuffledArray.push(fullArray[j]);
        temp_value = fullArray[fullArray.length -1];
        fullArray[fullArray.length - 1] = fullArray[j];
        fullArray[j] = temp_value;
        fullArray.pop();
    }
    return randomWords;
}
// Generate word buttons in the "wordDisplay" div
function generateWordButtons(words) {
    const wordButtonsContainer = document.getElementById('wordButtons');

    // Clear existing buttons
    wordButtonsContainer.innerHTML = '';

    // Create buttons for each word
    words.forEach((word, index) => {
        const button = document.createElement('button');
        button.textContent = `Word ${index + 1}`;
        button.value = word; // Set the value to the corresponding word
        // button.addEventListener('click', handleWordButtonClick); // Attach a click event listener
        wordButtonsContainer.appendChild(button);
    });
}

// Speak a given word using the Web Speech API
function speakWord(word) {
    // Check if the browser supports the SpeechSynthesis API
    if ('speechSynthesis' in window) {
        // Create a SpeechSynthesisUtterance object
        const utterance = new SpeechSynthesisUtterance();

        // Set the text to be spoken
        utterance.text = word;

        // Use the default voice (you can customize this if needed)
        utterance.voice = speechSynthesis.getVoices()[0];

        // Speak the word
        speechSynthesis.speak(utterance);
    } else {
        console.error('SpeechSynthesis API not supported in this browser.');
    }
}

/* Example usage
const wordToSpeak = 'apple';
speakWord(wordToSpeak);
*/

/* Example usage in the context of your application
const wordButton = document.getElementById('wordButton1'); // Replace with the actual ID of your button
wordButton.addEventListener('click', () => {
    const wordToSpeak = 'apple'; // Replace with the actual word associated with the button
    speakWord(wordToSpeak);
});
*/ 
