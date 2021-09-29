<template>
  <div :style="hideSideBar ? 'padding-left:50px;' : 'padding-left:250px;'">
    <sidebar-menu
      :menu="menu"
      :theme="'default-theme'"
      :collapsed="true"
      :width="'250px'"
      @toggle-collapse="hideSideBar = !hideSideBar"
    >
    </sidebar-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      hideSideBar: true,
    };
  },
  mounted() {
    this.menu = [
      // {
      //   header: true,
      //   title: "Table功能筆記",
      //   hiddenOnCollapse: true,
      // },
      {
        href: "/",
        title: "回首頁",
        icon: "far fa-file-alt",
      },
      {
        href: "/VueHome/Pagination01",
        title: "Table分頁功能",
        icon: "fas fa-thumbtack",
        child: [
          {
            href: "/VueHome/Pagination01",
            title: "分頁處理01",
            icon: "fas fa-asterisk",
          },
          {
            href: "/VueHome/Pagination02",
            title: "分頁處理02",
            icon: "fas fa-asterisk",
          },
        ],
      },
    ];
  },
};
</script>
