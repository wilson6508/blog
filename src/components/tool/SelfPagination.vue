<template>
  <div>
    <b-pagination-nav
      v-model="currentPage"
      :number-of-pages="pages"
      base-url="#"
      first-number
      last-number
    >
      <template #prev-text>
        <span class="material-icons-outlined">chevron_left</span>
      </template>
      <template #next-text>
        <span class="material-icons-outlined">chevron_right</span>
      </template>
    </b-pagination-nav>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
    },
  },
  watch: {
    pages() {
      this.currentPage = 1;
    },
    currentPage() {
      this.$emit("currentPage", this.currentPage);
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
};
</script>
