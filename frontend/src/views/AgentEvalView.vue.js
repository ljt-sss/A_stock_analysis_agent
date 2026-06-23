/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { AlertTriangle, CheckCircle2, Quote, RefreshCw, Search, Target, Wrench } from 'lucide-vue-next';
import KpiCard from '../components/common/KpiCard.vue';
import BaseChart from '../components/charts/BaseChart.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import { evalApi } from '../api/eval';
const metrics = ref(null), cases = ref([]), results = ref([]), running = ref(false);
onMounted(async () => { [metrics.value, cases.value, results.value] = await Promise.all([evalApi.metrics(), evalApi.cases(), evalApi.results()]); });
const option = computed(() => ({ tooltip: { trigger: 'axis' }, legend: { top: 0 }, grid: { left: 42, right: 45, top: 38, bottom: 28 }, xAxis: { type: 'category', data: metrics.value?.trend.map((x) => x.date) || [] }, yAxis: [{ type: 'value', min: 80, max: 100 }, { type: 'value', min: 0, max: 10 }], series: [{ name: '数据准确率', type: 'line', smooth: true, data: metrics.value?.trend.map((x) => x.data_accuracy) || [], symbol: 'none' }, { name: '检索命中率', type: 'line', smooth: true, data: metrics.value?.trend.map((x) => x.retrieval_hit_rate) || [], symbol: 'none' }, { name: '幻觉率', type: 'line', smooth: true, yAxisIndex: 1, data: metrics.value?.trend.map((x) => x.hallucination_rate) || [], symbol: 'none', lineStyle: { color: '#ef4444', type: 'dashed' } }] }));
function run() { running.value = true; setTimeout(() => running.value = false, 1000); }
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.metrics) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "page-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['page-actions']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.run) },
        ...{ class: "btn primary" },
    });
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['primary']} */ ;
    let __VLS_0;
    /** @ts-ignore @type {typeof ___VLS_components.RefreshCw} */
    RefreshCw;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: (16),
    }));
    const __VLS_2 = __VLS_1({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    (__VLS_ctx.running ? '评估中...' : '新建评估任务');
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "kpi-grid six grid" },
    });
    /** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['six']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    const __VLS_5 = KpiCard;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        label: "数据准确率",
        value: (__VLS_ctx.metrics.data_accuracy + '%'),
        change: "+2.31pp",
        tone: "blue",
        icon: (__VLS_ctx.Target),
    }));
    const __VLS_7 = __VLS_6({
        label: "数据准确率",
        value: (__VLS_ctx.metrics.data_accuracy + '%'),
        change: "+2.31pp",
        tone: "blue",
        icon: (__VLS_ctx.Target),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const __VLS_10 = KpiCard;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        label: "检索命中率",
        value: (__VLS_ctx.metrics.retrieval_hit_rate + '%'),
        change: "+1.87pp",
        tone: "green",
        icon: (__VLS_ctx.Search),
    }));
    const __VLS_12 = __VLS_11({
        label: "检索命中率",
        value: (__VLS_ctx.metrics.retrieval_hit_rate + '%'),
        change: "+1.87pp",
        tone: "green",
        icon: (__VLS_ctx.Search),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const __VLS_15 = KpiCard;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        label: "引用覆盖率",
        value: (__VLS_ctx.metrics.citation_coverage + '%'),
        change: "+2.06pp",
        tone: "purple",
        icon: (__VLS_ctx.Quote),
    }));
    const __VLS_17 = __VLS_16({
        label: "引用覆盖率",
        value: (__VLS_ctx.metrics.citation_coverage + '%'),
        change: "+2.06pp",
        tone: "purple",
        icon: (__VLS_ctx.Quote),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const __VLS_20 = KpiCard;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: "工具成功率",
        value: (__VLS_ctx.metrics.tool_success_rate + '%'),
        change: "+3.41pp",
        tone: "orange",
        icon: (__VLS_ctx.Wrench),
    }));
    const __VLS_22 = __VLS_21({
        label: "工具成功率",
        value: (__VLS_ctx.metrics.tool_success_rate + '%'),
        change: "+3.41pp",
        tone: "orange",
        icon: (__VLS_ctx.Wrench),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_25 = KpiCard;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        label: "幻觉率",
        value: (__VLS_ctx.metrics.hallucination_rate + '%'),
        change: "-0.64pp",
        tone: "red",
        icon: (__VLS_ctx.AlertTriangle),
    }));
    const __VLS_27 = __VLS_26({
        label: "幻觉率",
        value: (__VLS_ctx.metrics.hallucination_rate + '%'),
        change: "-0.64pp",
        tone: "red",
        icon: (__VLS_ctx.AlertTriangle),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const __VLS_30 = KpiCard;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        label: "任务恢复率",
        value: (__VLS_ctx.metrics.task_recovery_rate + '%'),
        change: "+1.23pp",
        tone: "green",
        icon: (__VLS_ctx.CheckCircle2),
    }));
    const __VLS_32 = __VLS_31({
        label: "任务恢复率",
        value: (__VLS_ctx.metrics.task_recovery_rate + '%'),
        change: "+1.23pp",
        tone: "green",
        icon: (__VLS_ctx.CheckCircle2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
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
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-body" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
    const __VLS_35 = BaseChart;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        option: (__VLS_ctx.option),
        height: (280),
    }));
    const __VLS_37 = __VLS_36({
        option: (__VLS_ctx.option),
        height: (280),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
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
    __VLS_asFunctionalElement(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    for (const [x, i] of __VLS_getVForSourceType((__VLS_ctx.cases))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (x.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (x.case_id);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (x.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (x.skill_name);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (__VLS_ctx.results[i]?.score || 94);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        const __VLS_40 = StatusBadge;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            text: ((__VLS_ctx.results[i]?.status || 'passed') === 'passed' ? '通过' : '需复核'),
            tone: ((__VLS_ctx.results[i]?.status || 'passed') === 'passed' ? 'success' : 'warning'),
        }));
        const __VLS_42 = __VLS_41({
            text: ((__VLS_ctx.results[i]?.status || 'passed') === 'passed' ? '通过' : '需复核'),
            tone: ((__VLS_ctx.results[i]?.status || 'passed') === 'passed' ? 'success' : 'warning'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        // @ts-ignore
        [metrics, metrics, metrics, metrics, metrics, metrics, metrics, run, running, Target, Search, Quote, Wrench, AlertTriangle, CheckCircle2, option, cases, results, results, results,];
    }
    for (const [i] of __VLS_getVForSourceType((4))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (i),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (i + 10);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (90 + i);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        const __VLS_45 = StatusBadge;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            text: "通过",
            tone: "success",
        }));
        const __VLS_47 = __VLS_46({
            text: "通过",
            tone: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
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
        ...{ class: "panel-body" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
    for (const [x] of __VLS_getVForSourceType(([{ t: '引用不足', s: 58 }, { t: '财报期间映射错误', s: 62 }, { t: '工具调用超时', s: 59 }]))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (x.t),
            ...{ style: {} },
        });
        const __VLS_50 = StatusBadge;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
            text: "失败",
            tone: "danger",
        }));
        const __VLS_52 = __VLS_51({
            text: "失败",
            tone: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
            ...{ style: {} },
        });
        (x.t);
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "muted" },
        });
        /** @type {__VLS_StyleScopedClasses['muted']} */ ;
        (x.s);
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "panel" },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
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
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
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
