<template>
  <div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card>
            <div class="items-click-add">
              <h3>Danh sách phiếu nhập</h3>
              <div>
                <div class="pseudo-search">
                  <!--   @keyup="onSeach()"
                    v-model="searchit_form.material_name" -->
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    autofocus
                    required
                  />
                  <button class="fa fa-search" type="submit"></button>
                </div>

                <b-button v-b-modal.modal-1 variant="success"
                  >Thêm mới</b-button
                >

                <b-modal
                  class="model-import"
                  id="modal-1"
                  size="xl"
                  hide-footer
                  title="Thêm phiếu nhập"
                  ref="ModalAdd"
                >
                  <div>
                    <b-form @submit="submitImportBill" v-if="show">
                      <b-row>
                        <b-col>
                          <b-form-group
                            id="input-group-1"
                            label="Kho hàng"
                            label-for="input-1"
                          >
                            <b-form-select
                              v-model="form.warehouseCode"
                              :options="warehouseOptions"
                              value-field="code"
                              text-field="name"
                            >
                            </b-form-select>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Nhà cung cấp"
                            label-for="input-1"
                          >
                            <b-form-select
                              v-model="form.supplierCode"
                              :options="supplierOptions"
                              value-field="code"
                              text-field="name"
                            >
                            </b-form-select>
                          </b-form-group>

                          <b-button
                            type="submit"
                            variant="success"
                            v-b-modal.my-modal1
                            >Chọn</b-button
                          >
                        </b-col>
                      </b-row>
                    </b-form>
                  </div>
                  <b-button type="reset" variant="light">Đóng</b-button>
                </b-modal>
              </div>
            </div>

            <!-- Table -->
            <b-row>
              <b-col lg="12">
                <div>
                  <div class="content-table">
                    <b-table
                      class="table-sc"
                      hover
                      id="my-table"
                      :items="items"
                      :per-page="perPage"
                      :current-page="currentPage"
                      :fields="fields"
                    >
                      <template #cell(actions)="row">
                        <b-button v-b-modal.my-modal @click="edit(row.item.id)">
                          Sửa
                        </b-button>
                        <b-button @click="ItemDelete(row.item.id)">
                          Xóa
                        </b-button>
                      </template>
                    </b-table>
                    <b-card-footer class="py-4 d-flex justify-content-start">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        first-number
                        last-number
                      ></b-pagination>
                    </b-card-footer>
                  </div>
                  <!--    Add modal  1 -->
                  <b-modal id="my-modal1" size="lg">
                    <b-row>
                      <b-col lg="6">
                        <form @submit="submitAdd">
                          <b-form-group
                            id="input-group-1"
                            label="Sản phẩm"
                            label-for="input-1"
                          >
                            <b-form-select
                              v-model="form1.commodityCode"
                              :options="commodityOptions"
                              value-field="code"
                              text-field="name"
                            >
                            </b-form-select>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="số lượng"
                            label-for="input-1"
                            type="number"
                          >
                            <b-form-input
                              id="input-1"
                              v-model="form1.quantity"
                              placeholder="Nhập số lượng"
                              required
                              type="number"
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Đơn giá"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              type="number"
                              v-model="form1.price"
                              placeholder="Nhập đơn giá"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-button type="submit">Thêm mới</b-button>
                        </form>
                      </b-col>

                      <b-col lg="6">
                        <div class="table-import">
                          <b-table
                            head-variant="dark"
                            striped
                            hover
                            :items="items1"
                            :fields="importBillFields"
                          ></b-table>
                          <!-- <table class="table text-center">
                      <thead>
                        <tr>
                          <th scope="col">Tên Sản Phẩm</th>
                          <th scope="col">Số Lượng</th>
                          <th scope="col">Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in cart" :key="product.id">
                          <td>{{ product.food_name }}</td>
                          <td>
                            <button
                              @click="decreaseQ(product)"
                              class="btn btn-info btn-sm"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              v-model="product.amount"
                              style="width: 40px"
                              min="1"
                            />

                            <button
                              @click="increaseQ(product)"
                              class="btn btn-info btn-sm"
                            >
                              +
                            </button>
                          </td>
                          <td>{{ product.food_price }}</td>
                        </tr>
                      </tbody>
                    </table> -->
                        </div>
                        <b-button @click="onSubmitImportBillDetail()" variant="success"
                          >Nhập hàng</b-button
                        >
                      </b-col>
                    </b-row>
                  </b-modal>
                  <!-- Modal  -->
                  <b-modal
                    id="my-modal"
                    ref="editSupModal"
                    title="Thông tin chi tiết phiếu nhập"
                    ok-only
                  >
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">
                        Xem thông tin phiếu nhập
                      </h2>
                      <div>
                        <b-form @submit="update()" v-if="show">
                          <b-form-group
                            id="input-group-1"
                            label="Mã hàng hóa"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập mã hàng hóa"
                              v-model="editform.code"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Tên hành hóa"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập tên hàng hóa"
                              v-model="editform.name"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Trạng thái"
                            label-for="input-1"
                          >
                            <b-form-select
                              v-model="editform.status"
                              :options="options1"
                            >
                            </b-form-select>
                          </b-form-group>

                          <!-- Show Modal Nguyên Liệu -->

                          <!-- Button Click Submit -->
                          <div class="link-btn">
                            <b-button type="submit" variant="success"
                              >Xác Nhận</b-button
                            >
                            <b-button type="reset" variant="light"
                              >Đóng</b-button
                            >
                          </div>
                        </b-form>
                      </div>
                    </div>
                  </b-modal>
                </div>
              </b-col>
            </b-row>
          </card>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";

