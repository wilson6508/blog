import Vue from "vue";
import VueRouter from "vue-router";
import Base from "@/views/Base.vue";
import Home from "@/views/Home.vue";
import DailyConsumption from "@/views/life/DailyConsumption.vue";
import TeamList from "@/components/sport/TeamList.vue";
import NBA from "@/components/sport/NBA.vue";
import PriceHistory from "@/components/stock/PriceHistory.vue";
import TdTradeLog from "@/components/stock/TdTradeLog.vue";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "Base",
  component: Base,
  meta: {
    title: "首頁"
  },
  children: [{
      path: "/home",
      component: Home,
      meta: {
        title: "首頁"
      }
    },
    {
      path: "life/dailyConsumption",
      component: DailyConsumption,
      meta: {
        title: "日常消費"
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
      path: "/stock/exchange",
      component: () => import("@/components/stock/Exchange.vue"),
      meta: {
        title: "Exchange"
      }
    },
    {
      path: "/TdTradeLog",
      component: TdTradeLog,
      meta: {
        title: "美股交易紀錄"
      }
    },
  ],
}, ];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next("/home");
  }
  document.title = to.meta.title;
  next();
});

export default router;