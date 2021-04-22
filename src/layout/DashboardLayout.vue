<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
     
      <sidebar-link to="/admin/commodity-list">
        <i class="nc-icon nc-notes"></i>
        <p>Commodity list</p>
      </sidebar-link>

      <sidebar-link to="/admin/category-list">
        <i class="nc-icon nc-notes"></i>
        <p>Category List</p>
      </sidebar-link>

      <sidebar-link to="/admin/supplier-list">
        <i class="nc-icon nc-notes"></i>
        <p>Supplier List</p>
      </sidebar-link>

      <sidebar-link to="/admin/warehouse-list">
        <i class="nc-icon nc-notes"></i>
        <p>Warehouse List</p>
      </sidebar-link>

      <sidebar-link to="/admin/agency-list">
        <i class="nc-icon nc-notes"></i>
        <p>Agency List</p>
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
    }
  }

</script>
