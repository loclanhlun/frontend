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
                  <button  class="fa fa-search" type="submit"></button>
                </div>
                <b-button v-b-modal.modal-2 variant="success"> <i class="fas fa-filter"/></b-button>
                <b-modal id="modal-2" hide-footer ref="Model_filter">
                  <b-form @submit="onFilter" v-if="show">
                    <b-form-group id="input-group-1" label="Thời gian.">
                      <b-row>
                        <b-col lg="6">
                          <b-form-input
                            class="input-date"
                            v-model="filterDate.fromDate"
                            type="date"
                            required
                          ></b-form-input>
                        </b-col>
                        <b-col lg="6">
                          <b-form-input
                            class="input-date"
                            v-model="filterDate.toDate"
                            value=""
                            type="date"
                            required
                          ></b-form-input>
                        </b-col>
                      </b-row>
                      <div style="margin-top: 20px">
                        <b-form-select
                          v-model="filterDate.warehouseCode"
                          :options="warehouseOptions"
                          value-field="code"
                          text-field="name"
                        >
                        </b-form-select>
                      </div>
                    </b-form-group>
                    <b-button type="submit" variant="success">Lọc</b-button>
                  </b-form>
                </b-modal>

                <b-button class="m-1" v-b-modal.modal-1 variant="success"
                  >Thêm mới</b-button
                >

                <b-modal
                  class="model-import"
                  id="modal-1"
               
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
                              required
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
                              required
                            >
                            </b-form-select>
                          </b-form-group>

                          <b-button type="submit" variant="success"
                            >Chọn</b-button
                          >
                          <b-button
                            @click="$bvModal.hide('modal-1')"
                            variant="light"
                            >Đóng</b-button
                          >
                        </b-col>
                      </b-row>
                    </b-form>
                  </div>
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
                        <b-button variant="danger"
                          v-b-modal.my-modal
                          @click="
                            getImportBillDetailByImportBillId(row.item.id)
                          "
                        >
                        <i class="fas fa-eye"></i>
                          Xem
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
                  <b-modal
                    id="my-modal1"
                    ref="AddImportBillDetailModel"
                    hide-footer
                    size="lg"
                    no-close-on-backdrop="false"
                    hide-header-close
                  >
                    <b-row>
                      <b-col lg="3">
                        <form @submit="submitAdd">
                          <b-form-group
                            id="input-group-1"
                            label="Loại sản phẩm"
                            label-for="input-1"
                          >
                            <select
                              class="custom-select"
                              v-model="searchit_form.categoryId"
                              @change="onSeach()"
                            >
                              <option
                                v-for="categoryOption in categoryOptions"
                                :key="categoryOption.id"
                                :value="categoryOption.id"
                              >
                                {{ categoryOption.name }}
                              </option>
                            </select>
                          </b-form-group>
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
                              required
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

                      <b-col lg="9">
                        <div class="content-table">
                          <b-table
                            class="table-sc"
                            id="my-table"
                            head-variant="dark"
                            hover
                            :items="items1"
                            :fields="importBillFields"
                          >
                          <template #cell(actions)="row">
                            <b-button
                          class="m-1"
                          variant="danger"
                          
                          @click="deleteItem(row.index)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </b-button>
                            </template>
                          </b-table>
                        </div>
                        <b-button
                          @click="onSubmitImportBillDetail()"
                          variant="success"
                          >Nhập hàng</b-button
                        >
                        <b-button @click="deleteImportBill()" variant="success"
                          >Hủy</b-button
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
                      <!--  <b-form v-if="show"> -->
                          
                            <!-- <b-table 
                              tbody-class="rowClass"
                              head-variant="dark"
                              striped
                              hover
                              :items="Items11"
                              :fields="importBillFields"
                            ></b-table> -->
                            <b-table 
                            
                             head-variant="dark"
                            :items="Items11"
                            :fields="importBillFields"
                            >
                            
                            </b-table>
                          
                        <!-- </b-form> -->
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
import moment from "moment";
import Toasted from "vue-toasted";
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
      filterDate: {
        fromDate: "",
        toDate: "",
        warehouseCode: "",
      },
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
        id : "",
        categoryId: "",
        commodityCode: "",
        quantity: "",
        price: "",
      },
      // editform: {
      //   id: "",
      //   commodityName : "",
      //   importBill: "",
      //   quantity: "",
      //   price: "",
      // },
      show: true,
      importBillFields: [
        {
          key: "id",
          label: "#",
        },
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
        { key: "actions", label: "Hành động" },

        
      ],
      arrObj: [],

      index:{
        index : ""
      },
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
        {
          key: "importDate",
          label: "Ngày nhập",
        },
        {
          key: "totalPrice",
          label: "Tổng giá trị"
        },

        { key: "actions", label: "Hành động" },
      ],

      searchit_form: {
        categoryId: "",
      },
      items: [],

      items1: [],

      Items11: [],

      selectedCategory: null,
      warehouseOptions: [],

      selectedCategory: null,
      categoryOptions: [],

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
    // this.getCommodity();
    this.getImportBill();
    this.getCategory();
    // setInterval(() => {
    //   this.onSeach();
    // }, 500);
  },

  methods: {
    // getCommodity() {
    //   axios
    //     .get(`http://localhost:9090/rest/v1/admin/commodity/list`)
    //     .then((response) => response.data)
    //     .then((res) => {
    //       this.commodityOptions = res.object;
    //     });
    // },

    deleteImportBill() {
      const path = `http://localhost:9090/rest/v1/import-bill/delete-import-bill`;
      if (confirm("Tất cả hàng hóa sẽ không được nhập vào kho, bạn có chắc chắn muốn hủy?")) {
        axios
          .delete(path)
          .then((res) => {
            this.getImportBill();
            this.$refs["AddImportBillDetailModel"].hide();
          })
          .catch((error) => {
            // eslint-disable-next-line
          });
      }else{
        
      }
    },


    getCategory() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/category/list`)
        .then((response) => response.data)
        .then((res) => {
          this.categoryOptions = res.object;
          console.log(this.categoryOptions, "Data Options");
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
    searchIte11(payload) {
      const path = "http://localhost:9090/rest/v1/import-bill/search";
      axios
        .post(path, payload)
        .then((res) => {
          console.log(res, "resss");

          this.items = res.data.object.map((importBill) => {
            return {
              id: importBill.id,
              fullName: importBill.fullName,
              supplierName: importBill.supplierName,
              warehouseName: importBill.warehouseName,
              importDate: importBill.importDate,
            };

            // return {
            //   mã_nguyên_liệu: material.id,
            //   tên_nguyên_liệu: material.material_name,
            // };
          });
        })

        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },
    onFilter() {
      const payload = {
        fromDate: (this.filterDate.fromDate = moment(
          this.filterDate.fromDate
        ).format("DD/MM/YYYY")),
        toDate: (this.filterDate.toDate = moment(this.filterDate.toDate).format(
          "DD/MM/YYYY"
        )),
        warehouseCode: this.filterDate.warehouseCode,
      };
      console.log(payload);
      this.searchIte11(payload);
      this.$refs["Model_filter"].hide();
      this.onReset();
    },

    onResetArray(){
      // console.log(this.items1.length, "length items1");
      this.items1 = [];
      this.searchit_form.categoryId = ""
      this.form1.commodityCode = ""
      this.form1.quantity = ""
      this.form1.price = ""
    },
    //SEARCH METERIAL
    searchItem(payload) {
      const path =
        "http://localhost:9090/rest/v1/admin/commodity/list-commodity";
      axios
        .post(path, payload)
        .then((res) => {
          console.log(res);
          this.commodityOptions = res.data.object;

          console.log(this.commodityOptions, "đasadads");
        })
        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },

    onSeach() {
      const payload = {
        id: this.searchit_form.categoryId,
      };
      this.searchItem(payload);
    },

    //   this.searchItem(payload);
    // },
    // GET ALL METERIAL
    getImportBill() {
      axios
        .get(`http://localhost:9090/rest/v1/import-bill/list`, {params: { answer: this.searchit_form.categoryId }})
        .then((response) => response.data)
        .then((res) => {
          this.items = res.object.map((importBill) => {
            return {
              id: importBill.id,
              fullName: importBill.fullName,
              supplierName: importBill.supplierName,
              warehouseName: importBill.warehouseName,
              importDate: importBill.importDate,
              totalPrice: importBill.totalPrice.toLocaleString() + " VNĐ",
            };
          });
        });
    },

    getImportBillDetailByImportBillId(id) {
      // this.isEdit = id;
      axios
        .get(`http://localhost:9090/rest/v1/import-bill-detail/list/` + id)
        .then((response) => response.data)
        .then((res) => {
          console.log(res, "đấ");
          this.Items11 = res.object.map((importBillDetail) => {
            return {
              id: importBillDetail.id,
              commodity: importBillDetail.commodityName,
              quantity: importBillDetail.quantity,
              price: importBillDetail.price,
            };
          });
        });
    },
    AddImportBill(payload) {
      const path = "http://localhost:9090/rest/v1/import-bill/add-import-bill";
      axios
        .post(path, payload)
    },

    submitImportBill(event) {
       event.preventDefault();
      const payload = {
        warehouseCode: this.form.warehouseCode,
        supplierCode: this.form.supplierCode,
      };

      this.$refs["ModalAdd"].hide();
      this.$refs["AddImportBillDetailModel"].show();
     
      this.AddImportBill(payload);
      this.onReset();
    },

    AddImportBillDetail(payload) {
      const path =
        "http://localhost:9090/rest/v1/import-bill-detail/add-import-bill-detail";
      axios
        .post(path, payload)
        .then((response) => response.data)
        .then((res) => {
          if (res.resultCode == "999") {
            this.$toaster.error(res.message);
            this.deleteImportBill();
          } else if (res.resultCode == "0") {
            this.$toaster.success("Thành công!");
            console.log(this.arrObj, "DATA1111");
          }
          this.getImportBill();
          
        })
        .catch((error) => {
          this.getImportBill();
          console.log(error);
        });
    },
    onSubmitImportBillDetail() {
      this.AddImportBillDetail(this.arrObj);
      
       this.onResetArray();
        this.$refs.AddImportBillDetailModel.hide();
    },

    addArrayImportBillDetail(payload) {
      payload.commodity = this.commodityOptions.find(
        (i) => i.code == payload.commodityCode
      ).name;
      const availabeCommodity = this.items1.find(
        (i) => i.commodityCode == payload.commodityCode
      );
      var obj = JSON.parse('{"data" :[]}');
      if (availabeCommodity) {
        availabeCommodity.quantity =
          parseInt(availabeCommodity.quantity) + parseInt(payload.quantity);
        availabeCommodity.price = payload.price;
        console.log(this.items1, "ấdhfkaljsdhfkajsah");
        obj.data = JSON.parse(JSON.stringify(this.items1));
      } else {
        this.items1 = [...this.items1, payload];
        obj.data = JSON.parse(JSON.stringify(this.items1));
      }
      this.arrObj = obj;
      console.log(this.arrObj, " arr Data");
      console.log(obj, "arrdefaut");

      // spread operator ES6
    },
    submitAdd(event) {
      event.preventDefault();
      const payload = {
        commodityCode: this.form1.commodityCode,
        quantity: this.form1.quantity,
        price: this.form1.price,
      };
      console.log(payload, "PAYLOAD");
      this.addArrayImportBillDetail(payload);
    },

    deleteItem(index){
      console.log(index);
      this.items1.splice(index, 1);
      // this.items1 = this.items1.filter((x, xIndex) => xIndex !== index);
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