/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted } from 'vue';
import { Activity, AlertTriangle, CheckCircle2, FileClock, Star } from 'lucide-vue-next';
import KpiCard from '../components/common/KpiCard.vue';
import BaseChart from '../components/charts/BaseChart.vue';
import { useStockStore } from '../stores/stockStore';
const store = useStockStore();
onMounted(() => store.load());
const lineOption = computed(() => ({ tooltip: { trigger: 'axis' }, grid: { left: 42, right: 18, top: 30, bottom: 30 }, xAxis: { type: 'category', data: store.dashboard?.valuation_series.slice(-18).map((x) => x.date.slice(0, 7)) || [] }, yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eef2f7' } } }, series: [{ type: 'line', smooth: true, symbol: 'none', data: store.dashboard?.valuation_series.slice(-18).map((x) => x.total_mv) || [], lineStyle: { color: '#2563eb', width: 2 }, areaStyle: { color: 'rgba(37,99,235,.08)' } }] }));
const barOption = computed(() => ({ tooltip: { trigger: 'axis' }, grid: { left: 42, right: 18, top: 30, bottom: 30 }, xAxis: { type: 'category', data: store.dashboard?.quarterly_financials.slice(-8).map((x) => x.period) || [] }, yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eef2f7' } } }, series: [{ name: '营收', type: 'bar', data: store.dashboard?.quarterly_financials.slice(-8).map((x) => x.revenue) || [], itemStyle: { color: '#60a5fa' } }, { name: '净利润', type: 'bar', data: store.dashboard?.quarterly_financials.slice(-8).map((x) => x.net_profit_parent) || [], itemStyle: { color: '#10b981' } }] }));
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ({ loading: __VLS_ctx.store.loading }) },
});
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "kpi-grid grid" },
});
/** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
const __VLS_0 = KpiCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    label: "关注股票数",
    value: "128只",
    change: "较上周 +3",
    tone: "blue",
    icon: (__VLS_ctx.Star),
}));
const __VLS_2 = __VLS_1({
    label: "关注股票数",
    value: "128只",
    change: "较上周 +3",
    tone: "blue",
    icon: (__VLS_ctx.Star),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = KpiCard;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    label: "待更新财报",
    value: "18只",
    change: "较上周 -2",
    tone: "orange",
    icon: (__VLS_ctx.FileClock),
}));
const __VLS_7 = __VLS_6({
    label: "待更新财报",
    value: "18只",
    change: "较上周 -2",
    tone: "orange",
    icon: (__VLS_ctx.FileClock),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = KpiCard;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    label: "本周预警",
    value: "6只",
    change: "较上周 +1",
    tone: "red",
    icon: (__VLS_ctx.AlertTriangle),
}));
const __VLS_12 = __VLS_11({
    label: "本周预警",
    value: "6只",
    change: "较上周 +1",
    tone: "red",
    icon: (__VLS_ctx.AlertTriangle),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_15 = KpiCard;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    label: "新增热点",
    value: "12个",
    change: "较上周 +4",
    tone: "purple",
    icon: (__VLS_ctx.Activity),
}));
const __VLS_17 = __VLS_16({
    label: "新增热点",
    value: "12个",
    change: "较上周 +4",
    tone: "purple",
    icon: (__VLS_ctx.Activity),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const __VLS_20 = KpiCard;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "已完成分析",
    value: "86只",
    change: "较上周 +8",
    tone: "green",
    icon: (__VLS_ctx.CheckCircle2),
}));
const __VLS_22 = __VLS_21({
    label: "已完成分析",
    value: "86只",
    change: "较上周 +8",
    tone: "green",
    icon: (__VLS_ctx.CheckCircle2),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "split-main" },
});
/** @type {__VLS_StyleScopedClasses['split-main']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "grid" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "panel chart-panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "spacer muted" },
});
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
const __VLS_25 = BaseChart;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    option: (__VLS_ctx.lineOption),
    height: (270),
}));
const __VLS_27 = __VLS_26({
    option: (__VLS_ctx.lineOption),
    height: (270),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "panel chart-panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "spacer muted" },
});
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
const __VLS_30 = BaseChart;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    option: (__VLS_ctx.barOption),
    height: (270),
}));
const __VLS_32 = __VLS_31({
    option: (__VLS_ctx.barOption),
    height: (270),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item active" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "timeline" },
});
/** @type {__VLS_StyleScopedClasses['timeline']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
__VLS_asFunctionalElement(__VLS_intrinsics.br)({});
__VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
// @ts-ignore
[store, Star, FileClock, AlertTriangle, Activity, CheckCircle2, lineOption, barOption,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
