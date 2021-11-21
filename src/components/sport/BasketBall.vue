<template>
  <div>
    <Header></Header>

    <b-container class="mt-4">
      <b-card>
        <template #header>
          <Chevron v-b-toggle.b-card-1></Chevron>
          查詢面板
        </template>
        <b-collapse id="b-card-1" visible>
          <b-row class="col-12">
            <div>
              <b-form-textarea
                class="mr-2"
                placeholder="Tall textarea"
                rows="15"
                v-model="area"
              ></b-form-textarea>
            </div>
            <!-- <span>&nbsp;選擇賽事 : </span>
            <b-form-checkbox-group
              class="chWidth"
              v-model="nbaSelected"
              :options="nbaOptions"
              text-field="text"
              value-field="value"
              disabled-field="disabled"
              plain
            ></b-form-checkbox-group> -->
          </b-row>
          <b-row class="mt-2">
            <b-col><b-button @click="test456()">OK</b-button></b-col>
          </b-row>
        </b-collapse>
      </b-card>
    </b-container>

    <b-container class="mt-4">
      <b-card>
        <template #header>
          <Chevron v-b-toggle.b-card-2></Chevron>
          查詢結果
        </template>
        <b-collapse id="b-card-2" visible>
          <b-table :items="gameArray" :fields="fields">
            <template #cell(spreads)="row">
              {{
                row.item.spreads > 0 ? "+" + row.item.spreads : row.item.spreads
              }}
            </template>
          </b-table>
        </b-collapse>
      </b-card>
    </b-container>

    <Footer></Footer>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Chevron from "@/components/Chevron.vue";

export default {
  components: {
    Header,
    Footer,
    Chevron,
  },
  // mounted() {
  //   this.getNbaOdds();
  // },
  data() {
    return {
      area: "",
      nbaSelected: [],
      nbaOptions: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" },
      ],
      // items: [],
      fields: [
        // { key: "sequence" },
        // { key: "mtid" },
        // { key: "boid" },
        // { key: "paid" },
        // { key: "lineid" }, // 客 < 主
        { key: "eid" }, // 賽事ID
        // { key: "partid" }, // 隊伍ID 大小ID
        // { key: "adj" }, // 盤口
        // { key: "pri" }, // 賠率
        { key: "name", label: "隊伍", class: "text-center" },
        { key: "spreads", label: "讓分", class: "text-center" },
        { key: "spreadsOdds", label: "讓分賠率", class: "text-center" },
        { key: "totals", label: "大小", class: "text-center" },
        { key: "totalsOdds", label: "大小賠率", class: "text-center" },
      ],
      mappingPartid: [
        { partid: 1143, name: "猶他爵士" },
        { partid: 1144, name: "明尼蘇達灰狼" },
        { partid: 1145, name: "奧克拉荷馬雷霆" },
        { partid: 1146, name: "波特蘭拓荒者" },
        { partid: 1148, name: "洛杉磯湖人" },
        { partid: 1149, name: "鳳凰城太陽" },
        { partid: 1150, name: "沙加緬度國王" },
        { partid: 1151, name: "洛杉磯快艇" },
        { partid: 1152, name: "金州勇士" },
        { partid: 1153, name: "聖安東尼奧馬刺" },
        { partid: 1155, name: "休士頓火箭" },
        { partid: 1156, name: "曼斐斯灰熊" },
        { partid: 1157, name: "紐奧良鵜鶘" },
        { partid: 1158, name: "邁阿密熱火" },
        { partid: 1159, name: "亞特蘭大老鷹" },
        { partid: 1161, name: "奧蘭多魔術" },
        { partid: 1162, name: "夏洛特黃蜂" },
        { partid: 1164, name: "底特律活塞" },
        { partid: 1165, name: "密爾瓦基公鹿" },
        { partid: 1166, name: "克里夫蘭騎士" },
        { partid: 1167, name: "芝加哥公牛" },
        { partid: 1168, name: "多倫多暴龍" },
        { partid: 1169, name: "布魯克林籃網" },
        { partid: 1160, name: "華盛頓巫師" },
        { partid: 1170, name: "紐約尼克" },
        { partid: 1171, name: "波士頓塞爾提克" },
        { partid: 1172, name: "費城76人" },
        { partid: 15143, name: "大" },
        { partid: 15144, name: "小" },
      ],
      gameArray: [],
      spreadsArray: [],
      totalsArray: [],
    };
  },
  methods: {
    getNbaOdds(apiUrl) {
      this.axios
        .get(apiUrl)
        .then((response) => {
          this.gameArray = response.data.data.openingLines;
          this.gameArray = this.gameArray.filter((e) => e.partid < 9999);
          this.gameArray = this.gameArray
            .sort(this.compareLineid)
            .sort(this.compareEid);
          for (const [index, element] of this.gameArray.entries()) {
            element.name = this.findName(element);
            element.guestHost = index % 2 === 0 ? "guest" : "host";
            element._rowVariant = index % 4 < 2 ? "danger" : "success";
          }
          this.spreadsArray = response.data.data.bestLines.filter(
            (e) => e.partid < 9999
          );
          this.totalsArray = response.data.data.bestLines.filter(
            (e) => e.partid > 9999
          );
          for (const item of this.gameArray) {
            item.spreads = this.findObjInArray(
              this.spreadsArray,
              "partid",
              item.partid
            ).adj;
            item.spreadsOdds = this.findObjInArray(
              this.spreadsArray,
              "partid",
              item.partid
            ).pri;
            const big = this.findBigSmall(this.totalsArray, 15143, item.eid);
            const small = this.findBigSmall(this.totalsArray, 15144, item.eid);
            if (item.guestHost === "guest") {
              item.totals = this.checkAdj(big);
              item.totalsOdds = this.checkPri(big);
            } else {
              item.totals = this.checkAdj(small);
              item.totalsOdds = this.checkPri(small);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    compareEid(a, b) {
      return a.eid - b.eid;
    },
    compareLineid(a, b) {
      return a.lineid - b.lineid;
    },
    findName(item) {
      let str = "";
      for (const team of this.mappingPartid) {
        if (item.partid === team.partid) {
          str = team.name;
        }
      }
      return str;
    },
    findObjInArray(array, propName, propValue) {
      return array.find((e) => e[propName] === propValue);
    },
    findBigSmall(array, partid, eid) {
      const temp = array.filter((e) => e.partid === partid);
      if (temp.find((e) => e.eid === eid) !== null) {
        return temp.find((e) => e.eid === eid);
      } else {
        return { adj: "", pri: "" };
      }
    },
    process(value) {
      if (value > 0) {
        return "+" + value;
      }
    },
    test456() {
      this.getNbaOdds(this.area);
    },
    checkAdj(item) {
      if (item !== undefined) {
        return item.adj;
      } else {
        return "";
      }
    },
    checkPri(item) {
      if (item !== undefined) {
        return item.pri;
      } else {
        return "";
      }
    },
  },
};
</script>