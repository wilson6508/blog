<template>
  <div>
    <div class="row">
      <!--左上table-->
      <div v-show="tradeLog" class="card col m-2">
        <div class="card-body position-relative">
          <!--按鈕列-->
          <h4 class="d-flex justify-content-center">交易紀錄</h4>
          <div class="d-flex align-items-center justify-content-end my-3">
            <button
              v-if="rightReadMode"
              class="btn btn-danger btn-sm mx-1"
              type="button"
              @click="rightMode('rightDeleteMode')"
            >
              刪除
            </button>
            <button
              v-if="rightReadMode"
              class="btn btn-success btn-sm"
              type="button"
            >
              新增
            </button>
            <button
              v-if="rightDeleteMode"
              class="btn btn-primary btn-sm mx-1"
              type="button"
            >
              刪除選取項目
            </button>
            <button
              v-if="rightDeleteMode"
              class="btn btn-dark btn-sm"
              type="button"
              @click="rightMode('rightReadMode')"
            >
              取消
            </button>
          </div>
          <div
            class="table-responsive scrollbar"
            style="max-height: 300px; overflow-y: auto"
          >
            <table class="table mb-0">
              <!--columns-->
              <thead class="text-black bg-300">
                <tr class="text-center">
                  <th
                    v-if="rightDeleteMode"
                    class="align-middle white-space-nowrap"
                  >
                    <div>
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </th>
                  <th
                    class="align-middle white-space-nowrap"
                    v-for="(item, index) in rightColumns"
                    :key="index"
                  >
                    {{ item.label }}
                  </th>
                  <th
                    v-if="rightReadMode"
                    class="align-middle white-space-nowrap"
                  >
                    編輯
                  </th>
                </tr>
              </thead>
              <!--data-->
              <tbody>
                <tr
                  v-for="(item, index) in rightApiResult"
                  :key="index"
                  class="text-center"
                >
                  <td
                    v-if="rightDeleteMode"
                    class="align-middle white-space-nowrap"
                  >
                    <div>
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.date }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.symbol }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.ordinaryDividend }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.w8Withholding }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.delta }}
                  </td>
                  <td
                    v-if="rightReadMode"
                    class="align-middle white-space-nowrap"
                  >
                    <button class="btn btn-falcon-default btn-sm" type="button">
                      編輯
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--右上table-->
      <div class="card col m-2">
        <div class="card-body position-relative">
          <!--按鈕列-->
          <div>
            <h4 class="d-flex justify-content-center">股息紀錄</h4>
            <button class="float-right">OK</button>
          </div>
          <div class="d-flex align-items-center justify-content-end my-3">
            <button
              v-if="rightReadMode"
              class="btn btn-danger btn-sm mx-1"
              type="button"
              @click="rightMode('rightDeleteMode')"
            >
              刪除
            </button>
            <button
              v-if="rightReadMode"
              class="btn btn-secondary btn-sm mx-1"
              type="button"
              @click="bigSize()"
            >
              放大視窗
            </button>
            <button
              v-if="rightReadMode"
              class="btn btn-success btn-sm mx-1"
              type="button"
              @click="createDividend()"
            >
              新增
            </button>
            <button
              v-if="rightDeleteMode"
              class="btn btn-primary btn-sm mx-1"
              type="button"
              @click="deleteDividend()"
            >
              刪除選取
            </button>
            <button
              v-if="rightDeleteMode"
              class="btn btn-dark btn-sm mx-1"
              type="button"
              @click="rightMode('rightReadMode')"
            >
              取消
            </button>
          </div>
          <!--table-->
          <div
            class="table-responsive scrollbar"
            :style="`max-height: ${mhpx}px; overflow-y: auto`"
          >
            <table class="table mb-0">
              <thead class="">
                <tr
                  class="text-center text-black bg-300"
                  style="position: sticky; top: 0; z-index: 1"
                >
                  <th
                    v-if="rightDeleteMode"
                    class="align-middle white-space-nowrap"
                  >
                    <div>
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </th>
                  <th
                    class="align-middle white-space-nowrap"
                    v-for="(item, index) in rightColumns"
                    :key="index"
                  >
                    {{ item.label }}
                  </th>
                  <th
                    v-if="rightReadMode"
                    class="align-middle white-space-nowrap"
                  >
                    編輯
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in rightApiResult"
                  :key="index"
                  class="text-center"
                >
                  <td
                    v-if="rightDeleteMode"
                    class="align-middle white-space-nowrap"
                  >
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="item.selected"
                      />
                    </div>
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.date }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.symbol }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.ordinaryDividend }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.w8Withholding }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.delta }}
                  </td>
                  <td
                    v-if="rightReadMode"
                    class="align-middle white-space-nowrap"
                  >
                    <button
                      class="btn btn-falcon-default btn-sm"
                      type="button"
                      @click="updateDividend(item)"
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--底下highChart-->
    <div v-show="highChart" class="row">
      <div class="card col m-2">
        <div class="card-body position-relative">
          <h4 class="d-flex justify-content-center">庫存變化</h4>
          <!--按鈕列-->
          <div class="d-flex align-items-center justify-content-end my-3">
            <button
              v-if="rightReadMode"
              class="btn btn-danger btn-sm mx-1"
              type="button"
              @click="rightMode('rightDeleteMode')"
            >
              刪除
            </button>
            <button
              v-if="rightReadMode"
              class="btn btn-success btn-sm"
              type="button"
            >
              新增
            </button>
            <button
              v-if="rightDeleteMode"
              class="btn btn-primary btn-sm mx-1"
              type="button"
            >
              刪除選取項目
            </button>
            <button
              v-if="rightDeleteMode"
              class="btn btn-dark btn-sm"
              type="button"
              @click="rightMode('rightReadMode')"
            >
              取消
            </button>
          </div>
          <div class="table-responsive scrollbar">
            <table class="table mb-0">
              <!--rightColumns-->
              <thead class="text-black bg-300">
                <tr class="text-center">
                  <th
                    v-if="rightDeleteMode"
                    class="align-middle white-space-nowrap"
                  >
                    <div>
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </th>
                  <th
                    class="align-middle white-space-nowrap"
                    v-for="(item, index) in rightColumns"
                    :key="index"
                  >
                    {{ item.label }}
                  </th>
                  <th
                    v-if="rightReadMode"
                    class="align-middle white-space-nowrap"
                  >
                    編輯
                  </th>
                </tr>
              </thead>
              <!--data-->
              <tbody class="overflow-auto">
                <tr
                  v-for="(item, index) in rightApiResult"
                  :key="index"
                  class="text-center"
                >
                  <td
                    v-if="rightDeleteMode"
                    class="align-middle white-space-nowrap"
                  >
                    <div>
                      <input class="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.date }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.symbol }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.ordinaryDividend }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.w8Withholding }}
                  </td>
                  <td class="align-middle white-space-nowrap">
                    {{ item.delta }}
                  </td>
                  <td
                    v-if="rightReadMode"
                    class="align-middle white-space-nowrap"
                  >
                    <button
                      class="btn btn-falcon-default btn-sm"
                      type="button"
                      @click="updateDivInfo(item)"
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--modal-->
    <a
      v-show="false"
      id="openUsaDividend"
      data-bs-toggle="modal"
      data-bs-target="#usaDividendId"
    ></a>
    <UsaDividend ref="usaDividend"></UsaDividend>
  </div>
