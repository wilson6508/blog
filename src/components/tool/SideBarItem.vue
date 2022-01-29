<template>
  <div>
    <div v-if="leftItem.use === 'first'">
      <li class="nav-item">
        <router-link
          class="nav-link hvr-icon-grow"
          :to="`/${leftItem.url}`"
          role="button"
          data-bs-toggle=""
          aria-expanded="false"
        >
          <div class="d-flex align-items-center">
            <span class="nav-link-icon">
              <span class="material-icons-outlined">{{ leftItem.icon }}</span>
            </span>
            <span class="nav-link-text ps-1">{{ leftItem.label }}</span>
          </div>
        </router-link>
      </li>
    </div>
    <div v-if="leftItem.use === 'second'">second</div>
    <div v-if="leftItem.use === 'third'">third</div>
  </div>
</template>

<script>
export default {
  props: {
    leftItem: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>