<template>
  <div>
    TDTD
    <b-button @click="demo()">demo</b-button>
    <b-button @click="update()">update</b-button>
    <pre>{{ apiResult }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiResult: [],
    };
  },
  methods: {
    async demo() {
      const url = this.getApiUrl("readValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 0,
      };
      const result = await this.getApiResult(url, postBody);
      if (result !== null) {
        this.apiResult = result;
      }
    },
    async update() {
      const url = this.getApiUrl("updateValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 0,
        data: [
          {
            row: 2,
            col: 1,
            val: "NYSEARCA:VOO",
          },
          {
            row: 3,
            col: 1,
            val: "NYSEARCA:VOO",
          },
          {
            row: 2,
            col: 3,
            val: "2022/2/16",
          },
        ],
      };
      const result = await this.getApiResult(url, postBody);
      if (result !== null) {
        console.log(result);
      }
    },
  },
};
</script>