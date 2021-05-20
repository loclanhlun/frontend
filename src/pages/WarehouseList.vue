<template>
  <div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card>
            <div class="items-click-add">
              <h3>Danh sách nhà cung cấp</h3>
              <div>
                <!--<div class="pseudo-search">
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
                <b-button v-b-modal.modal-2 variant="success">
                  <i class="fas fa-filter"/></b-button>
                <b-modal id="modal-2" hide-footer ref="Model_filter">
                  <b-form @submit="onSearch" v-if="show">
                    <b-form-group id="input-group-1" label="Tên đại lý.">
                      <b-form-input
                        placeholder="Nhập tên đại lý"
                        v-model="search.name"
                        type="text"
                      ></b-form-input>

                      <div style="margin-top: 20px">
                        <b-form-group
                          id="input-group-1"
                          label="Trạng thái"
                          label-for="input-1"
                        >
                          <b-form-select
                            
                            v-model="search.status"
                            :options="options1"
                          >
                          </b-form-select>
                        </b-form-group>
                      </div>
                    </b-form-group>
                    <b-button type="submit" variant="success">Lọc</b-button>
                  </b-form>
                </b-modal>
                <b-button class="m-1" v-b-modal.modal-1 variant="success"
                  >Thêm mới</b-button
                >

                <b-modal id="modal-1" title="Thêm nhà cung cấp" ref="ModalAdd" hide-footer>
                  <div>
                    <b-form @submit="onSubmit" v-if="show">
                      <b-form-group
                        id="input-group-1"
                        label="Mã kho"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.code"
                          placeholder="Nhập mã kho"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Tên kho"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.name"
                          placeholder="Nhập tên kho"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Số điện thoại"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.phoneNumber"
                          placeholder="Nhập số điện thoại"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Địa chỉ"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.address"
                          placeholder="Nhập địa chỉ"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <div class="d-flex justify-content-end">
                       <b-button class="m-1" type="submit" variant="success"
                        >Xác Nhận</b-button
                      >
                      <b-button class="m-1" @click="$bvModal.hide('modal-1')" variant="light">Đóng</b-button>
                       </div>
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
                        <b-button class="m-1" variant="danger" v-b-modal.my-modal @click="edit(row.item.id)">
                          <i class="fas fa-edit"></i>
                        </b-button>
                        <b-button class="m-1" variant="warning" @click="ItemDelete(row.item.id)">
                          <i class="far fa-trash-alt"></i>
                        </b-button>
                      </template>
                      <template v-slot:cell(status)="row">
                        <b-badge v-if="row.item.status" variant="warning"
                          >Ngừng hoạt động</b-badge
                        >
                        <b-badge v-else variant="success">Hoạt Động</b-badge>
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

                  <!-- Modal  -->
                  <b-modal
                  hide-footer
                    id="my-modal"
                    ref="editSupModal"
                    title="Thông tin nguyên liệu"
                    ok-only
                  >
                    <pre></pre>
                    <div>
                      <h2 style="text-align: center">Sửa Thể Loại</h2>
                      <div>
                        <b-form @submit="update()" v-if="show">
                          <b-form-group
                            id="input-group-1"
                            label="Mã kho"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập mã kho"
                              v-model="editform.code"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Tên kho"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập tên kho"
                              v-model="editform.name"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Số điện thoại"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập số điện thoại"
                              v-model="editform.phoneNumber"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <b-form-group
                            id="input-group-1"
                            label="Địa chỉ"
                            label-for="input-1"
                          >
                            <b-form-input
                              id="input-1"
                              placeholder="Nhập địa chỉ"
                              v-model="editform.address"
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
                          <div class="d-flex justify-content-end">
                       <b-button class="m-1" type="submit" variant="success"
                        >Xác Nhận</b-button
                      >
                      <b-button class="m-1" @click="$bvModal.hide('my-modal')" variant="light">Đóng</b-button>
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
      search: {
        name: "",
        status: null,
      },
      meterialdetail: {
        meterial: "",
      },

      selected: null,
      options1: [
        { value: null, text: "Chọn trạng thái" },
        { value: 0, text: "Hoạt động" },
        { value: 1, text: "Ngừng hoạt động" },
      ],
      isEdit: null,
      // projects,
      // users,

      perPage: 10,
      currentPage: 1,

      form: {
        name: "",
        code: "",
        phoneNumber: "",
        address: "",
      },
      editform: {
        id: "",
        name: "",
        code: "",
        phoneNumber: "",
        address: "",
        status: "",
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
          key: "code",
          label: "Mã Kho",
        },
        {
          key: "name",
          label: "Tên Kho",
        },
        {
          key: "phoneNumber",
          label: "Số điện thoại",
        },
        {
          key: "address",
          label: "Địa chỉ",
        },
        {
          key: "status",
          label: "Trạng thái",
        },

        { key: "actions", label: "Hành động" },
      ],
      // searchit_form: {
      //   material_name: "",
      // },
      items: [],

      selectedCategory: null,
      categoryOptions: [],

      status: [],
    };
  },
  created() {
    this.getWarehouse();

    // setInterval(() => {
    //   this.onSeach();
    // }, 500);
  },

  methods: {
    ItemDelete(id) {
      const path =
        `http://localhost:9090/rest/v1/admin/warehouse/remove-warehouse/` + id;
      if(confirm("Bạn có chắc chắn muốn xóa?")){
          axios
        .put(path)
        .then((response) => response.data)
        .then((res) => {
          if (res.resultCode == "999") {
            this.$toaster.error(res.message);
          } else if (res.resultCode == "0") {
             this.$toaster.success("Xóa thành công!");
          }
          this.getWarehouse();

          // this.$toaster.success("Đã xóa nguyên liệu thành công");

          // this.message = 'Book removed!';
          // this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
        });
      }
      
    },

    
    // GET ALL METERIAL
    getWarehouse() {
      axios
        .get(`http://localhost:9090/rest/v1/admin/warehouse/list`)
        .then((response) => response.data)
        .then((res) => {
          if (res.resultCode == "401") {
            this.$toaster.error("Vui lòng đăng nhập trước khi vào trang này!");
          } else {
            this.items = res.object.map((warehouse) => {
              return {
                id: warehouse.id,
                code: warehouse.code,
                name: warehouse.name,
                phoneNumber: warehouse.phoneNumber,
                address: warehouse.address,
                status: warehouse.status,
              };
            });
          }
        }).catch((error) => {
          this.$toaster.error("Bạn không có quyền truy cập vào trang này!");
        });
    },
    searchWarehouse(payload) {
      const path = "http://localhost:9090/rest/v1/admin/warehouse/search";
      axios
        .post(path, payload)
        .then((res) => {
          this.items = res.data.object.map((warehouse) => {
            return {
              id: warehouse.id,
              code: warehouse.code,
              name: warehouse.name,
              phoneNumber: warehouse.phoneNumber,
              address: warehouse.address,
              status: warehouse.status,
            };
          });
        })
        .catch((error) => {
          
          console.log(error);
        });
    },
    onSearch() {
      const payload = {
        name: this.search.name,
        status: this.search.status,
      };
      console.log(payload);
      this.searchWarehouse(payload);
      this.$refs["Model_filter"].hide();
    },
    // ADD METERIAL
    addWarehouse(payload) {
      const path =
        "http://localhost:9090/rest/v1/admin/warehouse/add-warehouse";
      axios
        .post(path, payload)
        .then((response) => response.data)
        .then((res) => {
          if (res.resultCode == "999") {
            this.$toaster.error(res.message);
          } else if (res.resultCode == "0") {
              this.$toaster.success("Thêm thành công!");
          }
          this.getWarehouse();
        })
        .catch((error) => {
          this.getWarehouse();
          console.log(error);
        });
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.ModalAdd.hide();
      const payload = {
        code: this.form.code,
        name: this.form.name,
        phoneNumber: this.form.phoneNumber,
        address: this.form.address,
      };

      this.addWarehouse(payload);
      this.onReset();
      this.$refs["ModalAdd"].hide();
    },
    // // EDIT METERIAL
    edit(id) {
      this.isEdit = id;
      axios
        .get(`http://localhost:9090/rest/v1/admin/warehouse/` + id)
        .then((res) => res.data)
        .then((response) => {
          console.log("response", response);
          this.editform.id = response.object.id;
          this.editform.name = response.object.name;
          this.editform.code = response.object.code;
          this.editform.phoneNumber = response.object.phoneNumber;
          this.editform.address = response.object.address;
          this.editform.status = response.object.status;
          console.log(this.editform.id);
        });
    },
    update() {
      axios
        .put(
          `http://localhost:9090/rest/v1/admin/warehouse/edit-warehouse`,
          this.editform,
          {},
          console.log(this.isEdit, "Id Update"),
          console.log(this.editform, "Form")
        )
        .then((response) => response.data)
        .then((res) => {
          if (res.resultCode == "999") {
            this.$toaster.error(res.message);
          } else if (res.resultCode == "0") {
             this.$toaster.success("Sửa thành công!");
          }
          this.getWarehouse();
        })
        .catch((err) => {
          this.$refs.editSupModal.hide();
        });
    },

    onReset() {
      // Reset our form values
      this.form.name = "";
      this.form.code = "";
      this.form.categoryid = "";
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