document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('registerButton').addEventListener('click', function() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            showMessage('Ce nom d\'utilisateur est déjà pris.');
        } else {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            showMessage('Inscription réussie! Vous pouvez maintenant vous connecter.');
            document.getElementById('showLogin').click();
        }
    }
});

document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] && users[username] === password) {
        showMessage('Connexion réussie! Bienvenue, ' + username + '!');
    } else {
        showMessage('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});

function showMessage(msg) {
    document.getElementById('message').innerText = msg;
    setTimeout(() => {
        document.getElementById('message').innerText = '';
    }, 3000);
}