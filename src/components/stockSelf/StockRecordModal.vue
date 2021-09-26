<template>
  <div>
    <b-modal
      v-model="modalShow"
      title="新增交易紀錄"
      :hide-header-close="false"
    >
      <template #modal-footer>
        <b-button variant="primary" @click="save()">儲存</b-button>
      </template>
      <b-container>
        <b-row>
          <label>交易日期:</label>
          <b-form-datepicker v-model="tDate" class="mb-2"></b-form-datepicker>
        </b-row>
        <b-row>
          <label>股票代號:</label>
          <b-form-input v-model="stockId"></b-form-input>
        </b-row>
        <b-row>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">股數</th>
                <th scope="col">價格</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in array" :key="item.index">
                <td>
                  <b-form-input
                    v-model.number="item.share"
                    autofocus
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input v-model.number="item.price"></b-form-input>
                </td>
                <td>
                  <i
                    class="fas fa-plus-circle fa-lg mt-2"
                    @click="addRow(item.index)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </b-row>
        <b-row>
          <label>交易類別:</label>
          <b-col
            ><b-form-radio
              v-model="type"
              name="radio01"
              value="buy"
              class="badge bg-danger"
              style="font-size: 100%"
              >現買</b-form-radio
            ></b-col
          >
          <b-col
            ><b-form-radio
              v-model="type"
              name="radio01"
              value="sell"
              class="badge bg-success"
              style="font-size: 100%"
              >現賣</b-form-radio
            ></b-col
          >
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<style>
.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
}
</style>

<script>
export default {
  watch: {
    modalShow() {
      if (this.modalShow) {
        this.array = [{ index: 0 }];
      }
    },
  },
  data() {
    return {
      modalShow: false,
      tDate: "",
      stockId: "",
      type: "",
      array: [{ index: 0 }],
      length: 0,
      etf: 1,
    };
  },
  methods: {
    addRow(index) {
      const length = this.array.length;
      this.array.push({
        index: length,
        share: this.array[index].share,
        price: this.array[index].price,
      });
    },
    save() {
      let id = this.length;
      const tempArray = [];
      for (const item of this.array) {
        tempArray.push({
          id: id + 1,
          etf: this.etf,
          transactionDate: this.tDate,
          type: this.type,
          stockId: this.stockId,
          share: this.type === "sell" ? -item.share : item.share,
          price: item.price,
          payment: this.calPayment(this.etf, this.type, item.share, item.price),
        });
        id++;
      }
      const data = JSON.stringify(tempArray);
      this.axios
        .post(
          "https://script.google.com/macros/s/AKfycbwgcXdfywwn7_FJ2cAmJwHtPyPW0jmdZ8K_0eFmlAIjxV1M1i3YwqG3wFVosfLb9dKr/exec",
          data
        )
        .then(() => {
          this.$parent.getExcelTable();
        })
        .catch((error) => {
          console.log(error);
        });
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
