const startBtn = document.getElementById('start-btn');
const outputDiv = document.getElementById('output');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;

recognition.lang = 'ru-RU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

startBtn.addEventListener('click', () => {
    recognition.start();
    outputDiv.textContent = 'Готов слушать...';
});

recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    outputDiv.textContent = `Вы сказали: "${speechResult}"`;
    respondToSpeech(speechResult);
};

recognition.onspeechend = () => {
    recognition.stop();
    outputDiv.textContent += ' (Слушание завершено)';
};

recognition.onerror = (event) => {
    outputDiv.textContent = 'Ошибка: ' + event.error;
};

function respondToSpeech(speech) {
    let response = '';
    if (speech.includes('привет')) {
        response = 'Привет! Как я могу помочь?';
    } else if (speech.includes('как дела')) {
        response = 'У меня все отлично, спасибо!';
    } else {
        response = 'Извините, я не понимаю.';
    }

    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'ru-RU';
    synth.speak(utterance);
}
