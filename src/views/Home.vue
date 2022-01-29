<template>
  <div class="ms-4">
    <nav
      class="navbar navbar-opv navbar-light navbar-vertical navbar-expand-md"
    >
      <div class="d-flex align-items-center">
        <div class="toggle-icon-wrapper mt-2 mb-2">
          <button
            class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="切換選單"
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
      <div
        class="collapse navbar-collapse position-relative"
        id="navbarVerticalCollapse"
      >
        <div class="bg-holder navbar-opv-shape"></div>
        <div class="navbar-vertical-content scrollbar position-relative">
          <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
            <li class="nav-item">
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
                    <span class="material-icons-two-tone hvr-icon"
                      >preview</span
                    > </span
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
                        ><span class="material-icons-outlined hvr-icon"
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
                            ><span class="material-icons-outlined hvr-icon"
                              >list_alt</span
                            ></span
                          ><span class="nav-link-text ps-1">文章列表</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MainPage",
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
