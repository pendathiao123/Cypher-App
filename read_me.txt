-------------------Etapes à suivre pour bien exécuter l'application-------------------

Cette application a été conçu avec SpringBoot pour le code métier et Angular pour la partie front.
Pour exécuter le jar procédez ainsi:

	- Assurez vous d'avoir Java 17 installé sur votre machine.
	- Créer un utilisateur "penda" avec mot de passe "pqsser" dans votre postgres, donnez lui les privilèges.
	- Créer uniquement une base de donnée "penda" dans votre postgres, l'application se chargera de creer les
		tables utilisées.
	- ouvrez un terminal(cmd) au niveau du dossier.
	- exécutez le jar en utilisant la commande "java -jar backend-0.0.1-SNAPSHOT.jar"
	-Rendez vous sur votre navigateur  au "localhost:8080"
	- Connecter vous à l'application en utilisant l'utilisateur "demba" avec mot de passe "passer" (l'application a crée une table Utilisateur et a initiliser l'utilisateur demba).
	- Aprés connexion vous pourrez tester les fonctionnalités de l'application (genereration de clés, chiffrement, signature).
	- Pour le teste regardez au niveau de votre disque local C:, un dossier "Penda-Thiao_ExamenCryptoJava" a été 
	crée , mettez du contenu dans message.txt et commencer à tester.
	NB: -les clés générés se trouvent dans le sous-dossier "keys".
	    - Testez ausssi avec le provider SunJCE car BC ne fonctionnement pas avec le jar j'ai essayé de le réglé mais en vain, peut etre si vous avez une solution(il me parle de problème de signature).