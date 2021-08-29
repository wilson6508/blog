<template>
<div :style="hideSideBar ? 'padding-left:50px;' : 'padding-left:250px;'">
    <sidebar-menu
      :menu="menu"
      :theme="'default-theme'"
      :collapsed="true"
      :width="'250px'"
      @toggle-collapse="hideSideBar = !hideSideBar">
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
       } 
    },
    mounted() {
        this.menu = [
            {
                href: "/",
                title: "回首頁",
                icon: "far fa-file-alt",
            },
            {
                href: "/StockHome/StockInfo",
                title: "股票資訊",
                icon: "far fa-file-archive",
            },
            {
                href: "/StockHome/StockLog",
                title: "交易紀錄",
                icon: "fas fa-file-signature",
            },
        ];
  },
}
</script>
