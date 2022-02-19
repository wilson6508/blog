<template>
  <div class="container-fluid" data-layout="container">
    <nav
      class="navbar navbar-opv navbar-light navbar-vertical navbar-expand-md"
    >
      <!--三明治-->
      <div class="d-flex align-items-center">
        <div class="toggle-icon-wrapper mt-2 mb-2">
          <button
            class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="功能選單"
          >
            <span class="navbar-toggle-icon"
              ><span class="toggle-line"></span
            ></span>
          </button>
        </div>
        <a class="navbar-brand" href="#">
          <div class="d-flex align-items-center py-3"></div>
        </a>
      </div>
      <!--sideBar-->
      <div
        class="collapse navbar-collapse position-relative"
        id="navbarVerticalCollapse"
      >
        <div class="bg-holder navbar-opv-shape"></div>
        <div class="navbar-vertical-content scrollbar position-relative">
          <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
            <SideBarItem
              v-for="(item, index) in catalog"
              :key="index"
              :leftItem="item"
              :currentUrl="currentUrl"
            ></SideBarItem>
          </ul>
        </div>
      </div>
    </nav>
    <div class="content p-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBarItem from "@/components/tool/SideBarItem.vue";

export default {
  name: "Home",
  components: {
    SideBarItem,
  },
  computed: {
    currentUrl() {
      return this.$route.path.substring(1);
    },
  },
  data() {
    return {
      catalog: [
        {
          id: "leftItem1",
          use: "first",
          url: "WelcomePage",
          icon: "cottage",
          label: "首頁",
        },
        {
          id: "leftItem2",
          use: "second",
          icon: "directions_bike",
          label: "職業運動",
          children: [
            {
              url: "TeamList",
              icon: "format_list_bulleted",
              label: "球隊清單",
            },
            {
              url: "NBA",
              icon: "sports_basketball",
              label: "NBA",
            },
          ],
        },
        {
          id: "leftItem3",
          use: "second",
          icon: "paid",
          label: "股票",
          children: [
            {
              url: "PriceHistory",
              icon: "show_chart",
              label: "股價折線圖",
            },
            {
              url: "SpyVs00646",
              icon: "sports_kabaddi",
              label: "Spy Vs 00646",
            },
            {
              url: "TdTradeLog",
              icon: "savings",
              label: "美股交易紀錄",
            },
          ],
        },
        // { use: "second", url: "", icon: "home", label: "職業運動" },
        // { use: "third", url: "", icon: "home", label: "職業運動" },
      ],
    };
  },
  mounted() {
    var isFluid = JSON.parse(localStorage.getItem("isFluid"));
    if (isFluid) {
      var container = document.querySelector("[data-layout]");
      container.classList.remove("container");
      container.classList.add("container-fluid");
    }
    var navbarStyle = localStorage.getItem("navbarStyle");
    if (navbarStyle && navbarStyle !== "transparent") {
      document
        .querySelector(".navbar-vertical")
        .classList.add(`navbar-${navbarStyle}`);
    }
  },
};
</script>
