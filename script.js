var themeBtn = document.getElementById("themeBtn");
var body = document.body;
var form = document.getElementById("contactForm");

// Altera tema
themeBtn.addEventListener("click", function () {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    var isDark = body.classList.contains("dark");
    themeBtn.textContent = isDark ? "🌜 Tema escuro" : "🌞 Tema claro";
});