</template>

<script>
import UsaDividend from "@/components/modal/UsaDividend";

export default {
  components: {
    UsaDividend,
  },
  async mounted() {
    await this.readDividend();
  },
  data() {
    return {
      rightApiResult: [],
      rightColumns: [
        { val: "date", label: "配發日期" },
        { val: "symbol", label: "股票代號" },
        { val: "ordinaryDividend", label: "配發股利" },
        { val: "w8Withholding", label: "w8扣稅" },
        { val: "delta", label: "股息再投入(股)" },
      ],
      rightReadMode: true,
      rightDeleteMode: false,
      tradeLog: true,
      highChart: true,
      mhpx: 300,
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
    // 打API
    async readApi(page) {
      const url = this.getApiUrl("readValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: page,
      };
      return await this.getApiResult(url, postBody);
    },
    async updateApi(page, dataArr) {
      const url = this.getApiUrl("updateValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: page,
        data: dataArr,
      };
      await this.getApiResult(url, postBody);
    },
    // 讀取table
    async readDividend() {
      const result = await this.readApi(3);
      if (result !== null) {
        const temp = result.map((item, index) => {
          item.selected = false;
          item.rowNum = index + 2;
          return item;
        });
        this.rightApiResult = temp.reverse();
      }
    },
    // 新增資料
    createDividend() {
      this.$refs.usaDividend.title = "新增資料";
      this.$refs.usaDividend.modalInfo = {};
      this.$refs.usaDividend.rowNum = this.rightApiResult.length + 2;
      document.getElementById("openUsaDividend").click();
    },
    // 更新資料
    updateDividend(item) {
      this.$refs.usaDividend.title = "編輯資料";
      this.$refs.usaDividend.modalInfo = JSON.parse(JSON.stringify(item));
      this.$refs.usaDividend.rowNum = item.rowNum;
      document.getElementById("openUsaDividend").click();
    },
    // 刪除資料
    async deleteDividend() {
      const tempArr = this.rightApiResult.filter((e) => e.selected);
      const dataArr = [];
      for (const item of tempArr) {
        item.date = "";
        item.symbol = "";
        item.ordinaryDividend = "";
        item.w8Withholding = "";
        item.delta = "";
        dataArr.push(...this.getDataArr(item.rowNum, item, this.mapping));
      }
      const url = this.getApiUrl("updateValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 3,
        data: dataArr,
      };
      await this.getApiResult(url, postBody);
      await this.readDividend();
    },
    // 控制模式
    rightMode(str) {
      this.rightReadMode = false;
      this.rightDeleteMode = false;
      switch (str) {
        case "rightReadMode": {
          this.rightReadMode = true;
          break;
        }
        case "rightDeleteMode": {
          this.rightDeleteMode = true;
          break;
        }
      }
    },
    // 放大視窗
    bigSize() {
      this.highChart = !this.highChart;
      this.tradeLog = !this.tradeLog;
      this.mhpx = 700;
    },
  },
};
</script>