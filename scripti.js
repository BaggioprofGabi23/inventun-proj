document.addEventListener("DOMContentLoaded", function() {
    const tabuleiro = document.getElementById("tabuleiro");
    const iniciarJogoBtn = document.getElementById("iniciar-jogo");
    const mensagemParabens = document.getElementById("mensagem-parabens");
    const cronometro = document.getElementById("cronometro");
    const ranking = document.getElementById("ranking");
    let cartas = [];
    let tempo = 0;
    let intervalo;
    let cartasViradas = [];
    let bloquearClique = false;

    const simbolos = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"];

    function criarCartas() {
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
                verificarJogoConcluido();
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

        bloquearClique = false;
    }

    function verificarJogoConcluido() {
        if (cartas.every(carta => carta.classList.contains("virada"))) {
            clearInterval(intervalo);
            mensagemParabens.style.display = "block";
            atualizarRanking(tempo);
        }
    }

    function reiniciarJogo() {
        tabuleiro.innerHTML = "";
        cartas = [];
        cartasViradas = [];
        bloquearClique = false;
        mensagemParabens.style.display = "none";
        tempo = 0;
        cronometro.innerText = `Tempo: ${tempo} segundos`;
        clearInterval(intervalo);
        intervalo = setInterval(() => {
            tempo++;
            cronometro.innerText = `Tempo: ${tempo} segundos`;
        }, 1000);

        criarCartas();
    }

    function atualizarRanking(tempo) {
        const recorde = document.createElement("li");
        recorde.innerText = `${tempo} segundos`;
        ranking.appendChild(recorde);
    }

    iniciarJogoBtn.addEventListener("click", reiniciarJogo);

    criarCartas();
});
