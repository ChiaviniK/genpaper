/* --- script.js --- */

// Função de redirecionamento para login
function goToLogin() {
    alert("Redirecionando para GenSys (Sistema Corporativo)...");
    // Futuramente: window.location.href = "login.html";
}

// Log para debug (útil para mostrar o console aos alunos)
console.log("GenPaper Landing Page Carregada com Sucesso.");
console.log("Versão da Aplicação: 1.0.4");

// --- FUNÇÃO DE MENU RETRÁTIL ---
function toggleMenu() {
    const sidebar = document.getElementById('mySidebar');
    const main = document.getElementById('mainContent');
    const userInfo = document.getElementById('userInfoBox');

    // Alterna a classe 'closed' nos elementos
    sidebar.classList.toggle('closed');
    main.classList.toggle('closed');
    
    // Pequeno truque para a info do usuário não "piscar" feio
    if (sidebar.classList.contains('closed')) {
        // Se fechou, esconde info
        userInfo.style.display = 'none';
    } else {
        // Se abriu, mostra info com um pequeno delay para a animação
        setTimeout(() => userInfo.style.display = 'block', 200);
    }
}