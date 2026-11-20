/* Chatbot Bio sem Mistério — versão inicial gratuita */
(function () {
  if (document.getElementById("bio-chatbot")) return;

  const WHATSAPP_NUMBER = "555195747291"; // preencher depois: código do país + DDD + número, somente dígitos
  const style = document.createElement("style");
  style.textContent = `
    #bio-chatbot{position:fixed;right:18px;bottom:18px;z-index:99999;font-family:Arial,sans-serif;color:#183c25}
    #bio-chatbot *{box-sizing:border-box}
    #bio-chatbot .bio-chat-open{border:0;border-radius:50%;width:62px;height:62px;background:#1b5e20;color:#fff;font-size:27px;box-shadow:0 5px 18px #0003;cursor:pointer}
    #bio-chatbot .bio-chat-panel{display:none;position:absolute;bottom:74px;right:0;width:min(350px,calc(100vw - 28px));height:480px;max-height:calc(100vh - 110px);background:#fff;border:1px solid #d6e8d8;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px #0002;flex-direction:column}
    #bio-chatbot .bio-chat-panel.open{display:flex}
    #bio-chatbot .bio-chat-head{background:#1b5e20;color:white;padding:15px;display:flex;align-items:center;justify-content:space-between}
    #bio-chatbot .bio-chat-head strong{font-size:16px}
    #bio-chatbot .bio-chat-head small{display:block;margin-top:4px;opacity:.85}
    #bio-chatbot .bio-chat-close{background:transparent;border:0;color:white;font-size:24px;cursor:pointer}
    #bio-chatbot .bio-chat-messages{padding:13px;overflow-y:auto;flex:1;background:#f5fbf6}
    #bio-chatbot .bio-msg{padding:10px 12px;border-radius:14px;margin:0 0 10px;max-width:92%;font-size:14px;line-height:1.45;white-space:pre-wrap}
    #bio-chatbot .bio-msg.bot{background:white;border:1px solid #e1eee3;border-top-left-radius:4px}
    #bio-chatbot .bio-msg.user{background:#d8f2dc;margin-left:auto;border-top-right-radius:4px}
    #bio-chatbot .bio-chat-quick{display:flex;flex-wrap:wrap;gap:7px;padding:10px;border-top:1px solid #e6eee7;background:#fff}
    #bio-chatbot .bio-chat-quick button{border:1px solid #c8dfcc;background:#fff;color:#1b5e20;border-radius:18px;padding:8px 10px;font-size:12px;cursor:pointer}
    #bio-chatbot .bio-chat-quick button:hover{background:#eaf6ec}
    #bio-chatbot .bio-chat-footer{padding:9px 12px;background:#fff;border-top:1px solid #e6eee7;text-align:center;font-size:11px;color:#6c7b6e}
    @media(max-width:480px){#bio-chatbot{right:12px;bottom:12px}#bio-chatbot .bio-chat-panel{right:0;width:calc(100vw - 24px);height:min(500px,calc(100vh - 95px))}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "bio-chatbot";
  root.innerHTML = `
    <button class="bio-chat-open" aria-label="Abrir atendimento" title="Fale com o Bio sem Mistério">💬</button>
    <section class="bio-chat-panel" aria-label="Chat de atendimento">
      <header class="bio-chat-head"><div><strong>Bio sem Mistério 🌿</strong><small>Assistente virtual do site</small></div><button class="bio-chat-close" aria-label="Fechar">×</button></header>
      <div class="bio-chat-messages" aria-live="polite"></div>
      <div class="bio-chat-quick">
        <button data-topic="matricula">Matrícula</button><button data-topic="disciplinas">Disciplinas</button>
        <button data-topic="materiais">Materiais</button><button data-topic="aluno">Área do aluno</button>
        <button data-topic="professora">Falar com a professora</button>
      </div>
      <div class="bio-chat-footer">Assistente automático • Bio sem Mistério</div>
    </section>`;
  document.body.appendChild(root);

  const panel = root.querySelector(".bio-chat-panel");
  const messages = root.querySelector(".bio-chat-messages");
  const openBtn = root.querySelector(".bio-chat-open");
  const closeBtn = root.querySelector(".bio-chat-close");

  function addMessage(text, type) {
    const el = document.createElement("div");
    el.className = "bio-msg " + type;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
  function whatsapp(text) {
    if (!WHATSAPP_NUMBER) {
      addMessage("O WhatsApp da professora ainda está sendo configurado. Por enquanto, use a página Contato do site.", "bot");
      return;
    }
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
  }
  const answers = {
    matricula: "Para solicitar matrícula, acesse a página Matrícula no menu do site e preencha as informações. Se precisar de ajuda, fale com a professora.",
    disciplinas: "O Bio sem Mistério oferece conteúdos de Biologia, incluindo Genética, Botânica, Zoologia, Ecologia, Corpo Humano e Citologia. Consulte a página Disciplinas para ver os conteúdos.",
    materiais: "Os materiais de apoio e aulas publicados pela professora ficam disponíveis nas áreas de conteúdo do site. Acesse a página Disciplinas ou entre na Área do aluno para consultar o que foi publicado.",
    aluno: "Para acessar sua área, use o link Área do aluno no menu. Se você ainda não tem acesso ou esqueceu como entrar, entre em contato com a professora.",
    professora: "Vou encaminhar você para o atendimento da professora. Clique no botão de WhatsApp quando ele estiver configurado."
  };
  openBtn.addEventListener("click", () => { panel.classList.add("open"); openBtn.style.display = "none"; if (!messages.childElementCount) addMessage("Olá! 👋 Seja bem-vindo(a) ao Bio sem Mistério! Como posso ajudar? Escolha uma opção abaixo.", "bot"); });
  closeBtn.addEventListener("click", () => { panel.classList.remove("open"); openBtn.style.display = ""; });
  root.querySelectorAll("[data-topic]").forEach(button => button.addEventListener("click", () => {
    const topic = button.getAttribute("data-topic");
    addMessage(button.textContent, "user");
    if (topic === "professora") { addMessage(answers[topic], "bot"); whatsapp("Olá, professora! Acessei o Bio sem Mistério e gostaria de atendimento."); return; }
    addMessage(answers[topic] || "Não encontrei essa informação. Entre em contato com a professora para confirmar.", "bot");
  }));
})();