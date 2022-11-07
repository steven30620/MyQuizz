<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="playerName">
      <div class="playerName-box" v-if="displaySelectName">
        <input
          class="playerName-box-input"
          v-model="pseudo"
          type="text"
          placeholder="Pseudo"
          v-on:keyup.enter="submit"
        />
        <button class="playerName-box-button" @click="submit">Valider</button>
      </div>
      <div class="alerte" v-if="alerte">
        <div class="alerte-text">Le Pseudo contients un espace !</div>
      </div>
      <button
        v-if="displayChangeName"
        @click="changeName"
        class="playerName-box-button playerName-box-button2"
      >
        Changer de nom ?
      </button>
    </div>
    <div id="quizzZone" class="container-fluid" v-if="userName">
      <quizzCompo></quizzCompo>
    </div>
    <div class="scoreZone"><scoreCompo></scoreCompo></div>
  </div>
</template>

<script>
import quizzCompo from "./quizz.vue";
import scoreCompo from "./Score.vue";

export default {
  components: { quizzCompo, scoreCompo },
  name: "HelloWorld",
  data() {
    return {
      displaySelectName: true,
      displayChangeName: false,
      pseudo: "",
      userName: false,

      alerte: false,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    submit: function () {
      if (this.pseudo == "" || this.pseudo.match(" ")) {
        this.alerte = true;
        setTimeout(() => {
          this.alerte = false;
        }, 1500);
      } else {
        localStorage.setItem("userName", this.pseudo);
        this.userFound = this.pseudo;
        this.userName = true;
        this.displaySelectName = false;
        this.displayChangeName = true;
        this.pseudo = "";
      }
    },
    checkUsername: function () {
      let user = localStorage.getItem("userName");
      if (user == null) {
        this.userName = false;
      } else {
        this.userName = true;
        this.displaySelectName = false;
        this.displayChangeName = true;
      }
    },
    changeName: function () {
      localStorage.removeItem("userName");
      this.displaySelectName = true;
      this.displayChangeName = false;
      this.userName = false;
    },
  },
  beforeMount() {
    this.checkUsername();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  display: flex;
  flex-direction: column;
  font-family: Helvetica;
}
#quizzZone {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}

.playerName {
  &-box {
    display: flex;
    justify-content: center;

    &-input {
      border: solid 2px green;
      border-radius: 25px;
      font-size: 30px;
      height: 50px;
      padding-left: 20px;
      box-shadow: 5px 10px 5px blue;
    }
    &-button {
      font-family: milkshake;
      margin-left: 30px;
      border: solid 2px green;
      box-shadow: 5px 10px 5px blue;
      border-radius: 25px;
      width: 150px;
      font-size: 30px;
      &2 {
        margin-left: 00px;
        width: 300px;
      }

      &:hover {
        cursor: pointer;
        animation: buttonAnimation 0.4s forwards;
      }
    }
  }
}

.alerte {
  margin-top: 25px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  &-text {
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    border: solid red 2px;
    animation: alerte 0.5s ease-in-out infinite;
  }
}

@keyframes buttonAnimation {
  0% {
    box-shadow: 5px 10px 5px blue;
  }
  100% {
    color: white;
    background-color: blue;
    box-shadow: 0px 0px 0px blue;
  }
}
@keyframes alerte {
  0% {
    color: red;
  }
  25% {
    color: rgb(255, 255, 255);
  }

  50% {
    color: rgb(255, 0, 0);
  }
  75% {
    color: white;
  }
  100% {
    color: red;
  }
}

@media all and (max-width: 1280px) {
  h1 {
    font-size: 40px;
  }
}
@media all and (max-width: 500px) {
  h1 {
    font-size: 35px;
  }
  #quizzZone {
    padding-top: 20px;
  }

  .playerName-box {
    &-input {
      width: 250px;
      margin-bottom: 20px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
