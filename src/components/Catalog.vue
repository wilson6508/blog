<template>
<div>
    <b-container class="mt-5">
    <b-card header="Vue js 相關">
        <b-row>
        <b-col cols="4" v-for="(item, index) in catalogItems" :key="index">
        <b-card>
        <ul>
        <li>{{ item.name }}</li>
        <br>
        <li>更新時間: {{ item.updateTime }}</li>
        <br>
        <b-button variant="success" style="float: right">查看</b-button>
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
            catalogItems: [
                {name: "bootstrap", updateTime: "2021-08-29"},
                {name: "bootstrap", updateTime: "2021-08-29"},
                {name: "bootstrap", updateTime: "2021-08-29"},
            ],
       } 
    },
}
</script>