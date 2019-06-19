# Jeu-de-mots

[![Build Status](https://travis-ci.com/raphael-hascoet/Jeu-de-mots.png)](https://travis-ci.com/raphael-hascoet/Jeu-de-mots)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=Jeu-de-mots&metric=alert_status)](https://sonarcloud.io/dashboard?id=Jeu-de-mots)

:books: Projet Semestre 2 FILA1

**NB** : Pour exécuter les commandes sur environnements windows il est conseillé de passer par un terminal style unix tel **git bash**

## Dépendences

-   **Node.js et npm** :

    https://nodejs.org/en/

    Par défaut npm est installé avec Node.js.

    Pour vérifier que Node.js et npm sont bien installés, exécuter `node -v` et `npm -v` dans le terminal, la version des modules doit s'afficher.

-   **Angular** :

    Exécuter `npm install -g @angular/cli`

## Lancement du projet Angular (Client de l'application)

Afin d'installer les dépendences npm du projet,
se placer dans le dossier de l'application et exécuter `npm install`

Après l'installation, l'application solo peut être lancée avec la commande `npm run solo`

## Développement

Le serveur nécéssite des variables d'environnement. Pour les lui fournir, il faut créer un fichier `.env` dans le dossier `server/` et le remplir avec le code suivant :

```
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:4200
```

Pour lancer le serveur en mode développement, aller dans le dossier `server/` et exécuter `npm run watch`

Enfin **Lancer le serveur de l'application** : Dans le terminal, aller dans le dossier de l'application et executer `ng serve --host <ip local>`, pour accéder à l'application il faut, depuis un navigateur, requêter l'adresse donnée au port 4200 (ex: 192.168.0.2:4200)

## Liens utils

**KanbanFlow** : https://kanbanflow.com/board/sL8RYT

**Tutoriel Angular** : https://angular.io/guide/quickstart
**Liste des composants material Angular** : https://material.angular.io/components/categories

**Tutoriel socket.io** : https://socket.io/get-started/chat/?fbclid=IwAR0dng-HjPJqIdVcrmOpu3eDv0VaOHvA88C4gHwVw-h5Tkcs--NlXEVEWnw
**Utilisation des socket avec angular** : https://alligator.io/angular/socket-io/?fbclid=IwAR0pZP9JD5oRopRzUoOavYPeemBoeRkhQFJQanK9tfUe07tlAeruz34JOVo
