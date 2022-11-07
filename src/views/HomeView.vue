<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" @click="clear" />
    <HelloWorld msg="Seras-tu capable de répondre à toutes les questions ?" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    clear: function () {
      localStorage.removeItem("failStreak");
      location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
img {
  width: 50%;
}

@media all and (min-width: 1280px) {
  img {
    width: 40%;
  }
}
@media all and (max-width: 1280px) {
  img {
    width: 70%;
  }
}
@media all and (max-width: 500px) {
  img {
    margin-top: 60px;
    width: 100%;
  }
}
</style>