export default {
  components: {
    // [Dropdown.name]: Dropdown,
    // [DropdownItem.name]: DropdownItem,
    // [DropdownMenu.name]: DropdownMenu,
    // [Table.name]: Table,
    // [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      meterialdetail: {
        meterial: "",
      },
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],

      selected: null,
      options1: [
        { value: null, text: "Please select an option" },
        { value: 0, text: "Còn giao dịch" },
        { value: 1, text: "Ngừng giao dịch" },
      ],
      selected: null,
      options2: [
        { value: null, text: "Kho 1" },
        { value: "a", text: "Kho 2" },
        { value: "b", text: "Kho 3" },
      ],
      options3: [
        { value: null, text: "Kho 1" },
        { value: "a", text: "Kho 2" },
        { value: "b", text: "Kho 3" },
      ],
      options4: [
        { value: null, text: "Kho 1" },
        { value: "a", text: "Kho 2" },
        { value: "b", text: "Kho 3" },
      ],
      isEdit: null,
      // projects,
      // users,

      perPage: 10,
      currentPage: 1,

      form: {
        warehouseCode: "",
        supplierCode: "",
      },
      form1: {
        commodityCode: "",
        quantity: "",
        price: "",
      },
      editform: {
        id: "",
        name: "",
        code: "",
        status: "",
      },
       show: true,
      importBillFields: [
        {
          key: "commodity",
          label: "Tên hàng",
        },
        {
          key: "quantity",
          label: "Số lượng",
        },
        {
          key: "price",
          label: "Đơn giá",
        },
      ],
      arrObj:[],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      show: true,
      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "fullName",
          label: "Người nhập",
        },
        {
          key: "supplierName",
          label: "Nhà cung cấp",
        },
        {
          key: "warehouseName",
          label: "Tên kho",
        },

        { key: "actions", label: "Hành động" },
      ],

     
      // searchit_form: {
      //   material_name: "",
      // },
      items: [],

      items1: [],

      selectedCategory: null,
      warehouseOptions: [],

      selectedSupplier: null,
      supplierOptions: [],

      selectedCommodity: null,
      commodityOptions: [],

      status: [],
    };
  },
  created() {
    this.getWarehouse();
    this.getSupplier();
    this.getCommodity();
    this.getImportBill();
    // setInterval(() => {
    //   this.onSeach();
    // }, 500);
  },

  methods: {
    getCommodity() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/commodity/list`)
        .then((response) => response.data)
        .then((res) => {
          this.commodityOptions = res.object;
        });
    },

    getSupplier() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/supplier/list`)
        .then((response) => response.data)
        .then((res) => {
          this.supplierOptions = res.object;
        });
    },

    getWarehouse() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/warehouse/list`)
        .then((response) => response.data)
        .then((res) => {
          this.warehouseOptions = res.object;
        });
    },

    //SEARCH METERIAL
    // searchItem(payload) {
    //   const path = "http://127.0.0.1:8000/material/search_material/";
    //   axios
    //     .post(path, payload)
    //     .then((res) => {
    //       this.items = res.data.data.map((material) => {
    //         return {
    //           mã_nguyên_liệu: material.id,
    //           tên_nguyên_liệu: material.material_name,
    //         };
    //       });
    //     })

    //     .catch((error) => {
    //       // this.getSuplier();
    //       console.log(error);
    //     });
    // },

    // onSeach() {
    //   const payload = {
    //     material_name: this.searchit_form.material_name,
    //   };

    //   this.searchItem(payload);
    // },
    // GET ALL METERIAL
    getImportBill() {
      axios
        .get(`http://localhost:9090/rest/v1/import-bill/list`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.object.map((importBill) => {
            return {
              id: importBill.id,
              fullName: importBill.fullName,
              supplierName: importBill.supplierName,
              warehouseName: importBill.warehouseName,
            };
          });
        });
    },
    AddImportBill(payload) {
      const path = "http://localhost:9090/rest/v1/import-bill/add-import-bill";
      axios
        .post(path, payload)
        .then((res) => {
          this.getImportBill();
        })
        .catch((error) => {
          this.getImportBill();
          console.log(error);
        });
    },

    submitImportBill(event) {
      event.preventDefault();
      this.$refs.ModalAdd.hide();
      const payload = {
        warehouseCode: this.form.warehouseCode,
        supplierCode: this.form.supplierCode,
      };

      this.$refs["ModalAdd"].hide();
      this.AddImportBill(payload);
      this.onReset();
     
    },

    AddImportBillDetail(payload){
      const path =
        "http://localhost:9090/rest/v1/import-bill-detail/add-import-bill-detail";
      axios
        .post(path, payload)
        .then((res) => {
          this.getImportBill();
        })
        .catch((error) => {
          this.getImportBill();
          console.log(error);
        });
    },
    onSubmitImportBillDetail(){
      event.preventDefault();
      this.$refs.ModalAdd.hide();
      this.AddImportBillDetail( this.arrObj)
       this.$refs["ModalAdd"].hide();
      this.AddImportBill(payload);
      this.onReset();
    },

    addArrayImportBillDetail(payload) {
      payload.commodity = this.commodityOptions.find(i => i.code == payload.commodityCode).name;
      const availabeCommodity = this.items1.find(i => i.commodityCode == payload.commodityCode);
      var obj = JSON.parse('{"data" :[]}');
      if(availabeCommodity){
          availabeCommodity.quantity = parseInt(availabeCommodity.quantity) + parseInt(payload.quantity);
          availabeCommodity.price = payload.price;
          console.log(this.items1);
          obj.data = JSON.parse(JSON.stringify(this.items1));
      }else{
          this.items1 = [...this.items1, payload];
          obj.data = JSON.parse(JSON.stringify(this.items1));
      }
      this.arrObj = obj;
      console.log(this.arrObj , " arr Data");
      console.log(obj , "arrdefaut");
      
      // spread operator ES6
     
    },
    submitAdd() {
      const payload = {
        commodityCode: this.form1.commodityCode,
        quantity: this.form1.quantity,
        price: this.form1.price,
      };
      this.addArrayImportBillDetail(payload);
    },
    // ADD Import Bill
    // addImportBill(payload) {
    //   const path = "http://localhost:9090/rest/v1/import-bill/add-import-bill";
    //   axios
    //     .post(path, payload)
    //     .then((res) => {
    //       this.getImportBill();
    //     })
    //     .catch((error) => {
    //       this.getImportBill();
    //       console.log(error);
    //     });
    // },

    // onSubmit(event) {
    //   event.preventDefault();
    //   this.$refs.ModalAdd.hide();
    //   const payload = {
    //     code: this.form.warehouseCode,
    //     name: this.form.supplierCode,
    //   };
    //   this.$refs["ModalAdd"].hide();
    //   this.addImportBill(payload);
    //   this.onReset();
    // },
    // // EDIT METERIAL
    edit(id) {
      this.isEdit = id;
      axios
        .get(`http://localhost:9090/rest/v1/category/` + id)
        .then((res) => res.data)
        .then((response) => {
          console.log("response", response);
          this.editform.id = response.object.id;
          this.editform.name = response.object.name;
          this.editform.code = response.object.code;
          this.editform.status = response.object.status;
          console.log(this.editform.id);
        });
    },
    

    onReset() {
      // Reset our form values
      this.form.warehouseCode = "";
      this.form.supplierCode = "";
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    rows() {
      return this.items.length;
    },
  },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
.items-click-add {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content_search1 {
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content_search1 #input-id-meterial {
  max-width: 80% !important;
}
.content-table {
  overflow-x: auto;
}
.model-import {
  margin-top: 50px;
}

.fillter_date {
  max-width: 50%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
.count_price {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}
.pseudo-search {
  display: inline;
  border: 2px solid #ccc;
  border-radius: 100px;
  padding: 10px 15px;
  transition: background-color 0.5 ease-in-out;
  margin-right: 0.5rem;
}
.pseudo-search input {
  border: 0;
  background-color: transparent;
  width: 200px;
}
.pseudo-search button,
i {
  border: none;
  background: none;
  cursor: pointer;
}

.pseudo-search select {
  border: none;
}
.items-click-add {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fa-pencil-alt {
  font-size: 1rem;
  border: none;
  outline: none;
  color: red;
}
</style>