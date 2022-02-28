import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
    confirmButtonText: "確定",
    confirmButtonColor: "#007bff",
    cancelButtonText: "取消",
    cancelButtonColor: "gray",
};
Vue.use(VueSweetalert2, options);

export default {
    methods: {
        getApiUrl(str) {
            let url = "";
            switch (str) {
                case "readValue": {
                    url = process.env.VUE_APP_READ_VALUE;
                    break;
                }
                case "updateValue": {
                    url = process.env.VUE_APP_UPDATE_VALUE;
                    break;
                }
                case "firstExcel": {
                    url = process.env.VUE_APP_FIRST_EXCEL;
                    break;
                }
                case "secondExcel": {
                    url = process.env.VUE_APP_SECOND_EXCEL;
                    break;
                }
            }
            return url;
        },
        async getApiResult(url, postBody) {
            let result = null;
            await this.axios
                .post(url, JSON.stringify(postBody))
                .then((response) => {
                    result = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            return result;
        },
        getDataArr(rowNum, item, mapping) {
            const dataArr = [];
            for (let [key, value] of mapping) {
                dataArr.push({
                    row: rowNum,
                    col: key,
                    val: item[value],
                });
            }
            return dataArr;
        },
        errorSwal(title, text, icon, html, button, timer, width) {
            const swalSetting = {
                title: title,
                text: text,
                html: html,
                icon: icon, // (warning, error, success, info, question)
                showConfirmButton: button,
                showCancelButton: false,
                heightAuto: false,
            };
            if (timer !== -1) {
                swalSetting.timer = timer;
            }
            if (width) {
                swalSetting.width = width;
            }
            this.$swal.fire(swalSetting);
        },
        loadingSwal(title, timer) {
            this.errorSwal(
                `${title}`,
                "",
                "info",
                `<button class="btn" type="button" disabled>
                 <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                 <span class="sr-only">Loading...</span>
                 </button>`,
                false,
                timer,
            );
        },
        simpleSwal(title, icon) {
            this.errorSwal(title, "", icon, "", true, -1);
        },
    }
};