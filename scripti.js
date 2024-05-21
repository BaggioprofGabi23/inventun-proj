document.addEventListener("DOMContentLoaded", function() {
    const tabuleiro = document.getElementById("tabuleiro");
    const iniciarJogoBtn = document.getElementById("iniciar-jogo");
    const mensagemParabens = document.getElementById("mensagem-parabens");
    const cronometroDisplay = document.getElementById("cronometro");
    const rankingList = document.getElementById("ranking");

    let cartas = [];
    let simbolos = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"];
    let cartasViradas = [];
    let bloquearClique = false;
    let timer;
    let segundos = 0;
    let ranking = [];

    function iniciarCronometro() {
        segundos = 0;
        cronometroDisplay.textContent = `Tempo: ${segundos} segundos`;
        timer = setInterval(() => {
            segundos++;
            cronometroDisplay.textContent = `Tempo: ${segundos} segundos`;
        }, 1000);
    }

    function pararCronometro() {
        clearInterval(timer);
    }

    function criarCartas() {
        cartas = [];
        const cartasSimbolos = simbolos.concat(simbolos);
        cartasSimbolos.sort(() => Math.random() - 0.5);

        cartasSimbolos.forEach(simbolo => {
            const carta = document.createElement("div");
            carta.classList.add("carta");
            carta.dataset.simbolo = simbolo;
            carta.innerText = "?";
            tabuleiro.appendChild(carta);
            cartas.push(carta);

            carta.addEventListener("click", function() {
                virarCarta(carta);
            });
        });
    }

    function virarCarta(carta) {
        if (bloquearClique || carta.classList.contains("virada")) return;

        carta.innerText = carta.dataset.simbolo;
        carta.classList.add("virada");
        cartasViradas.push(carta);

        if (cartasViradas.length === 2) {
            bloquearClique = true;
            setTimeout(() => {
                verificarPar();
                if (jogoConcluido()) {
                    pararCronometro();
                    setTimeout(() => {
                        const nome = prompt("Parabéns! Você concluiu o jogo! Qual é o seu nome?");
                        if (nome) {
                            atualizarRanking(nome, segundos);
                        }
                        mensagemParabens.style.display = "block";
                    }, 500);
                }
                bloquearClique = false;
            }, 1000);
        }
    }

    function verificarPar() {
        const [carta1, carta2] = cartasViradas;

        if (carta1.dataset.simbolo === carta2.dataset.simbolo) {
            cartasViradas = [];
        } else {
            cartasViradas.forEach(carta => {
                carta.innerText = "?";
                carta.classList.remove("virada");
            });
            cartasViradas = [];
        }
    }

    function jogoConcluido() {
        return cartas.every(carta => carta.classList.contains("virada"));
    }

    function atualizarRanking(nome, tempo) {
        ranking.push({ nome, tempo });
        ranking.sort((a, b) => a.tempo - b.tempo);

        rankingList.innerHTML = "";
        ranking.forEach((recorde, index) => {
            const item = document.createElement("li");
            item.textContent = `${index + 1}. ${recorde.nome} - ${recorde.tempo} segundos`;
            rankingList.appendChild(item);
        });
    }

    function reiniciarJogo() {
        tabuleiro.innerHTML = "";
        cartasViradas = [];
        bloquearClique = false;
        mensagemParabens.style.display = "none";
        iniciarCronometro();
        criarCartas();
    }

    iniciarJogoBtn.addEventListener("click", function() {
        reiniciarJogo();
    });

    criarCartas();
});
