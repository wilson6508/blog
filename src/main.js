import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/bootstrapPlugins";
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.config.productionTip = false;
Vue.use(VueSidebarMenu);
Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
