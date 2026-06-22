const botao = document.getElementById("btnComecar");
const container = document.querySelector(".container");
const player = document.getElementById("player");

const playlist = [
    "me-gustas-tu.mp3"
];

let musicaAtual = 0;

botao.addEventListener("click", () => {
    player.src = playlist[musicaAtual];
player.play();

    container.innerHTML = `
        <h1>Para Ana ❤️</h1>

        <p>
            Entre todas as pessoas que eu poderia conhecer,
            eu sou muito feliz por ter encontrado você.
        </p>

        <button id="proximo">Continuar</button>
    `;

    document.getElementById("proximo").addEventListener("click", () => {
        container.innerHTML = `
           <button id="voltarInicio">← Início</button>

<h1>Momentos Especiais ✨</h1>

            <p>
                Separei alguns momentos porque cada detalhe seu
                tem um valor enorme pra mim.
            </p>

            <div class="galeria">

    <div class="card-foto">
        <img src="ana1.jpeg" alt="Foto da Ana">
        <p>Seu sorriso tem um jeito especial de deixar tudo mais bonito.</p>
    </div>

    <div class="card-foto">
        <img src="ana2.jpeg" alt="Foto da Ana">
        <p>Você é uma daquelas pessoas que tornam os dias mais leves.</p>
    </div>

    <div class="card-foto">
        <img src="ana3.jpeg" alt="Foto da Ana">
        <p>Eu amo cada detalhe seu, até aqueles que você talvez nem perceba.</p>
    </div>

    <div class="card-foto">
        <img src="minecraft.jpg" alt="Nós no Minecraft">
        <p>Entre todos os mundos que eu poderia explorar, meu favorito é aquele em que você está comigo.</p>
    </div>

</div>
        `;
    });
});
document.addEventListener("click", (evento) => {
    if(evento.target.matches(".card-foto img")){
        const modal = document.getElementById("modal");
        const imagemModal = document.getElementById("imagemModal");

        imagemModal.src = evento.target.src;
        modal.classList.add("ativo");
    }

    if(evento.target.id === "modal"){
        evento.target.classList.remove("ativo");
    }
});
document.addEventListener("click", (evento) => {
    if(evento.target.classList.contains("coracao")){
        const mensagem = evento.target.getAttribute("data-msg");
        document.getElementById("mensagemCoracao").textContent = mensagem;
    }
});
document.addEventListener("click", (evento) => {

    if(evento.target.id === "abrirCarta"){

        container.innerHTML = `

            <div class="carta">

                <h1>Uma última coisa ❤️</h1>

                <p>
                    Ana,
                    <br><br>

                    Eu poderia simplesmente ter mandado uma mensagem.

                    Mas eu quis fazer algo diferente.

                    Talvez esse site não seja perfeito, talvez ele tenha alguns erros,
                    algumas partes simples, mas cada detalhe aqui foi feito pensando em você.

                    <br><br>

                    Cada foto, cada frase e cada coração foram colocados aqui porque você é uma pessoa muito especial para mim.

                    <br><br>

                    Você faz parte dos meus pensamentos, dos meus dias e dos momentos que eu mais gosto de lembrar.

                    <br><br>

                    Obrigado por todas as conversas, pelas risadas, pela companhia e por ser quem você é.

                    <br><br>

                    Eu admiro seu jeito, sua personalidade e a pessoa incrível que você é.

                    <br><br>

                    E acima de tudo, queria que você soubesse uma coisa:

                    <br><br>

                    <strong>Eu te amo. ❤️</strong>

                    <br><br><br>

                    Com carinho,

                    <br>

                    <strong>Nathan</strong>
                    <br><br>

<button id="voltarGaleria">
    Voltar ❤️
</button>
                </p>

            </div>

        `;
    }

});
document.addEventListener("click", (evento) => {

    if(evento.target.id === "voltarGaleria"){
        location.reload();
    }

    if(evento.target.id === "voltarInicio"){
        location.reload();
    }

});
document.addEventListener("click", (evento) => {

    if(evento.target.id === "pausarMusica"){
        if(player.paused){
            player.play();
            evento.target.textContent = "⏸️ Pausar";
        }else{
            player.pause();
            evento.target.textContent = "▶️ Tocar";
        }
    }

    if(evento.target.id === "proximaMusica"){
        musicaAtual++;

        if(musicaAtual >= playlist.length){
            musicaAtual = 0;
        }

        player.src = playlist[musicaAtual];
        player.play();
    }

});