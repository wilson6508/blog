<template>
  <div>
    <b-container>
      <b-card class="mt-5">
        <template #header>
          {{ "b-table 分頁功能01" }}
        </template>
        <b-table
          :items="items"
          :fields="fields"
          :select-mode="selectMode"
          responsive="sm"
          ref="selectableTable"
          selectable
        >
          <template #cell(cashDivDate)="row">
            {{ transDate(row.item.cashDivDate) }}
          </template>

          <template #cell(cashPayDate)="row">
            {{ transDate(row.item.cashPayDate) }}
          </template>
        </b-table>
        <div class="d-flex justify-content-center">
          <b-pagination-nav
            v-model="currentPage"
            :number-of-pages="pages"
            base-url="#"
            first-number
            last-number
          ></b-pagination-nav>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.getApiRep();
    this.getApiRep123();
  },
  data() {
    return {
      fields: [
        { key: "stockId", label: "股票代號", class: "text-center" },
        { key: "stockName", label: "股票名稱", class: "text-center" },
        { key: "closingPrice", label: "股價", class: "text-center" },
        { key: "cashAmount", label: "現金股利", class: "text-center" },
        { key: "cashDivDate", label: "除息日", class: "text-center" },
        { key: "cashPayDate", label: "現金股利發放日", class: "text-center" },
        { key: "action", label: "操作", class: "text-center" },
      ],
      items: [],
      selectMode: "multi",
      selected: [],
      editButton: "批量編輯",
      currentPage: 1,
      pages: 50,
    };
  },
  methods: {
    // getApiRep() {
    //   const uri =
    //     "https://script.google.com/macros/s/AKfycbynhZQ14FP_JxAkR3aLmX8VxPiql5kjOaetpadl38k4zy31J5NNC9SazA35Tziw73EZ/exec";
    //   fetch(uri, { method: "GET" })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((result) => {
    //       this.items = result;
    //     });
    // },
    transDate(date) {
      return date.substring(0, 10);
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
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
