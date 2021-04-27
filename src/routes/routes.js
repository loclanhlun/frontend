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

const routes = [


 
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
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
        component: UserProfile
      },
      {
        path: 'commodity-list',
        name: 'Commodity List',
        component: CommodityList
      },
      {
        path: 'category-list',
        name: 'Category List',
        component: CategoryList
      },
      {
        path: 'supplier-list',
        name: 'Supplier List',
        component: SupplierList
      },
      {
        path: 'warehouse-list',
        name: 'Warehouse List',
        component: WarehouseList
      },
      {
        path: 'agency-list',
        name: 'Agency List',
        component: AgencyList
      },
      {
        path: 'user-list',
        name: 'User List',
        component: UserList
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
      
    ]
  },  
  { path: '*', component: NotFound },

  {
    path: '/login',
    name: 'Login',
    component: Login
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
