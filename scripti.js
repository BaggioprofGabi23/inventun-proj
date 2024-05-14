document.addEventListener("DOMContentLoaded", function() {
    const tabuleiro = document.getElementById("tabuleiro");
    const iniciarJogoBtn = document.getElementById("iniciar-jogo");
    let cartas = [];

    // Símbolos das cartas
    const simbolos = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"];
    let cartasViradas = [];
    let bloquearClique = false;

    // Função para criar as cartas do jogo da memória
    function criarCartas() {
        // Duplica os símbolos para formar pares de cartas
        const cartasSimbolos = simbolos.concat(simbolos);

        // Embaralha os símbolos
        cartasSimbolos.sort(() => Math.random() - 0.5);

        // Cria as cartas e adiciona eventos de clique
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

    // Função para virar uma carta
    function virarCarta(carta) {
        if (bloquearClique || carta.classList.contains("virada")) return;

        carta.innerText = carta.dataset.simbolo;
        carta.classList.add("virada");
        cartasViradas.push(carta);

        if (cartasViradas.length === 2) {
            bloquearClique = true;
            setTimeout(() => {
                verificarPar();
            }, 1000);
        }
    }

    // Função para verificar se as cartas viradas formam um par
    function verificarPar() {
        const [carta1, carta2] = cartasViradas;

        if (carta1.dataset.simbolo === carta2.dataset.simbolo) {
            // As cartas formam um par, mantém viradas
            cartasViradas = [];
        } else {
            // As cartas não formam um par, vira de volta
            cartasViradas.forEach(carta => {
                carta.innerText = "?";
                carta.classList.remove("virada");
            });
            cartasViradas = [];
        }

        bloquearClique = false;
    }

    // Evento de clique para iniciar o jogo
    iniciarJogoBtn.addEventListener("click", function() {
        reiniciarJogo();
    });

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        tabuleiro.innerHTML = ""; // Limpa o tabuleiro
        cartas = []; // Reinicia a lista de cartas
        cartasViradas = []; // Reinicia a lista de cartas viradas
        bloquearClique = false; // Libera os cliques

        criarCartas(); // Cria as cartas do jogo
    }

    // Inicia o jogo ao carregar a página
    criarCartas();
});
