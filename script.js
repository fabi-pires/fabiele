var themeBtn = document.getElementById("themeBnt")
var body =document.body
var form=document.getElementById("contacForm")

//Altera tema
themeBtn.addEventListener("click", function(){
    body.classList.toggle("darck")
    body.classList.toggle("light")

    var isDark=body.classList.contains("dark")
    themeBtn.textContent = isDark ? "🌜 tema escuro" :"🌞Tema Claro"
})