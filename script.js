const input = document.getElementById('guessInput');
const board = document.getElementById('board');
const message = document.getElementById('message');

let attempts = 0;
const maxAttempts = 4;
let secretCode = generateCode();

function generateCode() {
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    digits.sort(() => Math.random() - 0.5);
    return digits.slice(0, 4).join('');
}

function makeGuess() {
    const guess = input.value;
    
    if (guess.length !== 4 || attempts >= maxAttempts) return;

    // Impede números repetidos no palpite
    if (new Set(guess).size !== 4) {
        message.innerText = "Não repita números!";
        return;
    }

    message.innerText = ""; // Limpa avisos de erro

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

    if (guess === secretCode) {
        endGame("SISTEMA ACESSADO!");
    } else if (attempts === maxAttempts) {
        endGame(`FALHA! O código era ${secretCode}`);
    }
}

function endGame(msg) {
    message.innerText = msg;
    input.disabled = true;
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
