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

    <b-container class="mt-5">
      <b-card>
        <template #header>
          <Chevron v-b-toggle.b-card-1></Chevron>
          {{ "股票相關" }}
        </template>
        <b-collapse id="b-card-1" visible>
          <b-row>
            <b-col
              class="col-12 col-md-4"
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

    <b-container class="mt-5">
      <b-card>
        <template #header>
          <Chevron v-b-toggle.b-card-2></Chevron>
          {{ "運動賽事" }}
        </template>
        <b-collapse id="b-card-2" visible>
          <b-row>
            <b-col
              class="col-12 col-md-4"
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

    <b-container class="mt-5">
      <b-card>
        <template #header>
          <Chevron v-b-toggle.b-card-3></Chevron>
          {{ "Vue js 相關" }}
        </template>
        <b-collapse id="b-card-3" visible>
          <b-row>
            <b-col
              class="col-12 col-md-4"
              v-for="(item, index) in catalogItems"
              :key="index"
            >
              <b-card>
                <ul>
                  <li>{{ item.name }}</li>
                  <br />
                  <li>更新時間: {{ item.updateTime }}</li>
                  <br />
                  <b-button
                    variant="success"
                    style="float: right"
                    @click="test()"
                    >查看</b-button
                  >
                </ul>
              </b-card>
            </b-col>
          </b-row>
        </b-collapse>
      </b-card>
    </b-container>

    <b-container class="mt-5">
      <b-row>
        <b-col cols="4">
          <v-select
            multiple
            v-model="selected"
            :options="['Canada', 'United States']"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Chevron from "@/components/Chevron.vue";

export default {
  components: {
    Chevron,
  },
  data() {
    return {
      stockSelf: [{ name: "股票交易紀錄", page: "StockRecord" }],
      sports: [
        { name: "美國職棒MLB", page: "2021-08-29" },
        { name: "美國職籃NBA", page: "BasketBall" },
        { name: "美國冰球NHL", page: "BasketBall" },
      ],
      catalogItems: [
        { name: "bootstrap", updateTime: "2021-08-29" },
        { name: "bootstrap", updateTime: "2021-08-29" },
        { name: "bootstrap", updateTime: "2021-08-29" },
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