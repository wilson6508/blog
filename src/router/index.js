import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import TeamList from "@/components/sport/TeamList.vue";
import NBA from "@/components/sport/NBA.vue";
import PriceHistory from "@/components/stock/PriceHistory.vue";
import WelcomePage from "@/components/welcome/WelcomePage.vue";
import StockHome from "@/components/stock/StockHome";
import StockInfo from "@/components/stock/StockInfo";
import StockLog from "@/components/stock/StockLog";
import TdTradeLog from "@/components/stock/TdTradeLog.vue";
import SpyVs00646 from "@/components/stock/SpyVs00646.vue";
import DailyConsumption from "@/components/life/DailyConsumption.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首頁"
    },
    children: [{
        path: "/WelcomePage",
        component: WelcomePage,
        meta: {
          title: "首頁"
        }
      },
      {
        path: "/TeamList",
        component: TeamList,
        meta: {
          title: "隊伍清單"
        }
      },
      {
        path: "/NBA",
        component: NBA,
        meta: {
          title: "NBA"
        }
      },
      {
        path: "/PriceHistory",
        component: PriceHistory,
        meta: {
          title: "股價折線圖"
        }
      },
      {
        path: "/SpyVs00646",
        component: SpyVs00646,
        meta: {
          title: "Spy Vs 00646"
        }
      },
      {
        path: "/TdTradeLog",
        component: TdTradeLog,
        meta: {
          title: "美股交易紀錄"
        }
      },
      {
        path: "/DailyConsumption",
        component: DailyConsumption,
        meta: {
          title: "日常消費"
        }
      },
    ],
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next("/WelcomePage");
  }
  document.title = to.meta.title;
  next();
});

export default router;