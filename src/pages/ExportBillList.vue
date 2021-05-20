<template>
  <div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card>
            <div class="items-click-add">
              <h3>Danh sách phiếu xuất</h3>
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
                <b-button class="m-1" v-b-modal.modal-2 variant="success"> <i class="fas fa-filter"/></b-button>
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

                <b-button v-b-modal.modal-1 variant="success"
                  >Thêm mới</b-button
                >

                <b-modal
                  class="model-import"
                  id="modal-1"
             
                  hide-footer
                  title="Thêm phiếu xuất"
                  ref="ModalAdd"
                >
                  <div>
                    <b-form @submit="submitExportBill" v-if="show">
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
                              @change="onSeach()"
                              value-field="code"
                              text-field="name"
                              required
                            >
                            </b-form-select>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Đại lý"
                            label-for="input-1"
                          >
                            <b-form-select
                              v-model="form.agencyCode"
                              :options="agencyOptions"
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
                        <b-button variant="danger" v-b-modal.my-modal @click="getExportBillDetailByExportBillId(row.item.id)">
                         <i class="fas fa-eye"></i> Xem
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
                  <b-modal id="my-modal1" ref="AddExportBillDetailModel" 
                  size="lg"
                  hide-footer
                  no-close-on-backdrop="false">
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
                              value-field="commodityCode"
                              text-field="commodityName"
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
                          <b-button type="submit">Thêm vào danh sách</b-button>
                        </form>
                      </b-col>

                      <b-col lg="6">
                        <div class="table-import">
                          <b-table
                            head-variant="dark"
                            striped
                            hover
                            :items="items1"
                            :fields="exportBillFields"
                          ></b-table>
                        </div>
                        <b-button @click="onSubmitExportBillDetail()" variant="success"
                          >Xuất hàng</b-button
                        >

                        <b-button @click="deleteExportBill()" variant="warning"
                          >Hủy</b-button
                        >
                      </b-col>
                    </b-row>
                  </b-modal>
                  <!-- Modal  -->
                  <b-modal
                    id="my-modal"
                    ref="editSupModal"
                    ok-only
                  >
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">
                        Xem thông tin phiếu nhập
                      </h2>
                      <div>
                        <b-form v-if="show">
                          <div class="table-import">
                          <b-table
                            head-variant="dark"
                            striped
                            hover
                            :items="Items11"
                            :fields="exportBillFields"
                          ></b-table>
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
import moment from "moment";
import Toasted from 'vue-toasted';
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
      meterialdetail: {
        meterial: "",
      },
      
      isEdit: null,
      // projects,
      // users,

      perPage: 10,
      currentPage: 1,

      form: {
        warehouseCode: "",
        agencyCode: "",
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
      exportBillFields: [
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
          label: "Người xuất",
        },
        {
          key: "agencyName",
          label: "Tên Đại lý",
        },
        {
          key: "warehouseName",
          label: "Tên kho",
        },
        {
          key: "exportDate",
          label: "Ngày xuất",
        },
        {
          key: "totalPrice",
          label: "Tổng giá trị",
        },

        { key: "actions", label: "Hành động" },
      ],

     
      // searchit_form: {
      //   material_name: "",
      // },
      items: [],

      items1: [],

      Items11: [],

      selectedCategory: null,
      warehouseOptions: [],

      selectedSupplier: null,
      agencyOptions: [],

      selectedCommodity: null,
      commodityOptions: [],

      status: [],
    };
  },
  created() {
    this.getWarehouse();
    this.getAgency();
    this.getExportBill();
    // setInterval(() => {
    //   this.onSeach();
    // }, 500);
  },

  methods: {


    getAgency() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/agency/list`)
        .then((response) => response.data)
        .then((res) => {
          this.agencyOptions = res.object;
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

    deleteExportBill() {
      const path =
        `http://localhost:9090/rest/v1/export-bill/delete-export-bill`;
      if(confirm("Tất cả hàng hóa sẽ không được nhập vào kho, bạn có chắc chắn muốn hủy?")){
          axios
        .delete(path)
        .then((res) => {
          this.getExportBill();
          this.$refs["AddExportBillDetailModel"].hide();
        })
        .catch((error) => {
          // eslint-disable-next-line
        });
      }else{

      }
      
    },

    getExportBillDetailByExportBillId(id) {
     
      axios
        .get(`http://localhost:9090/rest/v1/export-bill-detail/list/` + id)
        .then((response) => response.data)
        .then((res) => {
          this.Items11 = res.object.map((exportBillDetail) => {
            return {
              id: exportBillDetail.id,
              commodity: exportBillDetail.commodityName,
              quantity: exportBillDetail.quantity,
              price: exportBillDetail.price,
            };
          }); 
        });
    },

    
    
    // GET ALL METERIAL
    getExportBill() {
      axios
        .get(`http://localhost:9090/rest/v1/export-bill/list`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.object.map((exportBill) => {
            return {
              id: exportBill.id,
              fullName: exportBill.fullName,
              agencyName: exportBill.agencyName,
              warehouseName: exportBill.warehouseName,
              exportDate: exportBill.exportDate,
              
              totalPrice: exportBill.totalPrice.toLocaleString() + " VNĐ",
              
              
            };
          });
        });
    },

  

    AddExportBill(payload) {
      const path = "http://localhost:9090/rest/v1/export-bill/add-export-bill";
      axios
        .post(path, payload)
    },

    submitExportBill(event) {
      event.preventDefault();
      this.$refs.ModalAdd.hide();
      const payload = {
        warehouseCode: this.form.warehouseCode,
        agencyCode: this.form.agencyCode,
      };

      this.$refs["ModalAdd"].hide();
       this.$refs["AddExportBillDetailModel"].show();
      this.AddExportBill(payload);
      this.onReset();
     
    },
    searchIte11(payload) {
      const path = "http://localhost:9090/rest/v1/export-bill/search";
      axios
        .post(path, payload)
        .then((res) => {
          console.log(res, "resss");

          this.items = res.data.object.map((exportBill) => {
            return {
              id: exportBill.id,
              fullName: exportBill.fullName,
              agencyName: exportBill.agencyName,
              warehouseName: exportBill.warehouseName,
              exportDate: exportBill.exportDate,
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

    searchItem(payload) {
      const path = "http://localhost:9090/rest/v1/commodity-warehouse/search-commodity-warehouse";
      axios
        .post(path, payload)
        .then((res) => {
          console.log(res);
          console.log(res, "DATA");
          this.commodityOptions = res.data.object

          
        })
        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },
    

    onSeach() {
      const payload = {
        code: this.form.warehouseCode,
        
      };
      this.searchItem(payload);
      console.log(payload);
    },

    AddExportBillDetail(payload){
      const path =
        "http://localhost:9090/rest/v1/export-bill-detail/add-export-bill-detail";
      axios
        .post(path, payload)
        .then((response) => response.data)
        .then((res) => {
          if (res.resultCode == "999") {
            this.$toaster.error(res.message);
            this.deleteExportBill();

          } else if (res.resultCode == "0") {
             this.$toaster.success("Thành công!");
          }
          this.getExportBill();
        })
        .catch((error) => {
          this.getExportBill();
          console.log(error);
        });
    },
    onSubmitExportBillDetail(){
      
      this.AddExportBillDetail( this.arrObj)
      this.onResetArray();
       this.$refs.AddExportBillDetailModel.hide();
    },

    addArrayExportBillDetail(payload) {
      payload.commodity = this.commodityOptions.find(i => i.commodityCode == payload.commodityCode).commodityName;
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
    //   console.log(this.arrObj , " arr Data");
    //   console.log(obj , "arrdefaut");
      
      // spread operator ES6
     
    },
    submitAdd(event) {
      event.preventDefault();
      const payload = {
        commodityCode: this.form1.commodityCode,
        quantity: this.form1.quantity,
        price: this.form1.price,
      };
      this.addArrayExportBillDetail(payload);
    },


    
   
    // edit(id) {
    //   this.isEdit = id;
    //   axios
    //     .get(`http://localhost:9090/rest/v1/category/` + id)
    //     .then((res) => res.data)
    //     .then((response) => {
    //       console.log("response", response);
    //       this.editform.id = response.object.id;
    //       this.editform.name = response.object.name;
    //       this.editform.code = response.object.code;
    //       this.editform.status = response.object.status;
    //       console.log(this.editform.id);
    //     });
    // },

    onResetArray(){
      this.items1 = [];
      this.form1.commodityCode = ""
      this.form1.quantity = ""
      this.form1.price = ""
    },
    

    onReset() {
      // Reset our form values
      this.form.warehouseCode = "";
      this.form.agencyCode = "";
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