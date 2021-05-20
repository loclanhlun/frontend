<template>
  <div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card>
            <div class="items-click-add">
              <h3>Danh sách hàng hóa trong kho</h3>
              <div>
                <!-- <div class="pseudo-search">
                     @keyup="onSeach()"
                    v-model="searchit_form.material_name" 
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    autofocus
                    required
                  />
                  <button class="fa fa-search" type="submit"></button>
                </div> -->
                <b-button v-b-modal.modal-2 variant="success"><i class="fas fa-filter"/></b-button>
                <b-modal hide-footer id="modal-2" ref="Model_filter"
                no-close-on-backdrop="false">
                  <b-form-group id="input-group-1" label="Kho">
                    <b-form-select
                              v-model="filterByWarehouseCode.code"
                              :options="warehouseOptions"
                              value-field="code"
                              text-field="name"
                              required
                            >
                      </b-form-select>
                     
                  </b-form-group>
                   <b-button variant="success" @click="onFilter">Lọc</b-button>
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
                      <!-- <template #cell(actions)="row">
                        <b-button
                          v-b-modal.my-modal
                          @click="
                            getImportBillDetailByImportBillId(row.item.id)
                          "
                        >
                          Xem
                        </b-button>
                      </template> -->
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
      filterByWarehouseCode: {
        code : ""
      },
      isEdit: null,
      perPage: 10,
      currentPage: 1,
      arrObj: [],
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
          key: "commodityName",
          label: "Tên hàng",
        },
        {
          key: "warehouseName",
          label: "Kho",
        },
        {
          key: "quantity",
          label: "Số lượng",
        },
       
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
    this.getCommodityWarehouse();

    // setInterval(() => {
    //   this.onSeach();
    // }, 500);
  },

  methods: {

    getWarehouse() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/warehouse/list`)
        .then((response) => response.data)
        .then((res) => {
          this.warehouseOptions = res.object;
        });
    },
    searchIte11(payload) {
      const path =
        "http://localhost:9090/rest/v1/commodity-warehouse/search-commodity-warehouse";
      axios
        .post(path, payload)
        .then((res) => {
          this.items = res.data.object.map((commoditywarehouse) => {
            return {
              id: commoditywarehouse.id,
              commodityName: commoditywarehouse.commodityName,
              warehouseName: commoditywarehouse.warehouseName,
              quantity: commoditywarehouse.quantity,
            };
          });
        })

        .catch((error) => {
          // this.getSuplier();
          console.log(error);
        });
    },
    onFilter() {
      const payload = {
          code : this.filterByWarehouseCode.code
      };
      console.log(payload);
      this.searchIte11(payload);
      this.$refs["Model_filter"].hide();
    },

    
    // GET ALL METERIAL
    getCommodityWarehouse() {
      axios
        .get(`http://localhost:9090/rest/v1/commodity-warehouse/list`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.object.map((commoditywarehouse) => {
            return {
              id: commoditywarehouse.id,
              commodityName: commoditywarehouse.commodityName,
              warehouseName: commoditywarehouse.warehouseName,
              quantity: commoditywarehouse.quantity,
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
        .then((res) => {
          this.getImportBill();
        })
        .catch((error) => {
          this.getImportBill();
          console.log(error);
        });
    },

    submitImportBill() {
      this.$refs.ModalAdd.hide();
      const payload = {
        warehouseCode: this.form.warehouseCode,
        supplierCode: this.form.supplierCode,
      };

      this.$refs["ModalAdd"].hide();
      this.AddImportBill(payload);
      this.onReset();
    },

    AddImportBillDetail(payload) {
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
    onSubmitImportBillDetail() {
      this.$refs.AddImportBillDetailModel.hide();
      this.AddImportBillDetail(this.arrObj);
      this.$refs["AddImportBillDetailModel"].hide();
      this.AddImportBill(payload);
      this.onReset();
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
        console.log(this.items1);
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
    submitAdd() {
      const payload = {
        commodityCode: this.form1.commodityCode,
        quantity: this.form1.quantity,
        price: this.form1.price,
      };
      this.addArrayImportBillDetail(payload);
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