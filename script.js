const screens = {
    inicio: document.getElementById("inicio"),
    mensagem: document.getElementById("mensagem"),
    galeria: document.getElementById("galeria")
};

const buttons = {
    comecar: document.getElementById("btnComecar"),
    continuar: document.getElementById("btnContinuar"),
    inicio: document.getElementById("btnInicio"),
    musica: document.getElementById("btnMusica"),
    abrirCarta: document.getElementById("btnAbrirCarta"),
    fecharCarta: document.getElementById("btnFecharCarta"),
    voltarGaleria: document.getElementById("btnVoltarGaleria"),
    fecharImagem: document.getElementById("btnFecharImagem")
};

const player = document.getElementById("player");
const carta = document.getElementById("carta");
const modalImagem = document.getElementById("modalImagem");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const mensagemCoracao = document.getElementById("mensagemCoracao");
let telaAtual = "inicio";
const tempoAnimacaoDialog = 220;

function mostrarTela(nomeDaTela) {
    Object.entries(screens).forEach(([nome, screen]) => {
        const telaAtiva = nome === nomeDaTela;

        screen.hidden = !telaAtiva;
        screen.classList.toggle("screen--active", telaAtiva);
    });

    telaAtual = nomeDaTela;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function tocarMusica() {
    try {
        await player.play();
        atualizarBotaoMusica(true);
    } catch (erro) {
        atualizarBotaoMusica(false);
    }
}

function pausarMusica() {
    player.pause();
    atualizarBotaoMusica(false);
}

function alternarMusica() {
    if (player.paused) {
        tocarMusica();
        return;
    }

    pausarMusica();
}

function atualizarBotaoMusica(estaTocando) {
    buttons.musica.classList.toggle("is-playing", estaTocando);
    buttons.musica.setAttribute("aria-pressed", String(estaTocando));
    buttons.musica.textContent = estaTocando ? "⏸ Pausar música" : "▶ Tocar música";
}

function abrirCarta() {
    if (typeof carta.showModal === "function") {
        carta.showModal();
    } else {
        carta.setAttribute("open", "");
    }

    requestAnimationFrame(() => carta.classList.add("is-visible"));
    buttons.fecharCarta.focus();
}

function fecharCarta() {
    carta.classList.remove("is-visible");

    setTimeout(() => {
        if (typeof carta.close === "function") {
            carta.close();
        } else {
            carta.removeAttribute("open");
        }

        if (telaAtual === "galeria") {
            buttons.abrirCarta.focus();
        }
    }, tempoAnimacaoDialog);
}

function abrirImagem(botaoFoto) {
    const imagem = botaoFoto.querySelector("img");

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt;

    if (typeof modalImagem.showModal === "function") {
        modalImagem.showModal();
    } else {
        modalImagem.setAttribute("open", "");
    }

    requestAnimationFrame(() => modalImagem.classList.add("is-visible"));
    buttons.fecharImagem.focus();
}

function fecharImagem() {
    modalImagem.classList.remove("is-visible");

    setTimeout(() => {
        if (typeof modalImagem.close === "function") {
            modalImagem.close();
        } else {
            modalImagem.removeAttribute("open");
        }

        imagemAmpliada.src = "";
        imagemAmpliada.alt = "";
    }, tempoAnimacaoDialog);
}

buttons.comecar.addEventListener("click", () => {
    mostrarTela("mensagem");
    tocarMusica();
});

buttons.continuar.addEventListener("click", () => {
    mostrarTela("galeria");
});

buttons.inicio.addEventListener("click", () => {
    mostrarTela("inicio");
});

buttons.musica.addEventListener("click", alternarMusica);
buttons.abrirCarta.addEventListener("click", abrirCarta);
buttons.fecharCarta.addEventListener("click", fecharCarta);
buttons.voltarGaleria.addEventListener("click", fecharCarta);
buttons.fecharImagem.addEventListener("click", fecharImagem);

document.querySelectorAll(".heart-button").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".heart-button").forEach((item) => {
            item.classList.remove("is-selected");
        });

        button.classList.add("is-selected");
        mensagemCoracao.textContent = button.dataset.msg;
    });
});

document.querySelectorAll(".photo-button").forEach((button) => {
    button.addEventListener("click", () => abrirImagem(button));
});

carta.addEventListener("click", (event) => {
    if (event.target === carta) {
        fecharCarta();
    }
});

modalImagem.addEventListener("click", (event) => {
    if (event.target === modalImagem) {
        fecharImagem();
    }
});

player.addEventListener("play", () => atualizarBotaoMusica(true));
player.addEventListener("pause", () => atualizarBotaoMusica(false));
player.addEventListener("ended", () => atualizarBotaoMusica(false));
