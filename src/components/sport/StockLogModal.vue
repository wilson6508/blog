<template>
  <div>
    <b-modal v-model="modalShow" title="新增交易紀錄" :hide-header-close="true">
      <template #modal-footer="{ cancel }">
        <b-button variant="primary" @click="save()">儲存</b-button>
        <b-button variant="dark" @click="cancel()">取消</b-button>
      </template>
      <b-container>
        <b-row>
          <label>交易日期:</label>
          <b-form-datepicker class="mb-2"></b-form-datepicker>
        </b-row>
        <b-row>
          <label>股票代號:</label>
          <b-form-input></b-form-input>
        </b-row>
        <b-row>
          <table class="table text-center" style="text-center">
            <thead>
              <tr>
                <th scope="col">股數</th>
                <th scope="col">價格</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b-form-input></b-form-input></td>
                <td><b-form-input></b-form-input></td>
                <td><i class="fas fa-plus-circle fa-lg mt-2"></i></td>
              </tr>
              <tr>
                <td><b-form-input></b-form-input></td>
                <td><b-form-input></b-form-input></td>
                <td><i class="fas fa-plus-circle fa-lg mt-2"></i></td>
              </tr>
            </tbody>
          </table>
        </b-row>
        <b-row>
          <label>交易類別:</label>
          <b-col
            ><b-form-radio
              name="radio01"
              value="false"
              class="badge bg-danger"
              style="font-size: 100%"
              >現買</b-form-radio
            ></b-col
          >
          <b-col
            ><b-form-radio
              name="radio01"
              value="true"
              class="badge bg-success"
              style="font-size: 100%"
              >現賣</b-form-radio
            ></b-col
          >
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
    };
  },
};
</script>
