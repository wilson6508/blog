<template>
  <div>
    <div class="card mb-3">
      <div class="card-body position-relative">
        <div class="row mb-3">
          <div class="col-4">
            <label class="form-label">選擇聯盟</label>
            <select class="form-select">
              <option selected="">選擇全部</option>
              <option
                v-for="(item, index) in leagues"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <div class="col-4">
            <label class="form-label">模糊搜尋</label>
            <input class="form-control" type="text" v-model="fuzzySearch" />
          </div>
          <div class="col-4">
            <label class="form-label">每頁顯示數量</label>
            <select class="form-select" v-model="perPage">
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option selected="" value="10">10</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-if="teams.length > 0" class="card mb-3">
      <div class="card-body position-relative">
        <div class="table-responsive scrollbar">
          <table class="table table-hover overflow-hidden">
            <thead>
              <tr class="text-center">
                <th scope="col">序號</th>
                <th scope="col">聯盟</th>
                <th scope="col">分區</th>
                <th scope="col">分組</th>
                <th scope="col">隊伍</th>
                <th scope="col">中文名稱</th>
                <th scope="col">partid</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center align-middle"
                v-for="(item, index) in displayTeams"
                :key="index"
              >
                <td class="text-nowrap">
                  {{ index + 1 + (currentPage - 1) * perPage }}
                </td>
                <td class="text-nowrap">{{ item.league }}</td>
                <td class="text-nowrap">{{ item.note }}</td>
                <td class="text-nowrap">{{ item.division }}</td>
                <td class="text-nowrap">{{ item.team }}</td>
                <td class="text-nowrap">{{ item.chiName }}</td>
                <td class="text-nowrap">{{ item.partid }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <SelfPagination
      :pages="pages"
      @currentPage="getCurrentPage"
      class="d-flex justify-content-center my-pagination"
      v-if="filterTeams.length > 0"
    ></SelfPagination>
  </div>
</template>

<script>
import SelfPagination from "@/components/tool/SelfPagination.vue";

export default {
  components: {
    SelfPagination,
  },
  mounted() {
    this.getTeamInfo();
  },
  computed: {
    filterTeams() {
      const array = this.teams.filter((item) => {
        let boo = false;
        for (const prop in item) {
          if (prop === "id") {
            continue;
          } else if (
            item[prop]
              .toString()
              .toLowerCase()
              .includes(this.fuzzySearch.toString().toLowerCase())
          ) {
            boo = true;
          }
        }
        return boo;
      });
      return array;
    },
    displayTeams() {
      const begin = this.perPage * (this.currentPage - 1);
      const end = this.perPage * this.currentPage;
      return this.filterTeams.slice(begin, end);
    },
    pages() {
      return Math.ceil(this.filterTeams.length / this.perPage);
    },
  },
  data() {
    return {
      teams: [], // api回傳資訊
      perPage: 10, // 一頁顯示幾個項目
      currentPage: 1, // 目前所在的頁數
      fuzzySearch: "", // 模糊搜尋
      leagues: [
        { value: "MLB", label: "美國職棒MLB" },
        { value: "NBA", label: "美國職籃NBA" },
        { value: "NHL", label: "美國冰球NHL" },
      ],
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
          this.teams = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style>
.my-pagination .disabled .page-link {
  border-color: transparent;
}
</style>
