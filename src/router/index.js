import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import StockHome from "@/components/stock/StockHome";
import StockInfo from "@/components/stock/StockInfo";
import StockLog from "@/components/stock/StockLog";
import BasketBall from "@/components/sport/BasketBall";
import VueHome from "@/components/vue/VueHome.vue";
import Pagination01 from "@/components/vue/Pagination01.vue";
import Pagination02 from "@/components/vue/Pagination02.vue";
import StockRecord from "@/components/stockSelf/StockRecord.vue";
import StockApi from "@/components/stockSelf/StockApi.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首頁"
    }
  },
  {
    path: "/StockHome",
    name: "StockHome",
    component: StockHome,
    children: [{
        path: "StockInfo",
        name: "StockInfo",
        component: StockInfo,
        meta: {
          title: "股票資訊"
        }
      },
      {
        path: "StockLog",
        name: "StockLog",
        component: StockLog,
        meta: {
          title: "交易紀錄"
        }
      },
    ]
  },
  {
    path: "/BasketBall",
    name: "BasketBall",
    component: BasketBall,
    meta: {
      title: "NBA"
    }
  },
  {
    path: "/StockRecord",
    name: "StockRecord",
    component: StockRecord,
    meta: {
      title: "股票交易紀錄"
    }
  },
  {
    path: "/StockApi",
    name: "StockApi",
    component: StockApi,
    meta: {
      title: "淨值查詢"
    }
  },
  {
    path: "/VueHome",
    name: "VueHome",
    component: VueHome,
    children: [{
        path: "Pagination01",
        name: "Pagination01",
        component: Pagination01,
        meta: {
          title: "分頁處理01"
        }
      },
      {
        path: "Pagination02",
        name: "Pagination02",
        component: Pagination02,
        meta: {
          title: "分頁處理02"
        }
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;