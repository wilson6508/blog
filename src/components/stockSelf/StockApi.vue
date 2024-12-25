<template>
  <div>
    <Header></Header>
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
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.getApiRep123();
  },
  data() {
    return {
      msgArrayList: [],
      queryList: [
        "0050",
        "006208",
        // "0056",
        // "00692",
        // "00713",
        // "00919",
        // "00929",
        // "00631L",
        // "00675L",
        "00646",
        "00830",
        "00926",
        "00662",
        "00924",
        "00876",
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
    getApiRep123() {
      const apiUrl = "https://script.google.com/macros/s/AKfycbzBLSL6s5Reo3R64dBJ1tWUxCZSTPkO4nKV974-vyJH3Q6At23mM-RMKS8e60_rXMU4wA/exec";
      this.axios.get(apiUrl)
        .then((response) => {
          this.msgArrayList = [];
          for (const item of response.data) {
            if (item.msgArray) {
              item.msgArray.forEach((element) => {
                this.msgArrayList.push(element);
              });
            }
          }
          const tempArr = this.msgArrayList.filter((e) =>
            this.queryList.includes(e.a)
          );
          this.items = this.queryList.map(id => tempArr.find(obj => obj.a === id));
          for (const item of this.items) {
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
    }
  },
};
</script>
