<template>
  <div class="quizz" id="quizz">
    <div class="quizz-header">
      <div class="question-numero" v-if="gameStart">
        {{ displayCurrentQuestion }}
      </div>
      <div class="question-titre">
        <span v-if="displayName">{{ userName }} </span> {{ intro }}
        {{ this.questionSelected.question }}
      </div>
      <div class="question-score" v-if="displayScore">
        {{ score }}/{{ totalQuestions }}
      </div>
    </div>
    <div class="question-choixReponse">
      <div class="start" v-if="displayStart">
        <div class="glow" @click="startGame">
          <h1>
            <span>S</span>
            <span>t</span>
            <span>a</span>
            <span>r</span>
            <span>t</span>
            <span> </span>
            <span>?</span>
          </h1>
        </div>
      </div>
      <div
        class="question-choixReponse-text"
        v-for="(propositions, index) in this.questionSelected.propositions"
        :key="index"
        :class="{
          selectedAnswer: index === activeAnswer,
          wrongAnswer: index === activeAnswer && isWrong,
          goodAnswer: index === activeAnswer && isGood,
        }"
        @click="checkAnswer(propositions, index)"
      >
        <div class="reponsesGenerer">
          <button class="reponsesGenerer-button">{{ propositions }}</button>
        </div>
      </div>
      <div class="question-fail">Nombre de retry: {{ failStreak }}</div>
      <div class="question-fail">Nombre D'erreurs: {{ failCount }}</div>
    </div>
    <div class="buttonZone">
      <button
        class="buttonZone-nextButton glow"
        @click="restart"
        v-if="displayNext"
      >
        Try Again
      </button>
      <button
        class="buttonZone-nextButton buttonZone-nextButton-new glow"
        @click="newGame"
        v-if="displayNewGame"
      >
        Nouvelle partie ?
      </button>
    </div>
    <div class="looserCruel" v-if="looserCruel"><span>Looser Cruel</span></div>
    <div class="lesFeux" v-if="isWin">
      <div class="firework"></div>
      <div class="firework"></div>
      <div class="firework"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "quizzCompo",
  props: {},
  data() {
    return {
      activeAnswer: "",
      isWrong: false,
      isGood: false,
      userName: "",
      displayName: true,
      questions: [],
      questionSelected: {},
      currentQuestion: 0,
      displayCurrentQuestion: 0,
      totalQuestions: Number,
      score: 0,
      displayScore: false,
      displayStart: true,
      displayNext: false,
      displayNewgame: false,
      introOption: [
        "Tu es pret ?",
        "Encore une fois ?",
        "T'es vraiment Nul",
        "Je commence à douter..",
        "Wtf ?",
        "C'est chaud là",
        "Allez c'est bon je me casse t'es trop nul",
      ],
      intro: "Tu es ready ?",
      failCount: 0,
      failStreak: 0,
      gameStart: false,
      isWin: false,
      looserCruel: false,
      mauvaiseReponseAnimation: false,
    };
  },
  methods: {
    setUpGame: function () {
      let localUserData = localStorage.getItem("failStreak");
      this.userName = localStorage.getItem("userName");
      if (localUserData == null) {
        this.failStreak = 1;
      } else {
        this.failStreak = localUserData;
      }
      this.questions = this.$store.state.questions;
      this.totalQuestions = this.questions.length;
    },
    startGame: function () {
      this.displayName = false;
      this.displayStart = false;
      this.displayScore = true;
      this.score = 0;
      this.intro = "";
      this.questionSelected = this.questions[0];
      this.displayCurrentQuestion++;
      this.displayNext = true;
    },
    newGame: function () {
      this.displayName = true;
      this.isWin = false;
      this.displayStart = true;
      this.displayScore = false;
      this.displayNewGame = false;
      this.displayNext = false;
      this.intro = " Tu peux le faire !";
      this.displayCurrentQuestion = "";
      this.failCount = 0;
      this.failStreak++;
      let streakToLocalStorage = this.failStreak;
      localStorage.setItem("failStreak", streakToLocalStorage);
    },

    changeQuestion: function () {
      let i = this.currentQuestion;
      this.questionSelected = this.questions[i];
    },

    playWrongSound: function () {
      const audio = new Audio(require("../assets/son/wrong.mp3"));
      audio.play();
    },
    playGoodSound: function () {
      const audio = new Audio(require("../assets/son/good.mp3"));
      audio.play();
    },

    checkAnswer: function (reponseChoisi, index) {
      if (this.activeAnswer !== index) {
        this.activeAnswer = index;
      }
      let i = this.currentQuestion;
      if (i + 1 == this.questions.length) {
        if (reponseChoisi == this.questions[i].solution) {
          this.playGoodSound();
          this.score++, console.log("derniere bonne réponse");
          return this.endGame();
        } else {
          this.failCount++;
          console.log(reponseChoisi + " " + this.questions[i].solution);
          this.playWrongSound();
          console.log("derniere mauvaise réposne");
          return this.endGame();
        }
      }

      if (reponseChoisi == this.questions[i].solution) {
        this.score++, this.displayCurrentQuestion++;
        this.currentQuestion++;
        this.playGoodSound();
        console.log("bonne réponse");
        this.isGood = true;
        this.isWrong = false;

        setTimeout(() => {
          this.activeAnswer = "";
          this.isGood = false;
          this.changeQuestion();
        }, 500);
      } else {
        this.failCount++;
        this.displayCurrentQuestion++;
        this.currentQuestion++;
        console.log("mauvaise réposne");
        this.playWrongSound();
        this.isWrong = true;
        this.isGood = false;

        setTimeout(() => {
          this.activeAnswer = "";
          this.isWrong = false;
          this.changeQuestion();
        }, 500);
      }
    },

    endGame: function () {
      if (this.score !== this.questions.length) {
        this.intro = "Tu peux mieux faire...";
        this.postScore();
      } else {
        this.intro = "Tu es un crack !";
        this.postScore();
      }
      this.questionSelected = {};
      this.currentQuestion = 0;
      this.displayCurrentQuestion = 0;
      this.displayNext = false;
      this.displayNewGame = true;

      console.log("partie terminée");
    },
    restart: function () {
      this.isWin = false;
      this.score = 0;
      this.failCount = 0;
      this.questionSelected = {};
      this.currentQuestion = 0;
      this.failStreak++;
      localStorage.setItem("failStreak", this.failStreak);
      this.displayNext = false;
      this.displayNewGame = false;
      this.displayStart = true;
      let message =
        this.introOption[Math.floor(Math.random() * this.introOption.length)];
      this.intro = message;
      if (message == "Allez c'est bon je me casse t'es trop nul") {
        setTimeout(() => {
          this.looserCruelActivation();
        }, 2000);
      }
    },
    looserCruelActivation: function () {
      this.looserCruel = true;
    },

    postScore: function () {
      let data = {
        name: this.userName,
        score: this.score,
        try: this.failStreak,
      };
      axios
        .post(
          "http://serverquizz.eba-sckrhgii.eu-west-1.elasticbeanstalk.com//user/userScore",
          data
        )
        .then(() => console.log("score bien enregistré"))
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    score() {
      if (this.score == this.questions.length) {
        this.isWin = true;
      }
    },
  },
  beforeMount() {
    this.setUpGame();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 15px;
}
.quizz {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  background-color: rgb(14, 5, 55);
  font-family: Helvetica;
  border: solid 2px #adefd1ff;
  border-radius: 20px;
  &-header {
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    border-bottom: solid 2px #adefd1ff;
  }
  .question {
    &-titre {
      margin: 20px;
    }
    &-score {
      margin: 20px;
    }
    &-try {
      border-top: 2px solid white;
      padding-left: 20px;
      padding-bottom: 10px;
      padding-top: 20px;
    }
    &-fail {
      font-size: 20px;
      padding-top: 10px;
      margin-bottom: 15px;
    }
  }
}
.reponsesGenerer {
  &-button {
    background-color: rgb(14, 5, 55);
    color: #adefd1ff;
    padding: 40px;
    height: 100%;
    width: 100%;
    border-top: none;
    border-bottom: white 1px solid;
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 25px;
    &:hover {
      border: rgb(253, 253, 253) solid 2px;
      background-color: rgb(62, 82, 117);
      cursor: pointer;
    }
  }
}

.buttonZone {
  display: flex;
  justify-content: center;
  &-nextButton {
    margin: 20px;
    height: 50px !important;
    width: 200px !important;
    &-new {
      font-size: 21px !important;
    }
  }
}
.start {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.looserCruel {
  background: black;
  position: absolute;
  left: 0;
  width: 100%;
  height: 110%;
  font-size: 20px;
  font-size: 80px;
  color: red;
  padding-top: 50%;
  animation: looser 1s ease-in-out infinite;
}
@keyframes looser {
  0% {
    color: white;
  }
  25% {
    color: red;
  }
  50% {
    color: white;
  }
  75% {
    color: red;
  }
  100% {
    color: rgb(249, 249, 249);
  }
}
.glow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 90px;
  border: solid 2px white;
  color: #adefd1ff;
  background-color: rgb(13, 38, 115);
  font-size: 40px;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 50px;
  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 460%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 50px;
  }
  &:active {
    color: rgb(24, 10, 104);
    &:after {
      background: transparent;
    }
  }
  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(10, 9, 98);

    left: 0;
    top: 0;
    border-radius: 50px;
  }
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

