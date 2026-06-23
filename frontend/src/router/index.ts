import {createRouter,createWebHistory} from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
const routes=[{path:'/',component:MainLayout,children:[
  {path:'',redirect:'/stocks/600519.SH'},
  {path:'stocks/:tsCode?',name:'stock',component:()=>import('../views/StockCockpitView.vue'),meta:{title:'个股驾驶舱'}},
  {path:'analysis',name:'analysis',component:()=>import('../views/FundamentalAnalysisView.vue'),meta:{title:'基本面分析'}},
]}]
export default createRouter({history:createWebHistory(),routes})
