export default {
    methods: {
        getReadOtherApi() {
            return process.env.VUE_APP_READ_OTHER_API;
        },
        getAllEtfUrl() {
            return process.env.VUE_APP_ALL_ETF_URL;
        }
    }
};