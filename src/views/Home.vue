<template>
  <div>
    <Header></Header>
    <b-container>
      <!-- <b-container fluid> -->
      <b-row>
        <b-col class="col-12 col-md-4">
          <b-container class="mt-5">
            <b-card>
              <template #header>
                <Chevron v-b-toggle.b-card-1></Chevron>
                {{ "股票相關" }}
              </template>
              <b-collapse id="b-card-1" visible>
                <b-row>
                  <b-col
                    class="col-12"
                    v-for="(item, index) in stockSelf"
                    :key="index"
                  >
                    <b-card
                      ><ul>
                        <li>{{ item.name }}</li>
                        <br />
                        <b-button
                          variant="success"
                          style="float: right"
                          @click="move(item.page)"
                          >查看</b-button
                        >
                      </ul></b-card
                    >
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-container>
        </b-col>
        <b-col class="col-12 col-md-4">
          <b-container class="mt-5">
            <b-card>
              <template #header>
                <Chevron v-b-toggle.b-card-2></Chevron>
                {{ "運動賽事" }}
              </template>
              <b-collapse id="b-card-2" visible>
                <b-row>
                  <b-col
                    class="col-12"
                    v-for="(item, index) in sports"
                    :key="index"
                  >
                    <b-card
                      ><ul>
                        <li>{{ item.name }}</li>
                        <br />
                        <b-button
                          variant="success"
                          style="float: right"
                          @click="move(item.page)"
                          >查看</b-button
                        >
                      </ul></b-card
                    >
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-container>
        </b-col>
        <b-col class="col-12 col-md-4">
          <b-container class="mt-5">
            <b-card>
              <template #header>
                <Chevron v-b-toggle.b-card-3></Chevron>
                {{ "個人筆記" }}
              </template>
              <b-collapse id="b-card-3" visible>
                <b-row>
                  <b-col
                    class="col-12"
                    v-for="(item, index) in catalogItems"
                    :key="index"
                  >
                    <b-card>
                      <ul>
                        <li>{{ item.name }}</li>
                        <br />
                        <b-button
                          variant="success"
                          style="float: right"
                          @click="move(item.page)"
                          >查看</b-button
                        >
                      </ul>
                    </b-card>
                  </b-col>
                </b-row>
              </b-collapse>
            </b-card>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Chevron from "@/components/Chevron.vue";

export default {
  components: {
    Header,
    Chevron,
  },
  data() {
    return {
      stockSelf: [
        { name: "轉倉測試", page: "Rollover" },
        { name: "淨值查詢", page: "StockApi" },
        { name: "股票交易紀錄", page: "StockRecord" },
      ],
      sports: [
        { name: "美國職棒MLB", page: "BaseBall" },
        { name: "美國職籃NBA", page: "BasketBall" },
        { name: "美國冰球NHL", page: "BasketBall" },
      ],
      catalogItems: [
        { name: "Vue", page: "VueHome/Pagination01" },
        { name: "Java", page: "VueHome" },
        { name: "DB", page: "VueHome" },
      ],
      selected: [],
      collapsed: true,
    };
  },
  methods: {
    test() {
      this.$router.push("StockHome/StockInfo");
    },
    move(page) {
      this.$router.push(page);
    },
  },
};
</script>