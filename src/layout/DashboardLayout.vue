<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="fas fa-chart-pie"></i>
        <p>Dashboard</p>
      </sidebar-link>
     
      <sidebar-link v-if="isAdmin" to="/admin/commodity-list">
        <i class="fab fa-product-hunt"></i>
        <p>Hàng hóa</p>
      </sidebar-link>

      <sidebar-link v-if="isAdmin" to="/admin/category-list">
        <i class="fab fa-adversal"></i>
    
        <p>Loại hàng</p>
      </sidebar-link>

      <sidebar-link v-if="isAdmin" to="/admin/supplier-list">
        <i class="far fa-building"></i>
        <p>Nhà cung cấp</p>
      </sidebar-link>

      <sidebar-link v-if="isAdmin" to="/admin/warehouse-list">
        <i class="fas fa-warehouse"></i>
        <p>Kho</p>
      </sidebar-link>

      <sidebar-link v-if="isAdmin" to="/admin/agency-list">
        <i class="fas fa-store"></i>
        <p>Đại lý</p>
      </sidebar-link>

      <sidebar-link v-if="isAdmin" to="/admin/user-list">
        <i class="fas fa-users"></i>
        <p>Người dùng</p>
      </sidebar-link>

       <sidebar-link to="/admin/import-bill">
        <i class="fas fa-file-invoice"></i>
        <p>Phiếu nhập</p>
      </sidebar-link>

      <sidebar-link to="/admin/export-bill">
        <i class="fas fa-file-invoice"></i>
        <p>Phiếu xuất</p>
      </sidebar-link>

      <sidebar-link to="/admin/commoditywarehouse-list">
        <i class="fas fa-boxes"></i>
        <p>Hàng trong kho</p>
      </sidebar-link>
 
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    data() {
      return {
        isAdmin: false
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    },
    created: function() {
      let auth = JSON.parse(localStorage.getItem('auth'));
      if(auth && auth.object && auth.object.role && auth.object.role == "ROLE_ADMIN") {
        this.isAdmin = true;
      }
    }
  }

</script>
