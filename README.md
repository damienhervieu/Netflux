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
Ouvrir un terminal et entrer les commandes suivantes:
```
npm install --global npm
```

## Yarn

### Installer Yarn
Ouvrir un invité de commande (Windows + R et tappez "cmd") et entrez la commande suivante:
```
npm install -g yarn
```



## Installer le projet

### Lancer une installation npm
Pour installer proprement le projet et rétablir toutes les dépendances, ouvrez un terminal et entrez la commande suivante:
```
npm install
cd client
npm install
cd ../
```

### Ensuite, lancer une installation yarn
Pour vérifier les dépendances du projet et fonctionner avec les versions exactes du développement de l'application, ouvrez un terminal et entrez la commande suivante:
```
yarn install
yarn install --check-files
```