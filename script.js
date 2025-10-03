const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const countLetters = text => (text.match(/\p{L}/gu) || []).length;
const countCharactersWithSpaces = text => text.length;
const countWords = text => text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
const countSentences = text => text.trim() ? text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean).length : 0;
const countParagraphs = text => text.trim() ? text.split(/\n+/).map(p => p.trim()).filter(Boolean).length : 0;
const longestWord = text => {
  const words = text.trim().split(/\s+/).map(w => w.replace(/[^\p{L}\p{N}'’\-]/gu,'')).filter(Boolean);
  return words.length ? words.reduce((a,b)=>b.length>a.length?b:a) : '—';
};
const averageWordLength = text => {
  const words = text.trim().split(/\s+/).map(w => w.replace(/[^\p{L}\p{N}'’\-]/gu,'')).filter(Boolean);
  return words.length ? (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(2) : 0;
};

const textInput = document.getElementById('textInput');
const countBtn = document.getElementById('countBtn');
const bgBtn = document.getElementById('bgBtn');
const liveToggle = document.getElementById('liveToggle');

const lettersEl = document.getElementById('letters');
const charsEl = document.getElementById('chars');
const wordsEl = document.getElementById('words');
const sentencesEl = document.getElementById('sentences');
const paragraphsEl = document.getElementById('paragraphs');
const longestEl = document.getElementById('longest');
const avgWordLenEl = document.getElementById('avgWordLen');

function updateCounts() {
  const text = textInput.value || '';
  const results = {
    letters: countLetters(text),
    charactersWithSpaces: countCharactersWithSpaces(text),
    words: countWords(text),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    longest: longestWord(text),
    avgWordLen: averageWordLength(text)
  };
  Object.entries(results).forEach(([key, value]) => 
    document.getElementById(key === 'charactersWithSpaces' ? 'chars' : key).textContent = value
  );
}

const debouncedUpdate = debounce(updateCounts, 300);

countBtn.addEventListener('click', updateCounts);
textInput.addEventListener('input', () => { if(liveToggle.checked) debouncedUpdate(); });

bgBtn.addEventListener('click', () => {
  const h1 = Math.floor(Math.random() * 360);
  const h2 = (h1 + Math.floor(Math.random() * 90) + 60) % 360;
  document.body.style.background = `linear-gradient(135deg, hsl(${h1} 70% 88%), hsl(${h2} 70% 88%))`;
});

updateCounts();
