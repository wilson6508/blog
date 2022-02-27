<template>
  <div
    class="modal fade"
    id="usaDividendId"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      role="document"
      style="max-width: 500px"
    >
      <div class="modal-content position-relative">
        <div class="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
          <button
            class="
              btn-close btn btn-sm btn-circle
              d-flex
              flex-center
              transition-base
            "
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-0">
          <div
            class="rounded-top-lg py-3 ps-4 pe-6"
            style="background-color: black"
          >
            <h4 class="mb-1" style="color: white">新增資料</h4>
          </div>
          <div class="p-4 pb-0">
            <div class="row mb-4">
              <div class="col-6">
                <label class="col-form-label">配發日期:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="modalInfo.date"
                />
              </div>
              <div class="col-6">
                <label class="col-form-label">股票代號:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="modalInfo.symbol"
                />
              </div>
              <div class="col-6">
                <label class="col-form-label">配發股利:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="modalInfo.ordinaryDividend"
                />
              </div>
              <div class="col-6">
                <label class="col-form-label">w8扣稅:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="modalInfo.w8Withholding"
                />
              </div>
              <div class="col-12">
                <label class="col-form-label">股息再投入(股):</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="modalInfo.delta"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            type="button"
            data-bs-dismiss="modal"
            @click="save()"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rowNum: 0,
      modalInfo: {
        date: "",
        symbol: "",
        ordinaryDividend: "",
        w8Withholding: "",
        delta: "",
      },
      mapping: new Map([
        [1, "date"],
        [2, "symbol"],
        [3, "ordinaryDividend"],
        [4, "w8Withholding"],
        [5, "delta"],
      ]),
    };
  },
  methods: {
    async save() {
      const url = this.getApiUrl("updateValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 3,
        data: this.getDataArr(this.rowNum, this.modalInfo, this.mapping),
      };
      await this.getApiResult(url, postBody);
      await this.$parent.readDividend();
    },
  },
};
</script>
