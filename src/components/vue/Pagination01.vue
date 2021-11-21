<template>
  <div>
    <b-container>
      <b-card class="mt-3" v-if="items.length > 0">
        <template #header>
          {{ "bootstrap-vue-table 分頁功能01" }}
        </template>
        <b-table
          responsive
          :items="displayItems"
          :fields="fields"
          :per-page="perPage"
          :striped="false"
          head-variant="dark"
          :no-border-collapse="true"
          :small="true"
        >
        </b-table>
        <b-pagination-nav
          v-model="currentPage"
          :number-of-pages="pages"
          base-url="#"
          first-number
          last-number
          class="d-flex justify-content-center"
        ></b-pagination-nav>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getTeamInfo();
  },
  computed: {
    displayItems() {
      const begin = this.perPage * (this.currentPage - 1);
      const end = this.perPage * this.currentPage;
      return this.items.slice(begin, end);
    },
    pages() {
      return Math.ceil(this.items.length / this.perPage);
    },
  },
  data() {
    return {
      fields: [
        { key: "tempId", label: "序號", class: "text-center" },
        { key: "league", label: "聯盟", class: "text-center" },
        { key: "note", label: "分區", class: "text-center" },
        { key: "division", label: "分組", class: "text-center" },
        { key: "team", label: "隊伍", class: "text-center" },
        { key: "chiName", label: "中文名稱", class: "text-center" },
        { key: "partid", label: "partid", class: "text-center" },
      ],
      items: [],
      perPage: 5, // 一頁顯示幾個項目
      currentPage: 1, // 目前所在的頁數
    };
  },
  methods: {
    getTeamInfo() {
      const postBody = JSON.stringify({
        url: this.getExcelUrl(),
        page: 4,
      });
      this.axios
        .post(this.getReadAllValueApi(), postBody)
        .then((response) => {
          this.items = response.data;
          this.items.forEach((element, index) => (element.tempId = index + 1));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
