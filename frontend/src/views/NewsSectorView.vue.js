/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { AlertTriangle, Building2, Flame, Newspaper, Users } from 'lucide-vue-next';
import KpiCard from '../components/common/KpiCard.vue';
import BaseChart from '../components/charts/BaseChart.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import { api } from '../api/client';
const data = ref(null);
onMounted(async () => data.value = await api('/news/overview'));
const trend = computed(() => ({ tooltip: { trigger: 'axis' }, grid: { left: 38, right: 15, top: 25, bottom: 28 }, xAxis: { type: 'category', data: data.value?.heat_trend.map((x) => x.time) || [] }, yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eef2f7' } } }, series: [{ type: 'line', smooth: true, data: data.value?.heat_trend.map((x) => x.value) || [], lineStyle: { color: '#8b5cf6', width: 2 }, areaStyle: { color: 'rgba(139,92,246,.1)' } }] }));
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.data) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "kpi-grid grid" },
    });
    /** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    const __VLS_0 = KpiCard;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        label: "今日热点板块",
        value: (__VLS_ctx.data.kpis.hot_sectors + '个'),
        change: "热度持续",
        tone: "purple",
        icon: (__VLS_ctx.Flame),
    }));
    const __VLS_2 = __VLS_1({
        label: "今日热点板块",
        value: (__VLS_ctx.data.kpis.hot_sectors + '个'),
        change: "热度持续",
        tone: "purple",
        icon: (__VLS_ctx.Flame),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_5 = KpiCard;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        label: "板块异动",
        value: (__VLS_ctx.data.kpis.sector_movements + '次'),
        change: "较昨日 +4",
        tone: "blue",
        icon: (__VLS_ctx.Building2),
    }));
    const __VLS_7 = __VLS_6({
        label: "板块异动",
        value: (__VLS_ctx.data.kpis.sector_movements + '次'),
        change: "较昨日 +4",
        tone: "blue",
        icon: (__VLS_ctx.Building2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const __VLS_10 = KpiCard;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        label: "个股新闻",
        value: (__VLS_ctx.data.kpis.company_news + '条'),
        change: "近24小时",
        tone: "green",
        icon: (__VLS_ctx.Newspaper),
    }));
    const __VLS_12 = __VLS_11({
        label: "个股新闻",
        value: (__VLS_ctx.data.kpis.company_news + '条'),
        change: "近24小时",
        tone: "green",
        icon: (__VLS_ctx.Newspaper),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const __VLS_15 = KpiCard;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        label: "风险公告",
        value: (__VLS_ctx.data.kpis.risk_announcements + '条'),
        change: "需复核",
        tone: "red",
        icon: (__VLS_ctx.AlertTriangle),
    }));
    const __VLS_17 = __VLS_16({
        label: "风险公告",
        value: (__VLS_ctx.data.kpis.risk_announcements + '条'),
        change: "需复核",
        tone: "red",
        icon: (__VLS_ctx.AlertTriangle),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const __VLS_20 = KpiCard;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: "机构调研",
        value: (__VLS_ctx.data.kpis.institutional_research + '次'),
        change: "本周累计",
        tone: "orange",
        icon: (__VLS_ctx.Users),
    }));
    const __VLS_22 = __VLS_21({
        label: "机构调研",
        value: (__VLS_ctx.data.kpis.institutional_research + '次'),
        change: "本周累计",
        tone: "orange",
        icon: (__VLS_ctx.Users),
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
        ...{ class: "panel" },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-title" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
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
    __VLS_asFunctionalElement(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    for (const [x, i] of __VLS_getVForSourceType((__VLS_ctx.data.sectors))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (x.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (i + 1);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (x.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "progress" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['progress']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
            ...{ style: ({ width: x.heat_score + '%' }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: (x.change_pct > 0 ? 'positive' : 'negative') },
        });
        (x.change_pct);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (x.turnover);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (x.reasons.join(' · '));
        // @ts-ignore
        [data, data, data, data, data, data, data, Flame, Building2, Newspaper, AlertTriangle, Users,];
    }
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
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-body" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
    const __VLS_25 = BaseChart;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        option: (__VLS_ctx.trend),
        height: (250),
    }));
    const __VLS_27 = __VLS_26({
        option: (__VLS_ctx.trend),
        height: (250),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "panel" },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-title" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
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
    __VLS_asFunctionalElement(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    for (const [x] of __VLS_getVForSourceType((__VLS_ctx.data.news))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (x.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (x.title);
        __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({
            ...{ class: "muted" },
        });
        /** @type {__VLS_StyleScopedClasses['muted']} */ ;
        (x.content);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (x.source);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (x.publish_time?.slice(0, 16).replace('T', ' '));
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        const __VLS_30 = StatusBadge;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
            text: (x.sentiment),
            tone: (x.sentiment === 'positive' ? 'success' : 'info'),
        }));
        const __VLS_32 = __VLS_31({
            text: (x.sentiment),
            tone: (x.sentiment === 'positive' ? 'success' : 'info'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        // @ts-ignore
        [data, trend,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "panel agent-panel" },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
    /** @type {__VLS_StyleScopedClasses['agent-panel']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-title" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agent-mark" },
    });
    /** @type {__VLS_StyleScopedClasses['agent-mark']} */ ;
    let __VLS_35;
    /** @ts-ignore @type {typeof ___VLS_components.Flame} */
    Flame;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        size: (17),
    }));
    const __VLS_37 = __VLS_36({
        size: (17),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.data.reasoning.summary);
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    for (const [x] of __VLS_getVForSourceType((__VLS_ctx.data.related_stocks))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (x.ts_code),
            ...{ class: "list-item" },
        });
        /** @type {__VLS_StyleScopedClasses['list-item']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (x.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (x.pct_chg > 0 ? 'positive' : 'negative') },
        });
        (x.pct_chg);
        // @ts-ignore
        [data, data,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [x] of __VLS_getVForSourceType((__VLS_ctx.data.reasoning.indicators))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (x),
        });
        (x);
        // @ts-ignore
        [data,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "disclaimer" },
    });
    /** @type {__VLS_StyleScopedClasses['disclaimer']} */ ;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
