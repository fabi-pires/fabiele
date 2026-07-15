// Mensagem de boas-vindas
window.onload = function () {
    alert("🌿 Bem-vindo(a) ao site Fabiele Pires - Biologia!");
};

// Rolagem suave do menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Botão para voltar ao topo
const botaoTopo = document.getElementById("topo");

window.onscroll = function () {
    if (botaoTopo) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            botaoTopo.style.display = "block";
        } else {
            botaoTopo.style.display = "none";
        }
    }
};

if (botaoTopo) {
    botaoTopo.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}