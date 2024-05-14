// Dados das histórias (você pode adicionar mais histórias aqui)
const stories = [
    {
        title: "A Jornada da Inteligência Artificial",
        chapters: [
            {
                title: "Capítulo 1: O Surgimento da Inteligência Artificial",
                content: "No início do século XX, pesquisadores começaram a explorar o conceito de criar máquinas capazes de realizar tarefas que requerem inteligência humana. O surgimento da computação moderna impulsionou ainda mais esses esforços, levando a avanços significativos na teoria da inteligência artificial.",
                image: "imagescapitulo1.jpg" // Caminho da imagem para o capítulo 1
            },
            {
                title: "Capítulo 2: Avanços Modernos em IA",
                content: "Nos últimos anos, testemunhamos uma explosão de avanços em inteligência artificial. Tecnologias como redes neurais, machine learning e deep learning têm impulsionado o campo, permitindo que computadores realizem tarefas complexas com uma precisão impressionante. Esses avanços têm sido aplicados em uma variedade de áreas, desde assistentes virtuais até carros autônomos, revolucionando a forma como interagimos com a tecnologia.",
                image: "imagescapitulo2.jpg" // Caminho da imagem para o capítulo 2
            },
            {
                title: "Capítulo 3: Aplicações da IA na Vida Cotidiana",
                content: "A inteligência artificial está cada vez mais presente em nossas vidas cotidianas. Desde recomendações personalizadas em plataformas de streaming até assistentes virtuais em nossos dispositivos móveis, a IA está transformando a maneira como interagimos com a tecnologia. Neste capítulo, exploraremos algumas das aplicações mais comuns da IA e como elas estão impactando nossa sociedade.",
                image: "imagescapitulo3.jpg" // Caminho da imagem para o capítulo 3
            },
            {
                title: "Capítulo 4: Desafios e Ética na IA",
                content: "Apesar dos benefícios da inteligência artificial, também enfrentamos desafios significativos e questões éticas em seu desenvolvimento e aplicação. Desde preocupações com privacidade e segurança até o potencial de viés algorítmico, é crucial abordar essas questões à medida que continuamos a avançar no campo da IA. Neste capítulo, discutiremos alguns dos principais desafios e questões éticas relacionadas à inteligência artificial.",
                image: "imagescapitulo4.jpg" // Caminho da imagem para o capítulo 4
            },
            // Adicione mais capítulos conforme necessário
        ]
    },
    // Adicione mais histórias conforme necessário
];

let currentStoryIndex = 0;

// Função para carregar a história na página
function loadStory(storyIndex) {
    const storySection = document.getElementById('story');
    storySection.innerHTML = ''; // Limpar o conteúdo anterior

    const story = stories[storyIndex];

    // Adicionar os capítulos da história à seção
    story.chapters.forEach(chapter => {
        const chapterDiv = document.createElement('div');
        chapterDiv.classList.add('chapter');
        chapterDiv.innerHTML = `
            <h2>${chapter.title}</h2>
            <img src="${chapter.image}" alt="${chapter.title}" class="chapter-image">
            <p>${chapter.content}</p>`;
        storySection.appendChild(chapterDiv);
    });

    // Adicionar botão de próxima história se houver uma próxima história disponível
    if (storyIndex < stories.length - 1) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('next-button');
        nextButton.innerText = "Próxima História";
        nextButton.addEventListener('click', () => {
            currentStoryIndex++;
            loadStory(currentStoryIndex);
        });
        storySection.appendChild(nextButton);
    }
}

// Carregar a primeira história quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    loadStory(currentStoryIndex); // Carregar a primeira história por padrão
});

document.addEventListener("DOMContentLoaded", function() {
    const listaAlunos = document.getElementById("lista-alunos");
    const novoAlunoInput = document.getElementById("novo-aluno");
    const adicionarAlunoBtn = document.getElementById("adicionar-aluno");

    adicionarAlunoBtn.addEventListener("click", function() {
        const nomeAluno = novoAlunoInput.value;
        if (nomeAluno.trim() !== "") {
            const novoItemLista = document.createElement("li");
            novoItemLista.textContent = nomeAluno;
            listaAlunos.appendChild(novoItemLista);
            novoAlunoInput.value = "";
        }
    });
});