h1 {
  font-size: 40px;
  font-family: "Caveat", cursive;
}

h1 span {
  display: block;
  float: left;
  animation: animate 1.5s linear infinite;
  margin: 1px;
  padding-bottom: 8px;
  position: relative;
  color: rgb(249, 253, 251);
}

h1 span:nth-child(1) {
  animation-delay: 0s;
}
h1 span:nth-child(2) {
  animation-delay: 0.25s;
}
h1 span:nth-child(2) {
  animation-delay: 0.5s;
}
h1 span:nth-child(3) {
  animation-delay: 0.75s;
}
h1 span:nth-child(4) {
  animation-delay: 1s;
}
h1 span:nth-child(5) {
  animation-delay: 1.25s;
}
h1 span:nth-child(6) {
  animation-delay: 1.5s;
}
h1 span:nth-child(7) {
  animation-delay: 1.75s;
}

@keyframes animate {
  100% {
    color: rgb(255, 255, 255);
    filter: blur(2px);
    text-shadow: 0 0 10px #00bbff, 0 0 20px #00bbff, 0 0 40px #00bbff,
      0 0 80px #00bbff, 0 0 120px #00bbff, 0 0 200px #00bbff, 0 0 300px #00bbff,
      0 0 400px #00bbff;
  }

  95% {
    color: #adefd1ff;
    filter: blur(0px);
    text-shadow: none;
  }
}

