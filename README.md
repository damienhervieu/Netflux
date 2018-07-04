# Netflux
Projet consistant à créer un système de vidéo à la demande sur la même lignée que Netflix, Amazon Prime etc.


## Installation et mise à jour de Node.js et npm

## Node.js

### Mettre à jour node.js sur Windows
Se rendre sur le site de node à la page https://nodejs.org/en/download/, télécharger le fichier msi et l'ouvrir.
Suivre les instructions.
Si l'installation se termine prématurément, empêcher l'installation d'EWT dans le premier menu déroulant.

### Mettre à jour node.js sur Mac
Installer Homebrew (nécessaire dans un environnement de développement):
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Procéder aux commandes ci dessous dans votre terminal:
```
brew update
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
Ouvrir un terminal et entrer la commande suivantes:
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

Ensuite éxécutez le fichier ./server/bdd/fichier d_netflux.sql dans votre base de données

## Lancer le projet
Pour lancer la partie React, ouvrez un terminal et entrez la commande suivante:

```
yarn client
```

Pour lancer la partie serveur, ouvrez un terminal et entrez la commande suivante:

```
yarn server
```

/!\ Cette partie n'est actuellement pas fonctionnel, cette commande lancera séparement le React et le serveur node mais sans aucun lien entre eux /!\
Pour lancer le projet, ouvrez un terminal et entrez la commande suivante:

```
yarn dev
```

/!\ Cette partie n'est actuellement pas fonctionnel, cette commande lancera séparement le React et le serveur node mais sans aucun lien entre eux /!\

## Mode d'emploi

### Partie serveur
    Connecte
### Partie React