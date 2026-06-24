import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/stocks/600519.SH' },
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
        meta: { title: '工具与知识库' },
      },
    ],
  },
]

export default createRouter({ history: createWebHistory(), routes })