.nextButton {
  display: flex;
  justify-content: center;
}

.goodAnswer {
  animation: goodAnswer 1s infinite;
}
.wrongAnswer {
  animation: wrongAnswer 1s infinite;
}

@keyframes wrongAnswer {
  0% {
    border: solid red 5px;
  }
  25% {
    border: solid rgb(197, 136, 136) 5px;
  }
  50% {
    border: solid red 5px;
  }
  75% {
    border: solid rgb(197, 136, 136) 5px;
  }
  100% {
    border: solid red 5px;
  }
}
@keyframes goodAnswer {
  0% {
    border: solid rgb(21, 255, 0) 5px;
  }
  25% {
    border: solid rgb(162, 209, 164) 5px;
  }
  50% {
    border: solid rgb(0, 255, 0) 5px;
  }
  75% {
    border: solid rgb(145, 187, 142) 5px;
  }
  100% {
    border: solid rgb(15, 214, 25) 5px;
  }
}

@keyframes buttonStartAnimation {
  0% {
    background-color: white;
  }

  50% {
    background-color: red;
  }

  100% {
    background-color: white;
  }
}

@keyframes firework {
  0% {
    transform: translate(0px, 180px);
    width: var(--initialSize);
    opacity: 1;
  }
  50% {
    width: 0.5vmin;
    opacity: 1;
  }
  100% {
    width: var(--finalSize);
    opacity: 0;
  }
}
.firework,
.firework::before,
.firework::after {
  --initialSize: 0.5vmin;
  --finalSize: 45vmin;
  --particleSize: 0.2vmin;
  --color1: yellow;
  --color2: khaki;
  --color3: white;
  --color4: lime;
  --color5: gold;
  --color6: mediumseagreen;
  --y: -30vmin;
  --x: -50%;
  --initialY: 60vmin;
  content: "";
  animation: firework 1.8s infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, var(--y));
  width: var(--initialSize);
  aspect-ratio: 1;
  background:
    /*
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 0% 0%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 100% 0%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 100% 100%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 0% 100%,
    */ radial-gradient(
        circle,
        var(--color1) var(--particleSize),
        #0000 0
      )
      50% 0%,
    radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 50%,
    radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 50% 100%,
    radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 50%,
    /* bottom right */
      radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 80%
      90%,
    radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 95% 90%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 90% 70%,
    radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 60%,
    radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 55% 80%,
    radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 70% 77%,
    /* bottom left */
      radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 22%
      90%,
    radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 45% 90%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 33% 70%,
    radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 10% 60%,
    radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 31% 80%,
    radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 28% 77%,
    radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 13% 72%,
    /* top left */
      radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 80%
      10%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 95% 14%,
    radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 90% 23%,
    radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 100% 43%,
    radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 85% 27%,
    radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 77% 37%,
    radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 60% 7%,
    /* top right */
      radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 22%
      14%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 45% 20%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 33% 34%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 10% 29%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 31% 37%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 28% 7%,
    radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 13% 42%;
  background-size: var(--initialSize) var(--initialSize);
  background-repeat: no-repeat;
}

