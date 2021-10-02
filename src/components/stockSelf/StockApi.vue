<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="collapse navbar-collapse justify-content-end">
        <b-nav-item
          href="https://docs.google.com/forms/d/e/1FAIpQLSciIB-sX4oNoz25sqtvokGIHEu0fgSGlnV77ldIX64B876iGQ/viewform?vc=0&c=0&w=1&flr=0"
          target="_blank"
          >聯絡作者</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>

    <b-container class="mt-4 text-nowrap">
      <b-card header="ETF淨值">
        <b-table
          striped
          hover
          :items="items"
          :fields="fields"
          responsive
        ></b-table>
      </b-card>
    </b-container>

    <b-container class="d-flex justify-content-center mt-3">
      <b-button @click="homePage()">返回首頁</b-button>
      <!-- <b-button style="margin-left: 20px" @click="getApiRep123()" variant="dark">重新整理</b-button> -->
    </b-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getApiRep123();
  },
  data() {
    return {
      msgArrayList: [],
      queryList: [
        "0050",
        "0055",
        "0056",
        "006208",
        "00692",
        "00646",
        "00701",
        "00876",
        "00878",
        "00888",
      ],
      items: [],
      fields: [
        {
          key: "a",
          label: "股票代號",
          class: "text-center",
          // stickyColumn: true,
          // sortable: true,
        },
        {
          key: "b",
          label: "股票名稱",
          class: "text-center",
        },
        // {
        //   key: "idName",
        //   label: "股票代號&名稱",
        //   class: "text-center",
        //   // sortable: true,
        //   // stickyColumn: true,
        // },
        {
          key: "e",
          label: "成交價",
          class: "text-center",
        },
        {
          key: "f",
          label: "淨值",
          class: "text-center",
        },
        {
          key: "g",
          label: "折溢",
          class: "text-center",
        },
      ],
    };
  },
  methods: {
    homePage() {
      this.$router.push("/");
      //   console.log(this.msgArrayList);
    },
    getApiRep123() {
      const data = {
        url: "https://mis.twse.com.tw/stock/data/all_etf.txt?1632842984044&_=1632842983379",
      };
      const postBody = JSON.stringify(data);
      this.axios
        .post(
          "https://script.google.com/macros/s/AKfycbz_zhyNeEPxyfndm9YwknPl90If0jJhS3MaE6bdR-lQUDC5k9OuCAK0jaKY-1csUi6h/exec",
          postBody
        )
        .then((response) => {
          this.msgArrayList = [];
          for (const item of response.data.a1) {
            if (item.msgArray) {
              item.msgArray.forEach((element) => {
                this.msgArrayList.push(element);
              });
            }
          }
          this.items = [];
          this.items = this.msgArrayList.filter((e) =>
            this.queryList.includes(e.a)
          );
          this.items = this.items.sort(this.compare01);
          for (const item of this.items) {
            // item.idName = `${item.a} ${item.b}`;
            item.g = item.g + "%";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    compare01(a, b) {
      // 換 ascii code 排
      const aa2 = parseInt(a.a.charAt(2));
      const ba2 = parseInt(b.a.charAt(2));
      if (aa2 !== ba2) {
        return aa2 - ba2;
      } else {
        const aa3 = parseInt(a.a.charAt(3));
        const ba3 = parseInt(b.a.charAt(3));
        return aa3 - ba3;
      }
    },
  },
};
</script>
