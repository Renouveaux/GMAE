# Gestion des Matelas Anti-Escarres (GMAE)

## Sommaire

- [Vue d'ensemble](#overview)
- [Liste des outils applicatifs utilisés](#tools)
- [Compatibilité](#compatibility)
	* [Liste des navigateurs compatible](#browser)
- [Prérequis](#prerequisite)
	* [NODE](#node)
	* [mongoDB](#mongoDB)
- [Installation](#install)
- [Avancement du projet](#progress)
- [Structure de l'application](#structure)
- [Informations](#information)
- [Bugs Connu](#bug)
- <a href="CHANGELOG.md">Change Log</a>


## <a id="overview"></a>Vue d'ensemble

La GMAE a pour but de simplifier la gestion, le suivi, les demandes et la sortie de statistiques sur l'utilisation des matelas anti escarre géré par le service Magasin.
Il s'agit ici d'une application web portée sur les dernières technologies actuelles.

## <a id="tools"></a>Liste des outils applicatifs utilisés

- Angular Js    : Framework Javascript
- BootStrap v3  : Framework HTML, CSS et JS
- FontAwesome   : Iconic Font
- GlyphIcons    : Librairie d'icones
- Modernizr     : Bibliothèque JS de détection des fonctionnalités HTML et CSS
- NodeJS		: Serveur node pour la prise en charge de l'api + socketIO


## <a id="compatibility"></a>Compatibilité

### <a id="browser"></a>Liste des navigateurs compatible

- Chrome
- Firefox 

## <a id="prerequisite"></a>Prérequis

### <a id="node"></a>NODE

- Requière la dernière version de nodeJS

### <a id="mongoDB"></a>MongoDB

- Version 2.6+ de mongoDB serveur pour la base de donnée


## <a id="install"></a>Installation

To Do


## <a id="progress"></a>Avancement du projet

- [x] Définition du projet : 					100 %
- [x] Recherche et utilisation du design : 		100 %
- [x] Structure du site Front End : 			100 %
- [ ] Intégration des éléments Front End : 		80 %
- [x] Création serveur REST pour API : 			100 %
- [x] Ajout des promesses de requêtes :			100 %

## <a id="structure"></a>Structure de l'application

- api/
	* routes/
	* vendors/
	* index.php
- assets/
	* components/
	* images/
	* css/
- js/
	* angular/
	* controllers/
		+ manage/
	* directives/
	* require/
	* services/
	* app.js
	* main.js
- partials/
	* directives/
	* manage/
	* modals/
- .htaccess
- index.html
- readme.html


## <a id="information"></a>Informations

[AngularJS](https://angularjs.org)
[Twitter BootStrap](http://getbootstrap.com/)