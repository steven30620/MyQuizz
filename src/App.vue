<template>
  <nav>
    <router-link to="/" class="titre">Steph-O-Quizz</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: "Milkshake";
  src: local("Milkshake"),
    url(./assets/font/Milkshake/Milkshake.otf) format("truetype");
}
body {
  background: linear-gradient(#380036, #0cbaba);
  color: #adefd1ff;
}

#app {
  font-family: Milkshake, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  margin: 30px;
  height: 100px;

  a {
    font-weight: 200;
    font-size: 80px;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #adefd1ff;
      text-decoration: none;
      -webkit-text-stroke: 1px;
      -webkit-text-stroke-color: #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5,
        #002bff, #7a00ff, #ff00c8, #ff0000;
      animation: glowing 2s linear infinite;
    }
  }
}

@media all and (max-width: 1280px) {
  nav {
    a {
      font-size: 75px;
    }
  }
}
@media all and (max-width: 500px) {
  nav a {
    font-size: 70px;
  }
}
@keyframes glowing {
  0% {
    -webkit-text-stroke-color: #ff0000;
  }
  10% {
    -webkit-text-stroke-color: #ff7300;
  }
  25% {
    -webkit-text-stroke-color: #fffb00;
  }
  40% {
    -webkit-text-stroke-color: #48ff00;
  }
  50% {
    -webkit-text-stroke-color: #00ffd5;
  }
  60% {
    -webkit-text-stroke-color: #002bff;
  }
  70% {
    -webkit-text-stroke-color: #7a00ff;
  }
  85% {
    -webkit-text-stroke-color: #ff00c8;
  }
  100% {
    -webkit-text-stroke-color: #ff0000;
  }
}
</style>
