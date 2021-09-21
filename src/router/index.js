import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import StockHome from "@/components/stock/StockHome";
import StockInfo from "@/components/stock/StockInfo";
import StockLog from "@/components/stock/StockLog";
import BasketBall from "@/components/sport/BasketBall";
// import Table from "@/components/bsnotes/Table.vue";
import StockRecord from "@/components/stockSelf/StockRecord.vue";

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