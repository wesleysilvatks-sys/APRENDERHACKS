const secretCode = Math.floor(1000 + Math.random() * 9000).toString();
let attempts = 0;
const maxAttempts = 4;

function makeGuess() {
    const input = document.getElementById('guessInput');
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

    document.getElementById('board').appendChild(row);
    attempts++;
    input.value = '';

    if (guess === secretCode) {
        document.getElementById('message').innerText = "Acesso Concedido!";
    } else if (attempts === maxAttempts) {
        document.getElementById('message').innerText = `Sistema Bloqueado! Código: ${secretCode}`;
    }
}
