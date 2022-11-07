<template>
  <div class="score">
    <div class="score-header">Scores</div>
    <div class="score-list" v-for="(user, index) in allPlayer" :key="index">
      <div class="score-row" :class="'score-row-' + index" @click="test">
        <div class="score-position">
          {{ index + 1 }}
        </div>
        <div class="score-playerName">{{ user.name }}</div>
        <div class="score-number">
          <div class="score-point">Meilleur score : {{ user.score }}</div>
          <div class="score-retry">Tentative n°{{ user.try }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "scoreCompo",
  props: {},
  data() {
    return {
      allPlayer: [],
      playerClassed: [],
      playerName: "",
      playerScore: "",
      position: 1,
      user: {},
      isFirst: "premier",
      isSecond: true,
      troisieme: true,
    };
  },
  methods: {
    getScore: function () {
      axios
        .get(
          "http://serverquizz.eba-sckrhgii.eu-west-1.elasticbeanstalk.com//user/getScore"
        )
        .then((res) => {
          this.allPlayer = res.data;
          this.classement();
        });
    },
    classement: function () {
      let players = this.allPlayer;

      players.sort((a, b) => {
        return a.try - b.try;
      });
      players.sort((a, b) => {
        if (a.score == 0 || b.score == 0) {
          return b.score - a.score;
        }
      });
      players.sort((a, b) => {
        if (a.try == b.try) {
          return b.score - a.score;
        }
      });

      players = this.allPlayer;
    },
    setPosition: function () {},
  },
  beforeMount() {
    this.getScore();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.score {
  background: linear-gradient(#251b83, #0cbaba, #19127a);

  border: solid 4px green;
  border-radius: 25px;
  padding-bottom: 15px;
  box-shadow: 0px 25px 15px green;
  margin-top: 50px;
  margin-bottom: 200px;
  align-items: center;

  &-header {
    font-size: 40px;
    border-bottom: 4px solid green;
  }
  &-list {
    font-size: 25px;
    text-align: left;
  }
  &-row {
    display: flex;
    flex-direction: row;
    border: 4px solid green;
    border-bottom: 3px solid;
    align-items: center;
    height: 100px;
    &-0 {
      --angle: 0deg;
      border: 5px solid;
      border-image: linear-gradient(var(--angle), gold, #f1f0f1, gold) 1;
      animation: shine 1s infinite;
    }
    &-1 {
      --angle: 0deg;
      border: 5px solid;
      border-image: linear-gradient(var(--angle), grey, #ffffff, grey) 1;
      animation: shine 5s infinite;
    }
    &-2 {
      --angle: 0deg;
      border: 5px solid;
      border-image: linear-gradient(
          var(--angle),
          rgb(207, 118, 16),
          #f1f0f1,
          rgb(202, 123, 20)
        )
        1;
      animation: shine 10s infinite;
    }
  }
  &-position {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    height: 100%;
    width: 50px;
    border-right: solid 4px green;
  }
  &-playerName {
    display: flex;
    height: 100%;
    margin-left: 10px;
    align-items: center;
    width: 70%;
  }
  &-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    height: 100%;
    width: 25%;
    text-align: center;
    border-left: solid 4px green;
  }
}

@keyframes shine {
  0% {
    --angle: 0deg;
  }
  50% {
    --angle: 180deg;
  }
  100% {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@media all and (min-width: 1280px) {
}
@media all and (max-width: 1280px) {
}
@media all and (max-width: 500px) {
  .score {
    &-number {
      font-size: 15px;
    }
  }
}
</style>