.firework::before {
  --x: -50%;
  --y: -50%;
  --initialY: -50%;
  /*   transform: translate(-20vmin, -2vmin) rotate(40deg) scale(1.3) rotateY(40deg); */
  transform: translate(-50%, -50%) rotate(40deg) scale(1.3) rotateY(40deg);
  /*   animation: fireworkPseudo 2s infinite; */
}

.firework::after {
  --x: -50%;
  --y: -50%;
  --initialY: -50%;
  /*   transform: translate(44vmin, -50%) rotate(170deg) scale(1.15) rotateY(-30deg); */
  transform: translate(-50%, -50%) rotate(170deg) scale(1.15) rotateY(-30deg);
  /*   animation: fireworkPseudo 2s infinite; */
}

.firework:nth-child(2) {
  --x: 30vmin;
}

.firework:nth-child(2),
.firework:nth-child(2)::before,
.firework:nth-child(2)::after {
  --color1: pink;
  --color2: violet;
  --color3: fuchsia;
  --color4: orchid;
  --color5: plum;
  --color6: lavender;
  --finalSize: 40vmin;
  left: 30%;
  top: 60%;
  animation-delay: -0.25s;
}

.firework:nth-child(3) {
  --x: -30vmin;
  --y: -50vmin;
}

.firework:nth-child(3),
.firework:nth-child(3)::before,
.firework:nth-child(3)::after {
  --color1: cyan;
  --color2: lightcyan;
  --color3: lightblue;
  --color4: PaleTurquoise;
  --color5: SkyBlue;
  --color6: lavender;
  --finalSize: 35vmin;
  left: 70%;
  top: 60%;
  animation-delay: -0.4s;
}

@media all and (min-width: 1280px) {
  .quizz {
    width: 100%;
    margin-bottom: 200px;
  }
}
@media all and (max-width: 1280px) {
  .quizz {
    width: 90%;
    margin-bottom: 20px;
  }
}
@media all and (max-width: 500px) {
  .quizz {
    height: 50%;
    width: 90%;
    margin-top: 50px;
    margin-bottom: 50px;
    &-header {
      font-size: 30px;
    }
    .question {
      &-titre {
        font-size: 30px;
      }
      &-score {
        font-size: 30px;
      }
      &-try {
      }
      &-fail {
        font-size: 20px;
      }
    }
  }
  .buttonZone-nextButton {
    font-size: 25px;
  }
}
</style>
