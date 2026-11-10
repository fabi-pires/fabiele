(function () {
    "use strict";

    // O script é compartilhado entre páginas que podem não ter o botão de tema.
    // Só registra o evento quando o controle realmente existe.
    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        const temaSalvo = localStorage.getItem("bioaulas-tema");
        if (temaSalvo === "dark" || temaSalvo === "light") {
            document.body.classList.remove("dark", "light");
            document.body.classList.add(temaSalvo);
        }

        function atualizarTexto() {
            const escuro = document.body.classList.contains("dark");
            themeBtn.textContent = escuro ? "🌜 Tema escuro" : "🌞 Tema claro";
            themeBtn.setAttribute("aria-pressed", String(escuro));
        }

        themeBtn.addEventListener("click", function () {
            const escuro = document.body.classList.toggle("dark");
            document.body.classList.toggle("light", !escuro);
            localStorage.setItem("bioaulas-tema", escuro ? "dark" : "light");
            atualizarTexto();
        });

        atualizarTexto();
    }
})();
