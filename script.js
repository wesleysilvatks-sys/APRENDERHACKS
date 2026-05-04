const input = document.getElementById('guessInput');
const board = document.getElementById('board');
const message = document.getElementById('message');

let secretCode = generateCode();
let attempts = 0;
const maxAttempts = 4;

function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function makeGuess() {
    const guess = input.value;
    
    if (guess.length !== 4 || attempts >= maxAttempts) return;

    const row = document.createElement('div');
    row.className = 'row';

    for (let i = 0; i < 4; i++) {
        const span = document.createElement('span');
        span.className = 'digit';
        span.innerText = guess[i];

        if (guess[i] === secretCode[i]) {
            span.classList.add('correct');
        } else if (secretCode.includes(guess[i])) {
            span.classList.add('wrong-pos');
        } else {
            span.classList.add('incorrect');
        }
        row.appendChild(span);
    }

    board.appendChild(row);
    attempts++;
    input.value = '';

    // Lógica de Finalização
    if (guess === secretCode) {
        endGame("SISTEMA ACESSADO! Reiniciando...");
    } else if (attempts === maxAttempts) {
        endGame(`SISTEMA BLOQUEADO! O código era ${secretCode}. Reiniciando...`);
    }
}

function endGame(msg) {
    message.innerText = msg;
    input.disabled = true; // Desativa o input para evitar bugs

    // Aguarda 3 segundos e reinicia automaticamente
    setTimeout(() => {
        resetGame();
    }, 3000);
}

function resetGame() {
    attempts = 0;
    secretCode = generateCode();
    board.innerHTML = '';
    message.innerText = '';
    input.disabled = false;
    input.focus();
}
