<template>
  <div class="row">
    <div class="card col m-2">
      <div class="card-body position-relative">
        <h4 class="d-flex justify-content-center fw-black">日常消費</h4>
        <!--按鈕列-->
        <!-- <div class="d-flex align-items-center justify-content-end my-3">
          <button class="btn btn-danger btn-sm mx-1" type="button">刪除</button>
          <button class="btn btn-success btn-sm" type="button" @click="create()">新增</button>
          <button class="btn btn-primary btn-sm mx-1" type="button">刪除選取</button>
          <button class="btn btn-dark btn-sm" type="button">取消</button>
        </div> -->
        <div class="my-3">
          <div class="float-start"><input class="form-control" placeholder="篩選日期" type="text" /></div>
          <div class="float-start ms-2"><input class="form-control" placeholder="篩選類型" type="text" /></div>
          <button v-if="deleteMode" class="float-end btn btn-dark" type="button" @click="goToMode('readMode')">取消</button>
          <button v-if="deleteMode" class="float-end btn btn-primary mx-1" type="button" @click="deleteInfo()">刪除選取</button>
          <button v-if="readMode" class="float-end btn btn-success" type="button" @click="create()">新增</button>
          <button v-if="readMode && resultArr.length > 0" class="float-end btn btn-danger mx-1" type="button" @click="goToMode('deleteMode')">刪除</button>
        </div><br><br>        
        <!--資料列-->
        <div class="table-responsive scrollbar">
            <table class="table mb-0">
              <thead class="text-black bg-300">
                <tr class="text-center">
                  <th v-if="deleteMode && resultArr.length > 0" class="align-middle white-space-nowrap"><input class="form-check-input" type="checkbox" v-model="selectAll"/></th>
                  <th class="align-middle white-space-nowrap" v-for="(item, index) in columns" :key="index">{{ item.label }}</th>
                  <th v-if="readMode" class="align-middle white-space-nowrap">編輯</th>
                </tr>
              </thead>
              <tbody class="overflow-auto">
                <tr v-for="(item, index) in resultArr" :key="index" class="text-center">
                  <td v-if="deleteMode" class="align-middle white-space-nowrap"><input class="form-check-input" type="checkbox" v-model="item.selected" /></td>
                  <td class="align-middle white-space-nowrap">{{ item.type }}</td>
                  <td class="align-middle white-space-nowrap">{{ item.date }}</td>
                  <td class="align-middle white-space-nowrap">{{ item.place }}</td>
                  <td class="align-middle white-space-nowrap">{{ item.content }}</td>
                  <td class="align-middle white-space-nowrap">{{ item.amount }}</td>
                  <td v-if="readMode" class="align-middle white-space-nowrap"><button class="btn btn-falcon-default btn-sm" type="button" @click="update(item)">編輯</button></td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
    <!--modal-->
    <Consumption ref="consumption" @reRead="read"></Consumption>
  </div>
</template>

<script>
import Consumption from "@/components/modal/Consumption";

export default {
  components: {
    Consumption,
  },
  async mounted() {
    this.loadingSwal("載入資料中", -1);
    await this.read();
    this.loadingSwal("載入資料中", 1);
  },
  computed: {
    selectAll: {
      get() {
          return this.resultArr.length === this.resultArr.filter(e => e.selected).length;
      },
      set(val) {
        this.resultArr.forEach(element => {
            element.selected = val;
        });
      },
    }
  },
  data() {
    return {
        readMode: true,
        deleteMode: false,
        columns: [
            { val: "type", label: "類型" },
            { val: "date", label: "日期" },
            { val: "place", label: "地點" },
            { val: "content", label: "內容" },
            { val: "amount", label: "消費金額" },
        ],
        resultArr: [],
    };
  },
  methods: {
    goToMode(str) {
        this.readMode = false;
        this.deleteMode = false;
        switch(str) {
            case "readMode": {
                this.readMode = true;
                break;
            }
            case "deleteMode": {
                this.deleteMode = true;
                break;
            }
        }
    },     
    create() {
      this.$refs.consumption.title = "新增資料";
      this.$refs.consumption.rowNum = this.resultArr.length + 2;
      this.$refs.consumption.modalInfo = { type: "", place: "" };
      document.getElementById("modalConsumption").click();
    },
    async read() {
      const url = this.getApiUrl("readValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 4,
      };
      let temp = await this.getApiResult(url, postBody);
      for (const [index, item] of temp.entries()) {
        item.selected = false;
        item.rowNum = index + 2;
      }
      temp = temp.filter(e => e.date !=="" );
      this.resultArr = temp.reverse();
    },
    update(item) {
      this.$refs.consumption.title = "編輯資料";
      this.$refs.consumption.rowNum = item.rowNum;
      this.$refs.consumption.modalInfo = JSON.parse(JSON.stringify(item));
      document.getElementById("modalConsumption").click();
    },
    async deleteInfo() {
      this.loadingSwal("刪除資料中", -1);
      const tempArr = this.resultArr.filter((e) => e.selected);
      const dataArr = [];
      for (const item of JSON.parse(JSON.stringify(tempArr))) {
        item.type = "";
        item.date = "";
        item.place = "";
        item.content = "";
        item.amount = "";
        dataArr.push(...this.getDataArr(item.rowNum, item, this.$refs.consumption.mapping));
      }
      const url = this.getApiUrl("updateValue");
      const postBody = {
        url: this.getApiUrl("secondExcel"),
        page: 4,
        data: dataArr,
      };
      await this.getApiResult(url, postBody);
      await this.read();
      this.simpleSwal("刪除成功", "success");
    },
  },
};
</script>
