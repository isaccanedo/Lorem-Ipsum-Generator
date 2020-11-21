const fieldOutputCount = $('#input_count_of_output');
const selectorOutputType = $('#select_type_of_output');
const buttonGenerateOutput = $('#button_generate_output');
const buttonCopyOutput = $('#button_copy_output');
const divOutputDisplay = $('#div_output_display');

/** ISAC CANEDO */

/** OBJECT LITERALS */

const SET_OF_WORDS = [
    "vel", "Isac", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "id", "neque", "nulla", "posuere",
    "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "mattis", "nunc",
    "sed", "blandit", "libero", "massa", "neque", "a", "diam", "elit", "faucibus", "ornare", "auctor",
    "ac", "quisque", "rutrum", "gravida", "hendrerit", "est", "nibh", "scelerisque", "fermentum", "dui",
    "ante", "adipiscing", "consectetur", "dolor", "sit", "ipsum", "lorem", "sollicitudin", "tempor", "turpis",
    "labore", "ut", "eiusmod", "do", "orci", "pharetra", "eget", "tristique", "porttitor", "quam", "vitae", "torro",
    "commodo", "mauris", "morbi", "placerat", "fusce", "eu", "quis", "eros", "donec", "odio", "venenatis", "lectus",
    "augue", "purus", "scelerisque", "hac", "enim", "tellus", "platea", "habitasse", "arcu", "dictumst", "ultricies"
];

const FIRST_SENTENCE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";

const MAX_COUNT_OF_WORDS_IN_SENTENCE = 10;
const MIN_COUNT_OF_WORDS_IN_SENTENCE = 5;
const MAX_COUNT_OF_SENTENCES_IN_PARAGRAPH = 9;
const MIN_COUNT_OF_SENTENCES_IN_PARAGRAPH = 4;


/** FUNCTIONS */

const randomize = (maxCount, minCount) => Math.floor((Math.random() * (maxCount - minCount)) + minCount);

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const clearOutputDisplay = () => divOutputDisplay.html('');

const setOutputDisplay = (output) => divOutputDisplay.html(output);

const getCountOfWords = () => randomize(MAX_COUNT_OF_WORDS_IN_SENTENCE, MIN_COUNT_OF_WORDS_IN_SENTENCE);

const getCountOfSentences = () => randomize(MAX_COUNT_OF_SENTENCES_IN_PARAGRAPH, MIN_COUNT_OF_SENTENCES_IN_PARAGRAPH);

const getSetOfWords = () => {
    let index = randomize(SET_OF_WORDS.length - 1, 1);
    return SET_OF_WORDS[index];
};

const setWords = (count) => {
    let words = [];

    for (let i = 0; i < count; i++) {
        let word = capitalize(getSetOfWords());
        words.push(word);
    }

    return `<p>${words.join(' ').toString()}</p>`;
};

const setSentence = () => {
    let sentence = [];
    let countOfWords = getCountOfWords();

    for (let i = 0; i < countOfWords; i++) {
        sentence.push(getSetOfWords());
    }

    let punctuation = sentence.length > 0 && sentence.length <= 3 ? '!' : '.';
    let newSentence = capitalize(sentence.join(' ').toString() + punctuation);

    return newSentence.concat(' ');
}

const setSentences = (count) => {
    let sentences = [];

    for (let i = 0; i < count; i++) {
        sentences.push(setSentence());
    }

    return `<p>${sentences.join('').toString()}</p>`;
};

const setParagraph = () => {
    let paragraph = [];
    let countOfSentences = getCountOfSentences();

    for (let i = 0; i < countOfSentences; i++) {
        paragraph.push(setSentence());
    }

    return `<p>${paragraph.join('').toString()}</p>`;
};

const setParagraphs = (count) => {
    let paragraphs = [];

    for (let i = 0; i < count; i++) {
        paragraphs.push(setParagraph());
    }

    // Insert the Lorem ipsum default sentence on first paragraph
    paragraphs[0] = paragraphs[0].slice(0, 3) + FIRST_SENTENCE + paragraphs[0].slice(3);

    return paragraphs.join('').toString();
};

const generateOutput = () => {
    let outputCount = fieldOutputCount.val();
    let outputType = selectorOutputType.val();

    clearOutputDisplay();

    switch (outputType) {
        case 'words':
            let words = setWords(outputCount);
            setOutputDisplay(words);
            break;
        case 'sentences':
            let sentences = setSentences(outputCount);
            setOutputDisplay(sentences);
            break;
        case 'paragraphs':
            let paragraphs = setParagraphs(outputCount);
            setOutputDisplay(paragraphs);
            break;
        default:
            clearOutputDisplay();
            break;
    }
};

const initGenerator = () => {
    fieldOutputCount.val('1');
    selectorOutputType.val('paragraphs');
    generateOutput();
};


/** JQUERY COMPONENTS */

$(document).ready(initGenerator);

buttonGenerateOutput.click(function () {
    generateOutput();
});

buttonCopyOutput.click(function () {

});
