<template>
  <div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col lg="12">
          <card>
            <div class="items-click-add">
              <h3>Danh sách Người dùng</h3>
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

                <b-modal id="modal-1" title="Thêm người dùng" ref="ModalAdd">
                  <div>
                    <b-form @submit="onSubmit" v-if="show">
                      <b-form-group
                        id="input-group-1"
                        label="Họ và tên"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.fullName"
                          placeholder="Nhập họ và tên"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Email"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.email"
                          type="email"
                          placeholder="Nhập email"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Mật khẩu"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.password"
                          type="password"
                          placeholder="Nhập mật khẩu"
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
                        label="Giới tính"
                        label-for="input-1"
                      >
                        <b-form-select
                          v-model="form.gender"
                          :options="options2"
                        >
                        </b-form-select>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Loại người dùng"
                        label-for="input-1"
                      >
                        <b-form-select
                          v-model="form.roleCode"
                          :options="RoleOptions"
                          value-field="code"
                          text-field="name"
                        >
                        </b-form-select>
                      </b-form-group>
                      <b-button type="submit" variant="success"
                        >Xác Nhận</b-button
                      >
                      <b-button type="reset" variant="light">Đóng</b-button>
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
                      <template v-slot:cell(gender)="row">
                        <b-badge v-if="row.item.gender" variant="success"
                          >Nữ</b-badge
                        >
                        <b-badge v-else variant="warning">Nam</b-badge>
                      </template>
                      <template #cell(actions)="row">
                        <b-button v-b-modal.my-modal @click="edit(row.item.id)">
                          Sửa
                        </b-button>
                        <b-button @click="ItemDelete(row.item.id)">
                          Xóa
                        </b-button>
                      </template>
                      <template v-slot:cell(status)="row">
                        <b-badge v-if="row.item.status" variant="success"
                          >Không hoạt động</b-badge
                        >
                        <b-badge v-else variant="warning">Hoạt Động</b-badge>
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
                  size="lg"
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
                          <b-row>
                            <b-col>
                              <b-form-group
                                id="input-group-1"
                                label="Họ và tên"
                                label-for="input-1"
                              >
                                <b-form-input
                                  id="input-1"
                                  v-model="editform.fullName"
                                  placeholder="Nhập họ và tên"
                                  required
                                ></b-form-input>
                              </b-form-group>
                              <b-form-group
                                id="input-group-1"
                                label="Email"
                                label-for="input-1"
                              >
                                <b-form-input
                                  id="input-1"
                                  v-model="editform.email"
                                  type="email"
                                  placeholder="Nhập email"
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
                                  v-model="editform.address"
                                  placeholder="Nhập địa chỉ"
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
                                  v-model="editform.phoneNumber"
                                  placeholder="Nhập số điện thoại"
                                  required
                                ></b-form-input>
                              </b-form-group>
                            </b-col>

                            <b-col>
                              <b-form-group
                                id="input-group-1"
                                label="Giới tính"
                                label-for="input-1"
                              >
                                <b-form-select
                                  v-model="editform.gender"
                                  :options="options2"
                                  value-field="value"
                                  text-field="text"
                                >
                                </b-form-select>
                              </b-form-group>
                              <b-form-group
                                id="input-group-1"
                                label="Loại người dùng"
                                label-for="input-1"
                              >
                                <b-form-select
                                  v-model="editform.roleCode"
                                  :options="RoleOptions"
                                  value-field="code"
                                  text-field="name"
                                >
                                </b-form-select>
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
                                </b-form-select> </b-form-group
                            ></b-col>
                          </b-row>

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

      selectedGender: null,
      options2: [
        { value: null, text: "Chọn giới tính" },
        { value: 0, text: "Nam" },
        { value: 1, text: "Nữ" },
      ],

      selected: null,
      options1: [
        { value: null, text: "Chọn giới tính" },
        { value: 0, text: "Hoạt động" },
        { value: 1, text: "Ngừng hoạt động" },
      ],
      isEdit: null,
      // projects,
      // users,

      perPage: 10,
      currentPage: 1,

      form: {
        fullName: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        phoneNumber: "",
        roleCode: "",
      },
      editform: {
        id: "",
        fullName: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        phoneNumber: "",
        roleCode: "",
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
          key: "fullName",
          label: "Họ tên",
        },
        {
          key: "email",
          label: "Email",
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
          key: "gender",
          label: "Giới tính",
        },
        {
          key: "role",
          label: "Loại Account",
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

      selectedRole: null,
      RoleOptions: [],

      status: [],
    };
  },
  created() {
    this.getUser();
    this.getRole();

    // setInterval(() => {
    //   this.onSeach();
    // }, 500);
  },

  methods: {
    getRole() {
      axios
        .get(`http://localhost:9090/rest/v1/user/list-role`)
        .then((response) => response.data)
        .then((res) => {
          this.RoleOptions = res.object;
        });
    },
    ItemDelete(id) {
      const path = `http://localhost:9090/rest/v1/user/remove-user/` + id;

      axios
        .put(path)
        .then((res) => {
          console.log(res);
          this.getUser();

          // this.$toaster.success("Đã xóa nguyên liệu thành công");

          // this.message = 'Book removed!';
          // this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
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
    getUser() {
      axios
        .get(`http://localhost:9090/rest/v1/user/list`)
        .then((response) => response.data)
        .then((res) => {
          this.items = res.object.map((user) => {
            return {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              address: user.address,
              phoneNumber: user.phoneNumber,
              gender: user.gender,
              role: user.roleName,
              status: user.status,
            };
          });
        });
    },
    // ADD METERIAL
    addUser(payload) {
      const path = "http://localhost:9090/rest/v1/user/add-user";
      axios
        .post(path, payload)
        .then((res) => {
          this.getUser();
        })
        .catch((error) => {
          this.getUser();
          console.log(error);
        });
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.ModalAdd.hide();
      const payload = {
        fullName: this.form.fullName,
        email: this.form.email,
        phoneNumber: this.form.phoneNumber,
        address: this.form.address,
        roleCode: this.form.roleCode,
        password: this.form.password,
        gender: this.form.gender,
        status: this.form.status,
      };

      this.addUser(payload);
      this.onReset();
      this.$refs["ModalAdd"].hide();
    },
    // // EDIT METERIAL
    edit(id) {
      this.isEdit = id;
      axios
        .get(`http://localhost:9090/rest/v1/user/` + id)
        .then((res) => res.data)
        .then((response) => {
          console.log("response", response);
          this.editform.id = response.object.id;
          this.editform.fullName = response.object.fullName;
          this.editform.email = response.object.email;
          this.editform.phoneNumber = response.object.phoneNumber;
          this.editform.roleCode = response.object.roleCode;
          this.editform.address = response.object.address;
          this.editform.status = response.object.status;
          this.editform.gender = response.object.gender;
          console.log(this.editform.id);
        });
    },
    update() {
      axios
        .put(
          `http://localhost:9090/rest/v1/user/edit-user`,
          this.editform,
          {},
          console.log(this.isEdit, "Id Update"),
          console.log(this.editform, "Form")
        )
        .then((res) => {
          console.log(res);
          this.getUser();
        })
        .catch((err) => {
          this.$refs.editSupModal.hide();
        });
    },

    onReset() {
      // Reset our form values
      this.form.fullName = "";
      this.form.email = "";
      this.form.password = "";
      this.form.gender = "";
      this.form.phoneNumber = "";
      this.form.roleCode = "";
      this.form.address = "";
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