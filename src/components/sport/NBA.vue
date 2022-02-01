<template>
  <div class="card">
    <div class="card-body position-relative">
      <div
        id="tableExample2"
        data-list='{"valueNames":["name","email","age"],"page":5,"pagination":true}'
      >
        <div class="table-responsive scrollbar">
          <table class="table table-bordered table-striped fs--1 mb-0">
            <thead class="bg-200 text-900">
              <tr>
                <th class="sort" data-sort="name">Name</th>
                <th class="sort" data-sort="email">Email</th>
                <th class="sort" data-sort="age">Age</th>
              </tr>
            </thead>
            <tbody class="list">
              <tr>
                <td class="name">Anna</td>
                <td class="email">anna@example.com</td>
                <td class="age">18</td>
              </tr>
              <tr>
                <td class="name">Homer</td>
                <td class="email">homer@example.com</td>
                <td class="age">35</td>
              </tr>
              <tr>
                <td class="name">Oscar</td>
                <td class="email">oscar@example.com</td>
                <td class="age">52</td>
              </tr>
              <tr>
                <td class="name">Emily</td>
                <td class="email">emily@example.com</td>
                <td class="age">30</td>
              </tr>
              <tr>
                <td class="name">Jara</td>
                <td class="email">jara@example.com</td>
                <td class="age">25</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <button
            class="btn btn-sm btn-falcon-default me-1"
            type="button"
            title="Previous"
            data-list-pagination="prev"
          >
            <span class="fas fa-chevron-left"></span>
          </button>
          <ul class="pagination mb-0"></ul>
          <button
            class="btn btn-sm btn-falcon-default ms-1"
            type="button"
            title="Next"
            data-list-pagination="next"
          >
            <span class="fas fa-chevron-right"> </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
