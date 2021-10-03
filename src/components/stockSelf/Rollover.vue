<template>
  <div>
    <Header></Header>

    <b-container class="mt-4 text-nowrap">
      <b-card>
        <template #header>
          <Chevron v-b-toggle.b-card-1></Chevron>
          {{ "0050 & 006208基本資訊" }}
        </template>
        <b-collapse id="b-card-1" visible>
          <b-table :items="items" :fields="fields" responsive></b-table>
        </b-collapse>
      </b-card>
    </b-container>

    <b-container v-if="items.length > 0" class="mt-4">
      <b-card header="轉倉建議">
        {{ cal }}
        <br />
      </b-card>
    </b-container>

    <b-container class="mt-4" v-if="situation !== null && situation">
      <b-card header="實際情況">
        <b-row>
          <b-col class="col-12">
            <i class="fas fa-minus-circle mt-2" @click="minus006208()"></i>
            <span>&emsp;賣出&emsp;006208&emsp;</span>
            <span>{{ price006208 }}</span>
            <span>&emsp;200股&emsp;</span>
            <i class="fas fa-plus-circle mt-2" @click="plus006208()"></i>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col class="col-12">
            <i class="fas fa-minus-circle mt-2" @click="minus0050()"></i>
            <span>&emsp;買進&emsp;0050&emsp;</span>
            <span>{{ price0050 }}</span>
            <span>&emsp;{{ share0050 }}股&emsp;</span>
            <i class="fas fa-plus-circle mt-2" @click="plus0050()"></i>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

    <b-container class="mt-4" v-if="situation !== null && !situation">
      <b-card header="實際情況">
        <b-row>
          <b-col class="col-12">
            <i class="fas fa-minus-circle mt-2" @click="minus006208()"></i>
            <span>&emsp;買進&emsp;006208&emsp;</span>
            <span>{{ price006208 }}</span>
            <span>&emsp;200股&emsp;</span>
            <i class="fas fa-plus-circle mt-2" @click="plus006208()"></i>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col class="col-12">
            <i class="fas fa-minus-circle mt-2" @click="minus0050()"></i>
            <span>&emsp;賣出&emsp;0050&emsp;</span>
            <span>{{ price0050 }}</span>
            <span>&emsp;{{ share0050 }}股&emsp;</span>
            <i class="fas fa-plus-circle mt-2" @click="plus0050()"></i>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Chevron from "@/components/Chevron.vue";

export default {
  components: {
    Header,
    Footer,
    Chevron,
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
        this.chSituation(false);
        this.set0050(this.items[0].e);
        this.set006208(parseFloat(this.items[1].e));
        const s1 = this.cal0050Share(true, this.items[0].e, this.items[1].e);
        return `買進 : 2張 006208，賣出 : 0050 1張 又 ${s1}股。`;
      } else if (temp006208 - temp0050 > 0.5) {
        this.chSituation(true);
        this.set0050(this.items[0].e);
        this.set006208(parseFloat(this.items[1].e));
        const s2 = this.cal0050Share(false, this.items[0].e, this.items[1].e);
        return `賣出 : 2張 006208，買進 : 0050 1張 又 ${s2}股。`;
      } else {
        this.chSituation(null);
        return "不建議轉倉";
      }
    },
    share0050() {
      if (this.situation !== null && this.situation) {
        const sell006208 = this.calPayment(1, "sell", 200, this.price006208);
        return Math.round(sell006208 / this.price0050);
      }
      if (this.situation !== null && !this.situation) {
        const buy006208 = this.calPayment(1, "buy", 200, this.price006208);
        return Math.round(buy006208 / this.price0050);
      }
      return 0;
    },
  },
  mounted() {
    this.getApiRep();
  },
  data() {
    return {
      situation: null,
      price006208: 0,
      price0050: 0,
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
      const postBody = JSON.stringify({ url: this.getAllEtfUrl() });
      this.axios
        .post(this.getReadOtherApi(), postBody)
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
    chSituation(boo) {
      this.situation = boo;
    },
    set006208(value) {
      this.price006208 = value;
    },
    set0050(value) {
      this.price0050 = value;
    },
    minus006208() {
      this.price006208 -= 0.05;
      this.price006208 = Math.round(this.price006208 * 100) / 100;
    },
    plus006208() {
      this.price006208 += 0.05;
      this.price006208 = Math.round(this.price006208 * 100) / 100;
    },
    minus0050() {
      this.price0050 -= 0.05;
      this.price0050 = Math.round(this.price0050 * 100) / 100;
    },
    plus0050() {
      this.price0050 += 0.05;
      this.price0050 = Math.round(this.price0050 * 100) / 100;
    },
  },
};
</script>
