const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(express.json()); // Pour traiter les données JSON

// Middleware pour servir des fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../pages'))); // Assurez-vous que le chemin est correct

// Route pour le fichier forum.json
app.post('/server/base/forum.json', async (req, res) => {
    try {
        // Récupérer les sujets à partir de la requête
        const topics = req.body;

        // Crypter les contenus des sujets
        const encryptedTopics = await Promise.all(topics.map(async topic => {
            const hashedContent = await bcrypt.hash(topic.content, 10); // 10 = le nombre de salage
            return { ...topic, content: hashedContent };
        }));

        // Enregistrer les sujets cryptés dans le fichier JSON
        fs.writeFileSync(path.join(__dirname, 'base', 'forum.json'), JSON.stringify(encryptedTopics, null, 2));
        res.status(200).json({ message: 'Sujets sauvegardés avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des sujets:', error);
        res.status(500).json({ message: 'Erreur lors de la sauvegarde.' });
    }
});

// Route pour servir le fichier HTML principal (forum.html)
app.get('/forums', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/forums.html')); // Assurez-vous que le chemin est correct
});

// Autres configurations et démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
