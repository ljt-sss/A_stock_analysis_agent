import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
const routes = [{ path: '/', component: MainLayout, children: [
            { path: '', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { title: '总览' } },
            { path: 'watchlist', name: 'watchlist', component: () => import('../views/WatchlistView.vue'), meta: { title: '自选股分组' } },
            { path: 'stocks/:tsCode?', name: 'stock', component: () => import('../views/StockCockpitView.vue'), meta: { title: '个股驾驶舱' } },
            { path: 'reports', name: 'reports', component: () => import('../views/ReportCenterView.vue'), meta: { title: '财报中心' } },
            { path: 'analysis', name: 'analysis', component: () => import('../views/FundamentalAnalysisView.vue'), meta: { title: '基本面分析' } },
            { path: 'news', name: 'news', component: () => import('../views/NewsSectorView.vue'), meta: { title: '新闻与板块' } },
            { path: 'wiki', name: 'wiki', component: () => import('../views/WikiMemoryView.vue'), meta: { title: 'Wiki知识库' } },
            { path: 'skills', name: 'skills', component: () => import('../views/SkillsMcpView.vue'), meta: { title: 'Skills / MCP' } },
            { path: 'evals', name: 'evals', component: () => import('../views/AgentEvalView.vue'), meta: { title: 'Agent评估' } }
        ] }];
export default createRouter({ history: createWebHistory(), routes });
