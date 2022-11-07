import { createStore } from 'vuex';

export default createStore({
	state: {
		questions: [
			{
				question: 'De Steven: Qui a casser le plafond du lucumus ? ',
				propositions: ['alexis', 'valentin', 'Les deux'],
				solution: 'Les deux',
			},
			{
				question: 'De Théo: A qui appartien la victoire ?',
				propositions: ['A lui', 'A moi', 'A eux'],
				solution: 'A moi',
			},
			{
				question: "De Benjamin: Quest-ce qu'un stéréotype ?",
				propositions: [
					'Une idée pré-conçue',
					"Une syntaxe UML permettant d'ajouter de la sémantique à la modélisation des classes",
					'Les deux',
				],
				solution: 'Les deux',
			},
			{
				question:
					'Parmi ces persos, lequel n’apparaît pas dans TOUS les films Harry Potter :',
				propositions: [
					'Minerva McGonagall',
					'Gregory Goyle',
					'Albus Dumbledore',
					'Severus Rogue',
				],
				solution: 'Minerva McGonagall',
			},
			{
				question: 'De Alexis: De quelle couleur est le T-shirt ?',
				propositions: ['Bleu', 'Jaune', 'Vert', 'Rouge'],
				solution: 'Jaune',
			},
			{
				question:
					'De Alan: Qui es ton pote qui roule les meilleurs galoche ?',
				propositions: ['Steven', 'Valentin Moulin', 'Goran', 'Anal'],
				solution: 'Anal',
			},
			{
				question:
					"De Valentin Belin: Quelle est le meilleur moyen de combattre l'anorexie:",
				propositions: [
					"Boire de l'alcoule",
					'Allez à la salle et se DESTROY les bras et bouffer comme si ta vie en dépendait',
					'Chiller devant des émission genre les 50',
					'Manger pour 98€ de McDo',
				],
				solution:
					'Allez à la salle et se DESTROY les bras et bouffer comme si ta vie en dépendait',
			},
			{
				question:
					"De Emilie: Qu'elle est la tâche que j'aime le moins faire ? ",
				propositions: [
					'La vaisselle',
					'Le linge',
					"L'aspirateur",
					'Te parler',
				],
				solution: 'La vaisselle',
			},
			{
				question:
					'De Angela: Quel film avait-on pour projet de regarder en attendant 6h du matin un soir de Lucumus-confinement, avec Alexis sur le canapé de Steven ?',
				propositions: [
					'Seven',
					'Gladiator',
					'Inception',
					'Shutter Island',
				],
				solution: 'Inception',
			},
			{
				question:
					'De (Anonyme):Qui es le pire individu que cette terre ai connue ?',
				propositions: [
					'Alexis',
					'Alexis',
					'Alexis',
					'Alexis',
					'Alexis',
				],
				solution: 'Alexis',
			},
			{
				question: 'Que veux dire AGAN ?',
				propositions: [
					'Allez gros, abuse non ?',
					'Anti girafe aux Népal',
					'Allergie gigantesque à Nintendo',
					'Impossible de le dire en public sous peine de Thread twitter',
				],
				solution:
					'Impossible de le dire en public sous peine de Thread twitter',
			},
			{
				question:
					'Les erreur que tu as commis serons ton nombres de gorgée, vas-tu assumé ?',
				propositions: [
					'Oui car houk-houk je suis un bonhome',
					'Non car Ouin-ouin je suis un deserteur',
					"J'hésite car j'ai étais très nul",
					'香蕉',
				],
				solution: 'Oui car houk-houk je suis un bonhome',
			},
		],
		questionss: [
			{
				question: 'Quel animal est l’emblème du club de foot le PSG ?',
				propositions: ['Un lynx', 'Un chien', 'Un cerf', 'Un renard'],
				solution: 'Un lynx',
			},
			{
				question:
					'Lequel de ces joueurs a marqué le plus de buts en Équipe de France ?',
				propositions: [
					'Zinédine Zidane',
					'Thierry Henry',
					'Michel Platini',
					'Just Fontaine',
				],
				solution: 'Thierry Henry',
			},
			{
				question:
					'Dans quelle ville peut-on voir le Stade Pierre-Mauroy ?',
				propositions: ['Marseille', 'Lyon', 'Grenoble', 'Lille'],
				solution: 'Lille',
			},
			{
				question:
					'Qui est le fondateur de l’Olympique de Marseille en 1899 ?',
				propositions: [
					'René Dufaure de Montmirail',
					'Édouard Crut',
					'Paul Le Cesne',
					'Camille Montade',
				],
				solution: 'René Dufaure de Montmirail',
			},
			{
				question: 'Quelle est la nationalité de Lionel Messi ?',
				propositions: [
					'Uruguayen',
					'Chilien',
					'Argentin',
					'Argentin et Chilien',
				],
				solution: 'Argentin',
			},
			{
				question:
					"A l'euro 2016, quel joueur français s'est présenté avec un coq blanc dessiné sur le côté droit de la tête ?",
				propositions: [
					'Paul Pogba',
					'Kingsley Coman',
					'Bacary Sagna',
					'Dimitri Payet',
				],
				solution: 'Paul Pogba',
			},
			{
				question:
					"Quel meilleur gardien de l'année 2015 a boycotté les votes du Ballon d'or ?",
				propositions: [
					'Manuel Neuer',
					'Iker Casillas',
					'Oliver Kahn',
					'Gianluigi Buffon',
				],
				solution: 'Gianluigi Buffon',
			},
			{
				question:
					'Combien de temps a-t-il fallu à Alexandre Pato pour marquer contre Barcelone en 2011 ?',
				propositions: [
					'4 secondes',
					'24 secondes',
					'51 secondes',
					'78 secondes',
				],
				solution: '24 secondes',
			},
			{
				question:
					'Quels frères se sont fait face en finale de League Cup 2016 ?',
				propositions: ['Touré', 'Cissé', 'Pardo', 'Koutris'],
				solution: 'Touré',
			},
			{
				question:
					"Lequel de ces pays n'a pas remporté la Coupe d'Afrique des nations entre 2010 et 2020 ?",
				propositions: [
					"Côte d'Ivoire",
					'Nigéria',
					'Algérie',
					'Afrique du Sud',
				],
				solution: 'Afrique du Sud',
			},
			{
				question:
					'Laquelle de ces entreprises est réputée pour leur pronostics sportifs miteux ?',
				propositions: [
					'Gedimat',
					'Brico Dépôt',
					'Point.P',
					'Chausson Matériaux',
				],
				solution: 'Chausson Matériaux',
			},
		],
	},
	getters: {},
	mutations: {},
	actions: {},
	modules: {},
});
