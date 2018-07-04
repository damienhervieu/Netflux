# Netflux
Projet consistant à créer un système de vidéo à la demande sur la même lignée que Netflix, Amazon Video Prime etc.


## Installation et mise à jour de Node.js et npm

## Node.js

### Mettre à jour node.js sur Windows
Se rendre sur le site de node à la page https://nodejs.org/en/download/, télécharger le fichier msi et l'ouvrir.
Suivre les instructions.
Si l'installation se termine prématurément, empêcher l'installation d'EWT dans le premier menu déroulant.

### Installer et mettre à jour node.js sur Mac
Installer Homebrew (nécessaire dans un environnement de développement):
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Procéder aux commandes ci dessous dans votre terminal:
```
brew update
brew install node
brew upgrade node
```

### Mettre à jour node.js sur Linux
Ouvrir un terminal et entrer les commandes ci-dessous:
```
sudo apt-get update
sudo npm install -g n
sudo n latest
```

## NPM

### Mettre à jour npm
Ouvrir un terminal et entrer la commande suivante:
```
npm install --global npm
```

## Yarn

### Installer Yarn
Ouvrir un terminal et entrez la commande suivante:
```
npm install -g yarn
```



## Installer le projet

### Lancer une installation npm
Pour installer proprement le projet et rétablir toutes les dépendances, ouvrez un terminal et entrez la commande suivante:
```
npm install
```

### Ensuite, lancer une installation yarn
Pour vérifier les dépendances du projet et fonctionner avec les versions exactes du développement de l'application, ouvrez un terminal et entrez la commande suivante:
```
yarn install
yarn install --check-files
```

### Créer la base de données
Pour utiliser cette application, une base de données mysql doit être accesible depuis le serveur, la bdd doit se nommer d_netflux. Si vous voulez le nommer différemment, remplacez 'd_netflux' dans les fichier ./server/routes/user.js et ./server/routes/main.js par le nom voulu.

Ensuite exécutez le fichier ./server/bdd/fichier d_netflux.sql dans votre base de données

## Lancer le projet
Pour lancer la partie React, ouvrez un terminal et entrez la commande suivante:

```
yarn client
```

Pour lancer la partie serveur, ouvrez un terminal et entrez la commande suivante:

```
yarn server
```

__/!\ Cette partie n'est actuellement pas fonctionnel, cette commande lancera séparement le React et le serveur node mais sans aucun lien entre eux__

Pour lancer le projet, ouvrez un terminal et entrez la commande suivante:

```
yarn dev
```

__/!\ Cette partie n'est actuellement pas fonctionnel, cette commande lancera séparement le React et le serveur node mais sans aucun lien entre eux__

## Mode d'emploi

### Partie serveur

#### Identification
Une fois la partie serveur lancée, ouvrez votre navigateur à l'adresse http://localhost:3000/login ou http://localhost:3000

Le serveur possède un utilisateur de type administrateur par défaut avec les identifiants : 

user: root@root.com

password: root

Toutefois vous pouvez créer un nouveau compte en cliquant sur "Sign Up Here".

#### Manage Users
L'onglet Manage Users permet de modifier ou supprimer les utilisateurs présents dans la base à l'aide des liens Modify et Delete à côté de chaque utilisateur.
Le bouton Modify renvoie sur un formulaire pour modifier l'utilisateur choisi.

#### Télécharger une vidéo sur le serveur
L'onglet Upload a video permet de télécharger une video sur le serveur et de rentrer ces informations dans la base de données pour pouvoir être accesible depuis le site.
L'onglet Upload vous renvoie sur un formulaire à remplir comprenant un titre, un author, une categorie à sélectionner parmi une liste et deux fichiers à choisir. La thumbnail doit être une image sous format .jpg, .png ou .jpeg tandis que la vidéo n'accepte que des vidéos sous format .mp4.

Une fois ces éléments renseigné, appuyer sur le bouton go! et vous serez redirigé vers la page home

Le fichier thumbnail sera enregistré dans ./server/ressources/thumbnail.

Le fichier vidéo sera enregistré dans ./server/ressources/video.

De plus un champ sera renseigné dans la table média qui comprendra tout ces éléments ainsi que le chemin absolue des différents fichiers.

#### Voir une video
La route http://localhost:3000/video permet de visionner une video sur un lecteur html. Présentement la vidéo est fixe par faute de temps impliqué dans le projet.

#### Routes
Les routes sont concentrés dans le fichier app.js par soucis de lisibilité. Nous avons donc créé nos propres middleware gérant les routes dans les fichiers contenus dans les dossier routes. 
Toutes les fonctions sollicitant la manipulation d'utilisateurs se trouvent dans le fichier user.js.
Pour les requêtes menant à la homepage
***
Toutes les requêtes de page passées avec la méthode GET renvoient un template ejs propre à la page nécessaire. A l'exception de la méthode GET userManagement qui exécute une requête à la base de données pour récupérer tous les utilisateurs et pouvoir les afficher sur le template renvoyé.
***
La méthode POST de register vérifie les valeurs entrées dans les champs password et passwordConfirm. Lorsque les deux valeurs sont identiques, nous procédons au hashage du mot de passe utilisateur avec bcrypt afin de ne pas le stocker en clair sur la base de données. Une fois le mot de passe hashé, les informations de l'utilisateur sont entrées dans la base de données. Si les mots de passe ne sont pas identiques lorsque l'utilisateur entre ses informations dans le formulaire, il est redirigé vers le même formulaire avec un message d'erreur correspondant à l'erreur occasionnée.
***
La méthode POST de login effectue une verification des entrées utilisateur par rapport aux données entrées dans la BDD. Le mot de passe récupéré est déchiffrée par bcrypt et verifié avec la valeur du formulaire de connexion. Si les mots de passe concordent, l'utilisateur est redirigé vers la page d'accueil et une session ainsi que des variables de session lui sont attribuées. Il ne pourra pas retourner sur la page de connexion. Si les mots de passe ne correspondent pas ou que l'email n'apparait pas dans la BDD, il est amené à nouveau sur le formulaire de connexion lui indiquant quelle erreur a été commise.
***
Les méthodes POST de modify et delete fonctionnent presque de manière similaire, à l'exception que modify contient un formulaire pour changer les attributs d'un utilisateur alors que delete ne contient que deux bouton nécessaire à la confirmation de supression. Les deux méthodes récupèrent l'utilisateur en prenant l'id passé par la route (certes cela ne correspond pas à des conditions d'utilisation normales, mais nous avons opté pour la manière la plus rapide à nos yeux) par une requête SQL. La méthode modify récupère les champs du formulaire et les attribue dans un tableau que l'on passe à la requête pour procéder à l'UPDATE. Concernant la méthode delete on applique directement la requête SQL delete vu que le bouton "No" de la page redirige directement l'utilisateur à la page de management d'utilisateur.

### Partie React

L'interface utilisateur fonctionne comme toutes celle qu'on peut trouver sur d'autres sites de ce genre.
Un formulaire de connexion et d'inscription sont accessibles dans le menu.
Une fois l'utilisateur identifié, il a accès au différentes catégories de film.
