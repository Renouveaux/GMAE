# Change Log
Tous les changements notable pour ce projet sont documentés dans ce fichier.

### [2.1.4] - 2016-08-18
#### Update
 - #History : Ajout d'un système de trie plus possibilité de filtrage sur un type de moteur

### [2.1.3] - 2016-06-30
#### Update
 - #manage : Les informations présentes sur la page "manage" sur le nombre de moteurs et de housses, dispo en panne etc... sont maintenant en temps réel.

### [2.1.2] - 2016-06-30



### [2.1.1] - 2016-06-29
#### Changed
 - Mise à jour de la version bootstrap. Meilleur réactivité de l'UI
 - Ajout pour l'admin, de la possibilité d'ajouter d'anciennent demande non présente sur l'appli

#### Fixed
 - Correction d'affichage des modals.

#### Information
 - Cette mise à jour est en versio beta. Le passage vers bootstrap 3.3.6 risque de perturber le fonctionnement de l'application pour certains utilisateurs.


### [2.0.5] - 2016-06-22
#### Changed
 - Ajout du filtre global sur le tableau Historique
 - Ajout de la possibilité d'editer la date de retour dans le tableau Historique
 - Modification du système d'affichage des moteurs sur la page d'accueil
 - Ajout de la date de sortie du patient quand matelas loué

#### Fixed
 - Grosse correction sur la mise à jour des dates de demande de retour et de reprise du materiel (dateEnd et RecoveryAsk)
 - Correction sur le système d'envoie de données entre le client et l'API 


### [2.0.3] - 2016-06-19
#### Changed
 - Lors des demandes de reprise, garde en mémoire le service choisit par l'utilisateur et rafraichit la liste en conséquence. (Public)
 - Modification du système d'alert, utilisation de sweetAlert
 
#### Fixed
 - Suppression total de tous le formulaire après la soumission de ce dernier (public)




### [2.0.2] - 2015-11-24
#### Changed
- Ajout de la possibilité d'annulation des demandes par les cadres si celles-ci ne sont pas traités
- Modification de la selection du type de matelas côté administration
- Mise à jour du système d'emission d'évenement pour le rafraichissement des pages
- Modification du systeme de notification d'évenement, se trouve plus haut sur la page.

#### Added
- Ajout d'un lien vers ce fichier dans le footer

#### Fixed
- Correction d'un bug dans l'affichage du menu

### [2.0.1] - 2015-06-22
#### Changed
- Modification complète du moteur de gestion des templates et du routeur.

#### Fixed
- Stabilisation de l'application
- Ajout de petites fonctionnalités d'affichages


### [1.3.8]
#### Fixed
- Correction de bug d'affichage et de refresh de page


### [1.3.7]
#### Changed
- Intégration de l'application au sein de l'établissement pour essaies