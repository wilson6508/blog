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
    }
};