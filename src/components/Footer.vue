<template>
  <div>
    <b-container class="d-flex justify-content-center mt-3">
      <b-button @click="homePage()">返回首頁</b-button>
    </b-container>
    &nbsp;<br />
    &nbsp;<br />
  </div>
</template>

<script>
export default {
  methods: {
    homePage() {
      this.$router.push("/");
    },
  },
};
</script>