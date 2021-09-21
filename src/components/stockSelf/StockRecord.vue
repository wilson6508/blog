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

    <b-container class="mt-4" v-if="waitMappingTable">
      <b-card header="查詢面板">
        <b-row class="col-12">
          <span>&nbsp;股票代號/名稱 : </span>
          <!-- <v-select :options="options" v-model="selected"></v-select> -->
          <b-col cols="10" class="mt-2"
            ><select class="form-select" v-model="selected">
              <option
                v-for="(item, index) in options"
                :key="index"
                :value="item"
              >
                {{ item.label }}
              </option>
            </select>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

    <b-container
      class="mt-4"
      v-if="
        selected !== null &&
        selected.label !== '請選擇欲查詢的股票' &&
        selected.label !== '查詢全部'
      "
    >
      <b-card :header="selected.stockId">
        <ul>
          <li>名稱: {{ selected.stockName }}</li>
          <br />
          <b-button
            variant="success"
            style="float: right"
            @click="insert('sell')"
            >賣出</b-button
          >
          <b-button
            variant="danger"
            style="float: right; margin-right: 4px"
            @click="insert('buy')"
            >買進</b-button
          >
        </ul>
      </b-card>
    </b-container>

    <b-container
      class="mt-4"
      v-if="selected !== null && selected.label === '查詢全部'"
    >
      <b-card class="text-nowrap">
        <b-table
          :items="items"
          :fields="fields"
          :sticky-header="true"
          responsive
        >
        </b-table>
      </b-card>
    </b-container>

    <b-container
      class="d-flex justify-content-center mt-3"
      v-if="waitMappingTable"
    >
      <b-button @click="homePage()">返回首頁</b-button>
    </b-container>

    <StockRecordModal ref="recordModal"></StockRecordModal>
  </div>
</template>

<script>
const moment = require("moment");
import StockRecordModal from "@/components/stockSelf/StockRecordModal.vue";

export default {
  components: {
    StockRecordModal,
  },
  computed: {
    options() {
      const array = [];
      array[0] = { label: "請選擇欲查詢的股票" };
      array[1] = { label: "查詢全部" };
      this.mappingTable.forEach((element) => {
        element.label = element.stockId + " " + element.stockName;
        array.push(element);
      });
      return array;
    },
    items() {
      const array = [];
      const stockIdSet = new Set();
      this.excelTable.forEach((e) => {
        stockIdSet.add(e.stockId);
      });
      for (const stockId of stockIdSet) {
        let deltaShare = 0;
        let deltaPayment = 0;
        for (const item of this.excelTable) {
          if (stockId === item.stockId) {
            deltaShare += item.share;
            deltaPayment += item.payment;
          }
        }
        array.push({
          stockId: stockId,
          stockName: this.findStockName(stockId),
          deltaShare: deltaShare,
          deltaPayment: deltaPayment,
        });
      }
      return array;
    },
  },
  beforeMount() {
    this.getMappingTable();
    this.getExcelTable();
    this.selected = this.options[0];
  },
  data() {
    return {
      waitMappingTable: false,
      selected: null,
      mappingTable: [],
      excelTable: [],
      fields: [
        {
          key: "stockId",
          label: "股票代號",
          stickyColumn: true,
          class: "text-center",
        },
        {
          key: "stockName",
          label: "股票名稱",
          class: "text-center",
        },
        {
          key: "deltaShare",
          label: "淨股數",
          class: "text-center",
        },
        {
          key: "deltaPayment",
          label: "淨收益",
          class: "text-center",
        },
      ],
    };
  },
  methods: {
    homePage() {
      this.$router.push("/");
    },
    insert(type) {
      this.$refs.recordModal.length = this.excelTable.length;
      this.$refs.recordModal.type = type;
      this.$refs.recordModal.tDate = moment(new Date()).format("YYYY-MM-DD");
      this.$refs.recordModal.stockId = this.selected.stockId;
      this.$refs.recordModal.etf = this.selected.etf;
      this.$refs.recordModal.modalShow = true;
    },
    getMappingTable() {
      const data = {
        url: "https://docs.google.com/spreadsheets/d/1pwnsPU4Ch2CjPGEXucU4qnsPoMpDoVNDRe9rORIZhIQ/edit#gid=0",
        page: 1,
      };
      const postBody = JSON.stringify(data);
      this.axios
        .post(
          "https://script.google.com/macros/s/AKfycbyvt9nwYggD_GbQKXSY9P8tMDVyMcF8rs9981SXYvphxn4q9TmThZ_N6d_biFKGEryP/exec",
          postBody
        )
        .then((response) => {
          this.mappingTable = response.data;
          this.waitMappingTable = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getExcelTable() {
      const data = {
        url: "https://docs.google.com/spreadsheets/d/1pwnsPU4Ch2CjPGEXucU4qnsPoMpDoVNDRe9rORIZhIQ/edit#gid=0",
        page: 2,
      };
      const postBody = JSON.stringify(data);
      this.axios
        .post(
          "https://script.google.com/macros/s/AKfycbyvt9nwYggD_GbQKXSY9P8tMDVyMcF8rs9981SXYvphxn4q9TmThZ_N6d_biFKGEryP/exec",
          postBody
        )
        .then((response) => {
          this.excelTable = response.data;
          this.$refs.recordModal.modalShow = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findStockName(stockId) {
      const obj = this.mappingTable.find((e) => e.stockId === stockId);
      return obj.stockName;
    },
  },
};
</script>
