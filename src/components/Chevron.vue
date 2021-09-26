<template>
  <div>
    <i
      :class="[
        collapsed ? 'fas fa-chevron-up' : 'fas fa-chevron-down',
        'fa-lg mt-1',
      ]"
      style="cursor: pointer; float: right"
      @click="collapsed = !collapsed"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
    };
  },
};
</script>