<template>
<div>
    <a
      v-show="false"
      id="modalConsumption"
      data-bs-toggle="modal"
      data-bs-target="#consumptionModal"
    ></a>
  <div
    class="modal fade"
    id="consumptionModal"
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
            <h4 class="mb-1" style="color: white">{{ title }}</h4>
          </div>
          <div class="p-4 pb-0">
            <div class="row mb-3">
              <div class="col-6">
                <label class="col-form-label">類型:</label>
                <select class="form-select" v-model="modalInfo.type">
                  <option value="">請選擇</option>
                  <option
                    v-for="(item, index) in typeArr"
                    :key="index"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="col-6">
                <label class="col-form-label">日期:</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="modalInfo.date"
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <label class="col-form-label">地點:</label>
                <select
                  class="form-select"
                  v-model="modalInfo.place"
                  :disabled="modalInfo.type === ''"
                >
                  <option value="">
                    {{ modalInfo.type === "" ? "請先選擇類型" : "請選擇" }}
                  </option>
                  <option
                    v-for="(item, index) in placeArr"
                    :key="index"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="col-6">
                <label class="col-form-label">內容:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="modalInfo.content"
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <label class="col-form-label">消費金額:</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="modalInfo.amount"
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
</div>  
</template>

<script>
export default {
  computed: {
    placeArr() {
      let arr = [];
      switch (this.modalInfo.type) {
        case "飲食": {
          arr = ["鍋貼", "全聯", "7-11", "麥當勞", "早餐店", "寧記麻辣", "東門鴨莊", "雞二拉麵", "麻古茶坊"];
          break;
        }
        case "交通費": {
          arr = ["公車", "捷運站", "加油站"];
          break;
        }
        case "電信費": {
          arr = ["無"];
          break;
        }
        case "日用品": {
          arr = ["全聯"];
          break;
        }
      }
      return arr;
    },
  },
  watch: {
    "modalInfo.type"() {
      this.modalInfo.place = "";
    },
  },
  data() {
    return {
      title: "",
      typeArr: ["飲食", "交通費", "電信費", "日用品"],
      rowNum: 0,
      modalInfo: {
        type: "",
        date: "",
        place: "",
        content: "",
        amount: 0,
      },
      mapping: new Map([
        [1, "type"],
        [2, "date"],
        [3, "place"],
        [4, "content"],
        [5, "amount"],
      ]),
    };
  },
  methods: {
    async save() {
      this.loadingSwal("儲存資料中", -1);
      const url = this.getApiUrl("updateValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 4,
        data: this.getDataArr(this.rowNum, this.modalInfo, this.mapping),
      };
      await this.getApiResult(url, postBody);
      this.$emit("reRead");
      this.simpleSwal("儲存成功", "success");
    },
  },
};
</script>
