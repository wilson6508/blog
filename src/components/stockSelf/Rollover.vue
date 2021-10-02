<template>
  <div>
    <Header></Header>
    <b-container class="mt-4 text-nowrap">
      <b-card header="0050 & 006208基本資訊">
        <b-table hover :items="items" :fields="fields" responsive></b-table>
      </b-card>
    </b-container>
    <b-container v-if="items.length > 0" class="mt-4">
      <b-card header="轉倉建議">
        {{ cal }}
        <br />
        <!-- <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            v-model="test"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            >買賣交換</label
          >
        </div> -->
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
  computed: {
    cal() {
      const temp0050 = parseFloat(
        this.items[0].g.substring(0, this.items[0].g.length - 1)
      );
      const temp006208 = parseFloat(
        this.items[1].g.substring(0, this.items[1].g.length - 1)
      );
      if (temp0050 - temp006208 > 0.5) {
        const s1 = this.cal0050Share(true, this.items[0].e, this.items[1].e);
        return `買進 : 2張 006208，賣出 : 0050 1張 又 ${s1}股。`;
      } else if (temp006208 - temp0050 > 0.5) {
        const s2 = this.cal0050Share(false, this.items[0].e, this.items[1].e);
        return `賣出 : 2張 006208，買進 : 0050 1張 又 ${s2}股。`;
      } else {
        return "不建議轉倉";
      }
      // if (this.test) {
      //   const s1 = this.cal0050Share(true, this.items[0].e, this.items[1].e);
      //   return `買進 : 2張 006208，賣出 : 0050 1張 又 ${s1}股。`;
      // } else {
      //   const s2 = this.cal0050Share(false, this.items[0].e, this.items[1].e);
      //   return `賣出 : 2張 006208，買進 : 0050 1張 又 ${s2}股。`;
      // }
    },
  },
  mounted() {
    this.getApiRep();
  },
  data() {
    return {
      msgArrayList: [],
      queryList: ["0050", "006208"],
      items: [],
      fields: [
        {
          key: "a",
          label: "股票代號",
          class: "text-center",
        },
        {
          key: "b",
          label: "股票名稱",
          class: "text-center",
        },
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
      test: true,
    };
  },
  methods: {
    getApiRep() {
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
          this.items = this.items.sort(this.compare);
          for (const item of this.items) {
            item.g = item.g + "%";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    compare(a, b) {
      const aa2 = parseInt(a.a.charAt(2));
      const ba2 = parseInt(b.a.charAt(2));
      return aa2 - ba2;
    },
    cal0050Share(boo, e0050, e006208) {
      if (boo) {
        const buy006208 = this.calPayment(1, "buy", 2000, e006208);
        const sell0050 = this.calPayment(1, "sell", 1000, e0050);
        const delta = Math.abs(sell0050 + buy006208);
        return Math.round(delta / e0050);
      } else {
        const sell006208 = this.calPayment(1, "sell", 2000, e006208);
        const buy0050 = this.calPayment(1, "buy", 1000, e0050);

        const delta = Math.abs(sell006208 + buy0050);
        return Math.round(delta / e0050);
      }
    },
    calPayment(etf, type, share, price) {
      // 價金
      const sp = Math.floor(share * price);
      // 手續費
      let fee = 0;
      if (share > 999 && sp < 47200) {
        fee = 20;
      } else {
        fee = Math.ceil(sp * 0.001 * 1.425 * 0.28);
      }
      // 交易稅
      if (type === "sell") {
        const ratio = etf === 1 ? 0.001 : 0.003;
        const tax = Math.floor(sp * ratio);
        return sp - fee - tax;
      } else {
        return -sp - fee;
      }
    },
  },
};
</script>
