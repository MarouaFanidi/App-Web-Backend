import { Console } from "console";
// import { Deplacement } from "./entity/Deplacement";
// import { Memo } from "./entity/Memo";

const express = require('express');
const { AppDataSource } = require('./data-source'); // Assurez-vous que le chemin est correct
const { User } = require('./entity/User'); // Assurez-vous que le chemin est correct
const { Memo } = require('./entity/Memo'); // Assurez-vous que le chemin est correct
const { Deplacement } = require('./entity/Deplacement');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



// Connexion à la base de données
AppDataSource.initialize()
  .then(() => {
    console.log('Base de données connectée');
  })
  .catch(error => console.log(error));

// Route d'inscription
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = hashedPassword;
  
  console.log(user);
  

  await AppDataSource.getRepository(User).save(user);

  res.send({ message: 'Inscription réussie' });
});

// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await AppDataSource.getRepository(User).findOneBy({ email });
 console.log(user)
  if (!user) {
    console.log('Utilisateur non trouvé'); // Pour déboguer
    return res.status(404).send({ message: 'Utilisateur non trouvé' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    console.log('Mot de passe incorrect'); // Pour déboguer
    return res.status(400).send({ message: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

  res.send({ message: 'Connexion réussie', token });
});



// Route pour créer un document
app.post('/documents', async (req, res) => {
  const {id_memo, date, objet, nom, prenom, dureeStage, debutStage, finStage, sujetStage } = req.body;
  console.log('reqbody', req.body)
  console.log('Requête reçue pour création de document');
  console.log(res);

    // Créer une nouvelle instance de Document
    try {
    const document = new Memo();
    document.id_memo = id_memo; 
    console.log('id', id_memo)
    document.date = date;
    document.objet = objet;
    document.nom = nom;
    document.prenom = prenom;
    document.dureeStage = dureeStage;
    document.debutStage = debutStage;
    document.finStage = finStage;
    document.sujetStage = sujetStage;
    console.log(document)
    // Sauvegarder dans la base de données
    const savedDocument = await AppDataSource.getRepository(Memo).save(document);
    console.log('Document créé avec ID:', savedDocument.id_memo);
    // Réponse en cas de succès
    res.status(201).send({ 
      message: 'Document créé avec succès',
      id_memo: savedDocument.id_memo // Ajoutez l'id du document ici
     });
  } catch (error) {
    console.error('Erreur lors de la création du document', error);
    res.status(500).send({ message: 'Erreur lors de la création du document' });
  }
});


// Route pour récupérer un document par son id
app.get('/documents/:id_memo', async (req, res) => {
  const { id_memo } = req.params;

  console.log('id_memo', id_memo);

  try {
    const document = await AppDataSource.getRepository(Memo).findOneBy({id_memo});

    if (!document) {
      return res.status(404).send({ message: 'Document non trouvé' });
    }

    res.status(200).send(document); // Retourne le document trouvé
  } catch (error) {
    console.error('Erreur lors de la récupération du document', error);
    res.status(500).send({ message: 'Erreur lors de la récupération du document' });
  }
});




// Route pour créer un déplacement
app.post('/deplacements', async (req, res) => {
  const { origine, date, destinataires, objet, noteInterne, objetMission, justificationDemande, listeInvites, justification, filialePriseEnCharge } = req.body;
  console.log('Requête reçue pour création de déplacement');
  console.log('Corps de la requête:', req.body);

  try {
    // Créer une nouvelle instance de Deplacement
    const deplacement = new Deplacement();

    // deplacement.id_deplacement = id_deplacement; 
    // console.log('id', id_deplacement)

    deplacement.origine = origine;
    deplacement.date = date;
    deplacement.destinataires = destinataires;
    deplacement.objet = objet;
    deplacement.noteInterne = noteInterne;
    deplacement.objetMission = objetMission;
    deplacement.justificationDemande = justificationDemande;
    deplacement.listeInvites = listeInvites;
    deplacement.justification = justification;
    deplacement.filialePriseEnCharge = filialePriseEnCharge;

    // Sauvegarder dans la base de données
    await AppDataSource.getRepository(Deplacement).save(deplacement);
    // console.log('Déplacement créé avec ID:', savedDeplacement.id_deplacement);

    // Réponse en cas de succès
    res.status(201).send({ 
      message: 'Déplacement créé avec succès'
      // id_deplacement: savedDeplacement.id_deplacement  // Retourne l'ID du déplacement
    });
  } catch (error) {
    console.error('Erreur lors de la création du déplacement:', error);
    res.status(500).send({ message: 'Erreur lors de la création du déplacement' });
  }
});


// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000');
});
