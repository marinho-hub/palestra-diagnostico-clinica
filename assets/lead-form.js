(function () {
  var SUPABASE_URL = "https://qdgpsgfivrbxqoopowkg.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZ3BzZ2ZpdnJieHFvb3Bvd2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NjA2MTksImV4cCI6MjA3ODIzNjYxOX0.d2TkZGu66N0FkFLUyxVKUJbG-k8k2CGH80YmsfRaJfw";

  var form = document.getElementById("leadForm");
  var btn = document.getElementById("submitBtn");
  var errorBox = document.getElementById("formError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.style.display = "none";

    var nome = document.getElementById("nome").value.trim();
    var whatsapp = document.getElementById("whatsapp").value.trim();
    var instagram = document.getElementById("instagram").value.trim();
    var dor = document.getElementById("dor").value;

    if (!nome || !whatsapp || !instagram || !dor) {
      errorBox.style.display = "block";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando...";

    fetch(SUPABASE_URL + "/rest/v1/landing_leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        nome: nome,
        whatsapp: whatsapp,
        instagram: instagram.startsWith("@") ? instagram : "@" + instagram,
        dor_principal: dor,
        origem: "palestra-segunda",
        user_agent: navigator.userAgent
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Falha ao enviar (" + res.status + ")");
        try {
          sessionStorage.setItem("lead_nome", nome);
        } catch (e) {}
        window.location.href = "obrigado.html";
      })
      .catch(function (err) {
        console.error(err);
        errorBox.style.display = "block";
        btn.disabled = false;
        btn.textContent = "Quero meu presente e minha vaga";
      });
  });
})();
