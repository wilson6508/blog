<template>
  <div>
    <b-container>
      <b-card header="查詢面板" class="mt-5">
        <b-row class="col-12">
          <span>股票代號/名稱 : </span>
          <v-select
            multiple
            v-model="selected1"
            :options="['Canada', 'United States1']"
          >
          </v-select>
        </b-row>
        <b-row class="col-12 mt-2">
          <b-col>
            <b-button variant="primary">查詢</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
    <b-container>
      <b-card header="0050" class="mt-4">
        <ul>
          <li>名稱: {{ "元大台灣50" }}</li>
          <br />
          <li>淨股數: {{ -350 }}</li>
          <br />
          <li>淨收益: {{ 49141 }}</li>
          <br />
          <b-button variant="success" style="float: right" @click="insert()"
            >賣出</b-button
          >
          <b-button
            variant="danger"
            style="float: right; margin-right: 4px"
            @click="insert()"
            >買進</b-button
          >
        </ul>
      </b-card>
    </b-container>
    <b-container class="d-flex justify-content-center mt-5">
      <b-button>返回首頁</b-button>
    </b-container>
    <StockLogModal ref="editModal"></StockLogModal>
  </div>
</template>

<script>
import StockLogModal from "@/components/sport/StockLogModal.vue";

export default {
  components: {
    StockLogModal,
  },
  data() {
    return {
      selected1: [],
      selected: "first",
      options: [
        { text: "First radio", value: "first" },
        { text: "Second radio", value: "second" },
        { text: "Third radio", value: "third" },
      ],
    };
  },
  methods: {
    insert() {
      //   this.$refs.editModal.stockId = stockId;
      //   this.$refs.editModal.kind = kind;
      this.$refs.editModal.modalShow = true;
    },
  },
};
</script>
