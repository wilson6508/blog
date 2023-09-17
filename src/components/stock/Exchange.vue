<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">Featured</div>
        <div class="card-body">
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col" v-for="prop in propArr" :key="prop">
                  {{ prop }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in stockInfoArr" :key="item.stockId">
                <td v-for="prop in propArr" :key="prop">{{ item[prop] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exchange",
  computed: {
    pistolObj() {
      const { usaStockId, usaQuantity, twStockId, twQuantity } =
        this.tradingLog;
      const usaPrice = this.pistolUsaPrice;
      const twPrice = this.pistolTwPrice;
      const usaAmount = this.convertToDecimal(usaQuantity * usaPrice, 2);
      const twAmount = this.getTwAmount(-twQuantity, twPrice);
      return {
        usaStockId,
        usaQuantity: -usaQuantity,
        usaPrice,
        usaAmount,
        twStockId,
        twQuantity: -twQuantity,
        twPrice,
        twAmount,
      };
    },
    profitAndLoss() {
      const exchangeRate = 32;
      const usaAmount = this.tradingLog.usaAmount + this.pistolObj.usaAmount;
      const twAmount = this.tradingLog.twAmount + this.pistolObj.twAmount;
      const answer = usaAmount * exchangeRate + twAmount;
      return this.convertToDecimal(answer, 0);
    },
  },
  data() {
    return {
      pistolUsaPrice: 0,
      pistolTwPrice: 0,
      propArr: ["stockId", "name", "marketPrice", "disPrePer"],
      stockInfoArr: [
        {
          id: 0,
          stockId: "00668",
          name: "國泰美國道瓊",
          marketPrice: 37.9,
          netValue: 37.87,
          disPrePer: 0.08,
          preNetValue: 37.81,
          totalShare: 10058000,
          deltaShare: 0,
          deltaPrice: 0.0,
          deltaPricePer: 0.0,
        },
        {
          id: 0,
          stockId: "00646",
          name: "元大S&P500",
          marketPrice: 38.1,
          netValue: 38.05,
          disPrePer: 0.13,
          preNetValue: 37.94,
          totalShare: 353985000,
          deltaShare: -1000000,
          deltaPrice: 0.0,
          deltaPricePer: 0.0,
        },
        {
          id: 0,
          stockId: "00662",
          name: "富邦NASDAQ",
          marketPrice: 47.05,
          netValue: 46.85,
          disPrePer: 0.43,
          preNetValue: 46.75,
          totalShare: 181029000,
          deltaShare: 0,
          deltaPrice: 0.0,
          deltaPricePer: 0.0,
        },
      ],
      logPropArr: [
        "usaStockId",
        "usaQuantity",
        "usaPrice",
        "usaAmount",
        "twStockId",
        "twQuantity",
        "twPrice",
        "twAmount",
      ],
      tradingLog: {
        usaStockId: "SPY",
        usaQuantity: -3,
        usaPrice: 397,
        usaAmount: 1191,
        twStockId: "00646",
        twQuantity: 1000,
        twPrice: 38.09,
        twAmount: -38110,
      },
    };
  },
  methods: {
    convertToDecimal(value, position) {
      const tenPow = Math.pow(10, position);
      return Math.round(value * tenPow) / tenPow;
    },
    getTwAmount(twQuantity, twPrice) {
      let answer = 0;
      const total = Math.abs(twQuantity * twPrice);
      const fee = total * 1.425 * 0.001 * 0.6;
      const tax = total * 0.001;
      if (twQuantity > 0) {
        answer = total + fee;
      } else {
        answer = total - fee - tax;
      }
      answer = -Math.sign(twQuantity) * answer;
      return this.convertToDecimal(answer, 0);
    },
  },
};
</script>