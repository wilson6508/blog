<template>
  <div>
    <!--單層-->
    <div v-if="leftItem.use === 'first'">
      <li
        class="nav-item"
        :style="currentUrl === leftItem.url ? 'background-color: #efefbe' : ''"
      >
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
    <!--雙層-->
    <div v-if="leftItem.use === 'second'">
      <li class="nav-item">
        <a
          class="nav-link dropdown-indicator hvr-icon-grow"
          :href="`#${leftItem.id}`"
          role="button"
          data-bs-toggle="collapse"
          aria-expanded="true"
        >
          <div class="d-flex align-items-center">
            <span class="nav-link-icon">
              <span class="material-icons-outlined">{{
                leftItem.icon
              }}</span> </span
            ><span class="nav-link-text ps-1">{{ leftItem.label }}</span>
          </div>
        </a>

        <ul class="nav collapse show" :id="`${leftItem.id}`">
          <li
            class="nav-item"
            v-for="(item, index) in leftItem.children"
            :key="index"
            :style="currentUrl === item.url ? 'background-color: #efefbe' : ''"
          >
            <router-link
              class="nav-link hvr-icon-grow"
              :to="`/${item.url}`"
              role="button"
              data-bs-toggle=""
              aria-expanded="false"
            >
              <div class="d-flex align-items-center">
                <span class="nav-link-icon">
                  <span class="material-icons-outlined">{{ item.icon }}</span>
                </span>
                <span class="nav-link-text ps-1">{{ item.label }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </li>
    </div>
    <!--三層-->
    <div v-if="leftItem.use === 'third'">
      <!-- <li class="nav-item">
              <a
                class="nav-link dropdown-indicator hvr-icon-grow"
                href="#opv-listening"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="opv-listening"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-icon">
                    <span class="material-icons-outlined">preview</span> </span
                  ><span class="nav-link-text ps-1">觀測分析</span>
                </div>
              </a>

              <ul class="nav collapse show" id="opv-listening">
                <li class="nav-item">
                  <a
                    class="nav-link dropdown-indicator hvr-icon-grow"
                    href="#opv-list"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="multi-level"
                  >
                    <div class="d-flex align-items-center">
                      <span class="nav-link-icon"
                        ><span class="material-icons-outlined"
                          >article</span
                        ></span
                      ><span class="nav-link-text ps-1">文章</span>
                    </div>
                  </a>
                  <ul class="nav collapse show" id="opv-list">
                    <li class="nav-item active">
                      <a
                        class="nav-link hvr-icon-grow active"
                        href="Listening_List.html"
                        data-bs-toggle=""
                        aria-expanded="false"
                      >
                        <div class="d-flex align-items-center">
                          <span class="nav-link-icon"
                            ><span class="material-icons-outlined"
                              >list_alt</span
                            ></span
                          ><span class="nav-link-text ps-1">文章列表</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftItem: {
      type: Object,
    },
    currentUrl: {
      type: String,
    },
  },
  data() {
    return {
      bgColor: "",
    };
  },
  methods: {
    demo() {
      // console.log(this.$router.history.current.path);
      this.bgColor = "background-color: #efefbe";
    },
  },
};
</script>