export default {
    methods: {
        getReadOtherApi() {
            return process.env.VUE_APP_READ_OTHER_API;
        },
        getReadAllValueApi() {
            return process.env.VUE_APP_READ_ALL_VALUE_API
        },
        getAllEtfUrl() {
            return process.env.VUE_APP_ALL_ETF_URL;
        },
        getExcelUrl() {
            return process.env.VUE_APP_EXCEL_URL;
        },
        getNbaApi() {
            return process.env.VUE_APP_NBA_API;
        },
    }
};