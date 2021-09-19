<template>
  <div>
    <b-container>
      <b-card class="mt-5">
        <template #header>
          {{ "金融股殖利率" }}
          <b-button
            style="float: right"
            size="sm"
            variant="primary"
            @click="selectAllRows()"
            >批量編輯</b-button
          >
          <b-button
            style="float: right; margin-right: 5px"
            size="sm"
            variant="secondary"
            @click="clearSelected()"
            >取消全選</b-button
          >
          <b-button
            style="float: right; margin-right: 5px"
            size="sm"
            variant="dark"
            @click="clearSelected()"
            >資料全選</b-button
          >
          <b-button
            style="float: right; margin-right: 5px"
            size="sm"
            variant="dark"
            @click="getApiRep()"
            >刷新</b-button
          >
        </template>
        <template #footer>
          <em style="float: right">資訊僅供參考</em>
        </template>
        <b-table
          :items="items"
          :fields="fields"
          :select-mode="selectMode"
          responsive="sm"
          ref="selectableTable"
          selectable
          @row-selected="onRowSelected"
        >
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
              <span class="sr-only">Selected</span>
            </template>

            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
          </template>

          <template #cell(cashDivDate)="row">
            {{ transDate(row.item.cashDivDate) }}
          </template>

          <template #cell(cashPayDate)="row">
            {{ transDate(row.item.cashPayDate) }}
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getApiRep();
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
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    getApiRep() {
      const uri =
        "https://script.google.com/macros/s/AKfycbynhZQ14FP_JxAkR3aLmX8VxPiql5kjOaetpadl38k4zy31J5NNC9SazA35Tziw73EZ/exec";
      fetch(uri, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.items = result;
        });
    },
    transDate(date) {
      return date.substring(0, 10);
    },
  },
};
</script>