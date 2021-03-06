import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import CommodityList from 'src/pages/CommodityList.vue'
import CategoryList from 'src/pages/CategoryList.vue'
import SupplierList from 'src/pages/SupplierList.vue'
import WarehouseList from 'src/pages/WarehouseList.vue'
import AgencyList from 'src/pages/AgencyList.vue'
import UserList from 'src/pages/UserList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/layout/Login.vue'
import ImportBillList from 'src/pages/ImportBillList.vue'
import ExportBillList from 'src/pages/ExportBillList.vue'
import CommodityWarehouse from 'src/pages/CommodityWarehouse.vue'

const routes = [


 
  {
    path: '/',
    component: Login
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
        
      },
      {
        path: 'commodity-list',
        name: 'Commodity List',
        component: CommodityList,
        meta: ['ROLE_ADMIN']
      },
      {
        path: 'category-list',
        name: 'Category List',
        component: CategoryList,
        meta: ['ROLE_ADMIN']
      },
      {
        path: 'supplier-list',
        name: 'Supplier List',
        component: SupplierList,
        meta: ['ROLE_ADMIN']
      },
      {
        path: 'warehouse-list',
        name: 'Warehouse List',
        component: WarehouseList,
        meta: ['ROLE_ADMIN']
      },
      {
        path: 'agency-list',
        name: 'Agency List',
        component: AgencyList,
        meta: ['ROLE_ADMIN']
      },
      {
        path: 'user-list',
        name: 'User List',
        component: UserList,
        meta: ['ROLE_ADMIN']
      },

      {
        path: 'commoditywarehouse-list',
        name: 'CommodityWarehouse List',
        component: CommodityWarehouse
      },

      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      },
      {
        path: 'import-bill',
        name: 'Import List',
        component: ImportBillList
      },

      {
        path: 'export-bill',
        name: 'Export List',
        component: ExportBillList
      },
      {
        path: 'not-found',
        name: 'Not Found',
        component: NotFound
      }
    ]
  },  
  { path: '*', component: NotFound },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: []
  },

  
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
