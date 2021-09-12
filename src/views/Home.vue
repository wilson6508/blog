<template>
<div>

    <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="collapse navbar-collapse justify-content-end">
    <b-nav-item href="https://docs.google.com/forms/d/e/1FAIpQLSciIB-sX4oNoz25sqtvokGIHEu0fgSGlnV77ldIX64B876iGQ/viewform?vc=0&c=0&w=1&flr=0" target="_blank">聯絡作者</b-nav-item>
    </b-navbar-nav>
    </b-navbar>

    <b-container class="mt-5">
    <b-card header="運動賽事">
        <b-row>
        <b-col cols="4" v-for="(item, index) in sports" :key="index">
            <b-card><ul>
            <li>{{ item.name }}</li><br>
            <b-button variant="success" style="float: right" @click="move(item.page)">查看</b-button>
            </ul></b-card>
        </b-col>
        </b-row>
    </b-card>
    </b-container>

    <b-container class="mt-5">
    <b-card header="Vue js 相關123">
        <b-row>
        <b-col cols="4" v-for="(item, index) in catalogItems" :key="index">
        <b-card>
        <ul>
        <li>{{ item.name }}</li>
        <br>
        <li>更新時間: {{ item.updateTime }}</li>
        <br>
        <b-button variant="success" style="float: right" @click="test()">查看</b-button>
        </ul>
        </b-card>
        </b-col>
        </b-row>
    </b-card>
    </b-container>

</div>
</template>

<script>
export default {
    data() {
       return {
            sports:[
                {name: "美國職棒MLB", page: "2021-08-29"},
                {name: "美國職籃NBA", page: "BasketBall"},
            ],
            catalogItems: [
                {name: "bootstrap", updateTime: "2021-08-29"},
                {name: "bootstrap", updateTime: "2021-08-29"},
                {name: "bootstrap", updateTime: "2021-08-29"},
            ],
       } 
    },
    methods: {
        test() {
            this.$router.push("StockHome/StockInfo");
        },
        move(page) {
            this.$router.push(page);
        },
    }
}
</script>