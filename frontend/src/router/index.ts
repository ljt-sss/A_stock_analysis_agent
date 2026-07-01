import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { title: 'Agent Mission Control', commandView: true },
      },
      {
        path: 'stocks/:tsCode?',
        name: 'stock',
        component: () => import('../views/StockCockpitView.vue'),
        meta: { title: '个股研究' },
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('../views/FundamentalAnalysisView.vue'),
        meta: { title: 'AI 分析记录' },
      },
      {
        path: 'ops',
        name: 'ops',
        component: () => import('../views/SkillsMcpView.vue'),
        meta: { title: 'Agent 能力中心', commandView: true },
      },
    ],
  },
]

export default createRouter({ history: createWebHistory(), routes })
