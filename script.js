(() => {
    const screens = document.querySelectorAll("[data-screen]");
    const startButton = document.getElementById("btnComecar");
    const continueButton = document.getElementById("btnContinuar");
    const homeButton = document.getElementById("voltarInicio");
    const openLetterButton = document.getElementById("abrirCarta");
    const closeLetterButton = document.getElementById("fecharCarta");
    const heartButtons = document.querySelectorAll(".coracao");
    const heartMessage = document.getElementById("mensagemCoracao");

    const player = document.getElementById("player");
    const musicPanel = document.querySelector(".controle-musica");
    const playMusicButton = document.getElementById("tocarMusica");
    const pauseMusicButton = document.getElementById("pausarMusica");
    const musicStatus = document.getElementById("statusMusica");

    const modal = document.getElementById("modalGaleria");
    const modalImage = document.getElementById("imagemModal");
    const modalCaption = document.getElementById("legendaModal");
    const closeModalButton = document.getElementById("fecharModal");
    const previousPhotoButton = document.getElementById("fotoAnterior");
    const nextPhotoButton = document.getElementById("fotoProxima");
    const galleryButtons = document.querySelectorAll(".foto-botao");
    const ambientEffects = document.getElementById("efeitosAmbiente");

    const galleryItems = Array.from(galleryButtons).map((button) => {
        const image = button.querySelector("img");
        const caption = button.closest(".card-foto").querySelector("figcaption");

        return {
            src: image.getAttribute("src"),
            alt: image.getAttribute("alt"),
            caption: caption.textContent.trim(),
            trigger: button
        };
    });

    const state = {
        currentScreen: "intro",
        lastScreenBeforeLetter: "gallery",
        activePhotoIndex: 0,
        lastFocusedElement: null
    };

    // Navegacao principal sem recarregar a pagina.
    function showScreen(screenName) {
        screens.forEach((screen) => {
            const isActive = screen.dataset.screen === screenName;
            screen.hidden = !isActive;
            screen.classList.toggle("is-active", isActive);
        });

        state.currentScreen = screenName;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function setMusicState(isPlaying, statusText) {
        musicPanel.classList.toggle("is-playing", isPlaying);
        playMusicButton.disabled = isPlaying;
        pauseMusicButton.disabled = !isPlaying;
        musicStatus.textContent = statusText;
    }

    // Musica sempre e iniciada por acao do usuario, como exigem navegadores modernos.
    async function playMusic() {
        try {
            await player.play();
            setMusicState(true, "Música tocando");
        } catch (error) {
            setMusicState(false, "Toque para iniciar a música");
        }
    }

    function pauseMusic() {
        player.pause();
        setMusicState(false, "Música pausada");
    }

    function showHeartMessage(button) {
        heartButtons.forEach((heartButton) => {
            heartButton.classList.toggle("is-selected", heartButton === button);
        });

        heartMessage.textContent = button.dataset.msg;
        heartMessage.classList.remove("is-visible");
        void heartMessage.offsetWidth;
        heartMessage.classList.add("is-visible");
    }

    function updateModalPhoto(index) {
        const totalPhotos = galleryItems.length;
        state.activePhotoIndex = (index + totalPhotos) % totalPhotos;

        const photo = galleryItems[state.activePhotoIndex];
        modalImage.src = photo.src;
        modalImage.alt = photo.alt;
        modalCaption.textContent = photo.caption;
    }

    function openModal(index) {
        state.lastFocusedElement = document.activeElement;
        updateModalPhoto(index);

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        closeModalButton.focus();
    }

    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        modal.hidden = true;
        document.body.classList.remove("modal-open");

        if (state.lastFocusedElement) {
            state.lastFocusedElement.focus();
        }
    }

    function createAmbientEffects() {
        const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (shouldReduceMotion || !ambientEffects) {
            return;
        }

        const effectCount = 22;

        for (let index = 0; index < effectCount; index += 1) {
            const element = document.createElement("span");
            const isHeart = index % 3 === 0;

            element.className = isHeart ? "floating-heart" : "floating-particle";
            element.textContent = isHeart ? "❤️" : "";
            element.style.setProperty("--left", String(4 + Math.random() * 92) + "%");
            element.style.setProperty("--duration", String(11 + Math.random() * 10) + "s");
            element.style.setProperty("--delay", String(Math.random() * 9) + "s");
            element.style.setProperty("--drift", String(-36 + Math.random() * 72) + "px");
            element.style.setProperty("--size", isHeart ? String(14 + Math.random() * 14) + "px" : String(3 + Math.random() * 5) + "px");

            ambientEffects.appendChild(element);
        }
    }

    startButton.addEventListener("click", () => {
        showScreen("message");
        playMusic();
    });

    continueButton.addEventListener("click", () => {
        showScreen("gallery");
    });

    homeButton.addEventListener("click", () => {
        showScreen("intro");
    });

    openLetterButton.addEventListener("click", () => {
        state.lastScreenBeforeLetter = state.currentScreen;
        showScreen("letter");
        closeLetterButton.focus();
    });

    closeLetterButton.addEventListener("click", () => {
        showScreen(state.lastScreenBeforeLetter || "gallery");
        openLetterButton.focus();
    });

    heartButtons.forEach((button) => {
        button.addEventListener("click", () => showHeartMessage(button));
    });

    galleryButtons.forEach((button, index) => {
        button.addEventListener("click", () => openModal(index));
    });

    playMusicButton.addEventListener("click", playMusic);
    pauseMusicButton.addEventListener("click", pauseMusic);

    closeModalButton.addEventListener("click", closeModal);
    previousPhotoButton.addEventListener("click", () => updateModalPhoto(state.activePhotoIndex - 1));
    nextPhotoButton.addEventListener("click", () => updateModalPhoto(state.activePhotoIndex + 1));

    modal.addEventListener("click", (event) => {
        if (event.target.hasAttribute("data-close-modal")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (modal.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeModal();
        }

        if (event.key === "ArrowLeft") {
            updateModalPhoto(state.activePhotoIndex - 1);
        }

        if (event.key === "ArrowRight") {
            updateModalPhoto(state.activePhotoIndex + 1);
        }
    });

    player.addEventListener("ended", () => {
        setMusicState(false, "Música finalizada");
        player.currentTime = 0;
    });

    createAmbientEffects();
})();
