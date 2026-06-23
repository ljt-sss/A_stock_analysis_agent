/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref, watch } from 'vue';
import { Download, FileText, Plus, Star } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import BaseChart from '../components/charts/BaseChart.vue';
import AgentInsightPanel from '../components/agent/AgentInsightPanel.vue';
import { useStockStore } from '../stores/stockStore';
import { useTaskStore } from '../stores/taskStore';
const route = useRoute();
const store = useStockStore();
const tasks = useTaskStore();
const activeTab = ref('估值');
const code = computed(() => String(route.params.tsCode || '600519.SH'));
const data = computed(() => store.dashboard);
onMounted(() => store.load(code.value));
watch(code, (value) => store.load(value));
function makeChart(keys, colors, type = 'line') {
    return computed(() => {
        const valuationKeys = ['pe_ttm', 'pb', 'total_mv'];
        const source = valuationKeys.includes(keys[0]) ? data.value?.valuation_series : data.value?.quarterly_financials;
        return {
            tooltip: { trigger: 'axis' },
            legend: { top: 4 },
            grid: { left: 42, right: 16, top: 38, bottom: 26 },
            xAxis: { type: 'category', data: source?.slice(-20).map((x) => x.date?.slice(0, 7) || x.period) || [] },
            yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eef2f7' } } },
            series: keys.map((key, index) => ({
                name: key,
                type,
                smooth: true,
                symbol: 'none',
                data: source?.slice(-20).map((x) => x[key]) || [],
                itemStyle: { color: colors[index] },
                lineStyle: { color: colors[index], width: 2 },
                areaStyle: key === 'total_mv' ? { color: 'rgba(37,99,235,.08)' } : undefined,
            })),
        };
    });
}
const pe = makeChart(['pe_ttm'], ['#2563eb']);
const pb = makeChart(['pb'], ['#f97316']);
const marketCap = makeChart(['total_mv'], ['#2563eb']);
const revenue = makeChart(['revenue', 'revenue_yoy'], ['#60a5fa', '#f97316'], 'bar');
const profit = makeChart(['net_profit_parent', 'net_profit_yoy'], ['#2563eb', '#f97316'], 'bar');
const profitability = makeChart(['roe', 'gross_margin', 'net_margin'], ['#2563eb', '#f97316', '#10b981']);
const cashflow = makeChart(['net_operate_cashflow'], ['#2563eb'], 'bar');
const debt = makeChart(['debt_asset_ratio'], ['#2563eb']);
const donut = computed(() => ({
    tooltip: { trigger: 'item' },
    legend: { right: 8, top: 'middle', orient: 'vertical' },
    series: [{ type: 'pie', radius: ['46%', '70%'], center: ['35%', '52%'], label: { show: false }, data: data.value?.business_segments.map((x) => ({ name: x.segment_name, value: x.revenue_ratio })) || [] }],
}));
const charts = computed(() => [
    { title: 'PE-TTM 近5年走势', option: pe.value },
    { title: 'PB 近5年走势', option: pb.value },
    { title: '总市值（周度）', option: marketCap.value },
    { title: '营业收入（单季）', option: revenue.value },
    { title: '归母净利润（单季）', option: profit.value },
    { title: 'ROE / 毛利率 / 净利率', option: profitability.value },
    { title: '经营活动现金流（单季）', option: cashflow.value },
    { title: '资产负债率 近5年走势', option: debt.value },
    { title: '主营业务占比', option: donut.value },
]);
async function generate() {
    await tasks.create(code.value);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.data) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: ({ loading: __VLS_ctx.store.loading }) },
    });
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "page-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['page-actions']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ class: "btn" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.Plus} */
    Plus;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: (16),
    }));
    const __VLS_2 = __VLS_1({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ class: "btn" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    let __VLS_5;
    /** @ts-ignore @type {typeof ___VLS_components.Download} */
    Download;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        size: (16),
    }));
    const __VLS_7 = __VLS_6({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.generate) },
        ...{ class: "btn primary" },
        disabled: (__VLS_ctx.tasks.current?.status === 'running'),
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['primary']} */ ;
    let __VLS_10;
    /** @ts-ignore @type {typeof ___VLS_components.FileText} */
    FileText;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        size: (16),
    }));
    const __VLS_12 = __VLS_11({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    (__VLS_ctx.tasks.current?.status === 'running' ? `分析中 ${__VLS_ctx.tasks.current.progress}%` : '生成研究报告');
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel stock-summary" },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
    /** @type {__VLS_StyleScopedClasses['stock-summary']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.data.stock.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (__VLS_ctx.data.stock.ts_code);
    let __VLS_15;
    /** @ts-ignore @type {typeof ___VLS_components.Star} */
    Star;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        size: (16),
        fill: "#2563eb",
        color: "#2563eb",
    }));
    const __VLS_17 = __VLS_16({
        size: (16),
        fill: "#2563eb",
        color: "#2563eb",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
        ...{ class: "positive" },
    });
    /** @type {__VLS_StyleScopedClasses['positive']} */ ;
    (__VLS_ctx.data.summary.price);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
        ...{ class: "negative" },
    });
    /** @type {__VLS_StyleScopedClasses['negative']} */ ;
    (__VLS_ctx.data.summary.pct_chg);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.data.summary.total_mv.toLocaleString());
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.data.summary.pe_ttm);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.data.summary.pb);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.data.summary.latest_report_period);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tabs" },
    });
    /** @type {__VLS_StyleScopedClasses['tabs']} */ ;
    for (const [tab] of __VLS_getVForSourceType((['估值', '成长', '盈利', '现金流', '负债', '对比']))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.data))
                        return;
                    __VLS_ctx.activeTab = tab;
                    // @ts-ignore
                    [data, data, data, data, data, data, data, data, data, store, generate, tasks, tasks, tasks, activeTab,];
                } },
            key: (tab),
            ...{ class: ({ active: __VLS_ctx.activeTab === tab }) },
        });
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        (tab);
        // @ts-ignore
        [activeTab,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "split-main" },
    });
    /** @type {__VLS_StyleScopedClasses['split-main']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "chart-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['chart-grid']} */ ;
    for (const [chartItem] of __VLS_getVForSourceType((__VLS_ctx.charts))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
            key: (chartItem.title),
            ...{ class: "panel chart-panel" },
        });
        /** @type {__VLS_StyleScopedClasses['panel']} */ ;
        /** @type {__VLS_StyleScopedClasses['chart-panel']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "panel-title" },
        });
        /** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        (chartItem.title);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "panel-body" },
        });
        /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
        const __VLS_20 = BaseChart;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            option: (chartItem.option),
            height: (205),
        }));
        const __VLS_22 = __VLS_21({
            option: (chartItem.option),
            height: (205),
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        // @ts-ignore
        [charts,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "panel" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-title" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "table-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['table-wrap']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.table, __VLS_intrinsics.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    for (const [peer] of __VLS_getVForSourceType((__VLS_ctx.data.peers))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (peer.ts_code),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (peer.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (peer.ts_code);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (peer.price);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (peer.total_mv);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (peer.pe_ttm);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (peer.roe);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: "negative" },
        });
        /** @type {__VLS_StyleScopedClasses['negative']} */ ;
        (peer.gross_margin);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (peer.dividend_yield);
        // @ts-ignore
        [data,];
    }
    const __VLS_25 = AgentInsightPanel;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        insight: (__VLS_ctx.data.agent_insight),
    }));
    const __VLS_27 = __VLS_26({
        insight: (__VLS_ctx.data.agent_insight),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
}
// @ts-ignore
[data,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
