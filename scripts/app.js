// Vérifie si l'utilisateur est déjà connecté
function checkLoginStatus() {
  const loggedIn = localStorage.getItem("loggedIn");
  const guestSession = sessionStorage.getItem("guestSession");

  if (loggedIn || guestSession) {
      window.location.href = "home.html"; // Redirection vers la page d'accueil si déjà connecté
  }
}

// Connexion en tant qu'invité
function guestLogin() {
  sessionStorage.setItem("guestSession", "true"); // Crée une session temporaire
  window.location.href = "home.html"; // Redirige vers la page d'accueil
}

// Enregistre les identifiants et redirige vers la page d'accueil
async function register() {
  const name = document.getElementById("register-name").value;
  const username = document.getElementById("register-username").value;
  const contact = document.getElementById("register-contact").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;
  const errorDiv = document.getElementById("register-error");

  errorDiv.textContent = "";

  if (name.length < 2 || name.length > 16) {
      errorDiv.textContent = "Le nom doit comporter entre 2 et 16 caractères.";
      return;
  }
  if (username.length < 2 || username.length > 16) {
      errorDiv.textContent = "Le nom d'utilisateur doit comporter entre 2 et 16 caractères.";
      return;
  }
  if (password !== confirmPassword) {
      errorDiv.textContent = "Les mots de passe ne correspondent pas.";
      return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  localStorage.setItem("loggedIn", true);

  window.location.href = "home.html";
}

// Connexion de l'utilisateur
async function login() {
  const identifier = document.getElementById("login-identifier").value;
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");

  errorDiv.textContent = "";

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if ((identifier === storedUsername || identifier === localStorage.getItem("contact")) && password === storedPassword) {
      localStorage.setItem("loggedIn", true);
      window.location.href = "home.html";
  } else {
      errorDiv.textContent = "Identifiant ou mot de passe incorrect.";
  }
}

// Déconnexion de l'utilisateur
function logout() {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("guestSession");
  window.location.href = "index.html";
}

// Vérifie la sécurité du mot de passe
function checkPasswordStrength() {
  const password = document.getElementById("register-password").value;
  const strengthIndicator = document.getElementById("strength-indicator");

  if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
      strengthIndicator.className = 'strength-strong';
  } else if (password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
      strengthIndicator.className = 'strength-medium';
  } else {
      strengthIndicator.className = 'strength-weak';
  }
}

// Toggle entre connexion et inscription
function toggleForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  
  loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
  registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
}

// Naviguer vers différentes sections
function navigateTo(page) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<div class="custom-loader"></div>'; // Afficher le loader pendant le chargement

  // Utiliser fetch pour charger le contenu de la page
  fetch(page)
      .then(response => {
          if (!response.ok) {
              throw new Error('Erreur de chargement de la page');
          }
          return response.text();
      })
      .then(html => {
          contentDiv.innerHTML = html; // Remplacer le contenu par celui chargé
      })
      .catch(error => {
          console.error('Erreur:', error);
          contentDiv.innerHTML = '<p>Erreur de chargement du contenu.</p>'; // Afficher un message d'erreur
      });
}

// Ouvrir les paramètres
function openSettings() {
  alert("Ouverture des paramètres...");
  // Ajouter des paramètres spécifiques ici
}

// Recharger la page
function reloadPage() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '<p>Rechargement...</p>'; // Afficher un message de rechargement
  setTimeout(() => {
      location.reload(); // Recharge la page
  }, 1000); // Délai d'une seconde pour simuler l'animation
}

// Changer la langue de l'application
function changeLanguage() {
  const selectedLanguage = document.getElementById("language").value;
  alert(`Langue changée en : ${selectedLanguage}`);
  // Ajouter ici la logique de traduction si nécessaire
}

// Ajoutez des écouteurs d'événements aux boutons pour la navigation
document.getElementById("home-button").addEventListener("click", () => navigateTo("home.html"));
document.getElementById("settings-button").addEventListener("click", openSettings);
document.getElementById("logout-button").addEventListener("click", logout);

// Fonction pour naviguer vers différentes pages
function navigateTo(page) {
  window.location.href = page; // Redirection vers la page spécifiée
}

// Fonction pour recharger la page
function reloadPage() {
  window.location.reload(); // Recharge la page actuelle
}

function openModal(newsId) {
  const modal = document.getElementById('newsModal');
  const title = document.getElementById('modal-title');
  const description = document.getElementById('modal-description');
}
