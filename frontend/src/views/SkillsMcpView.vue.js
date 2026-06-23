/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { AlertTriangle, Quote, RotateCcw, Search, Target, Wrench } from 'lucide-vue-next';
import KpiCard from '../components/common/KpiCard.vue';
import BaseChart from '../components/charts/BaseChart.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import { evalApi } from '../api/eval';
const metrics = ref(null);
const skills = ref([]);
const tools = ref([]);
const calls = ref([]);
onMounted(async () => {
    ;
    [metrics.value, skills.value, tools.value, calls.value] = await Promise.all([
        evalApi.metrics(),
        evalApi.skills(),
        evalApi.tools(),
        evalApi.calls(),
    ]);
});
const option = computed(() => ({
    tooltip: { trigger: 'axis' },
    legend: { top: 0 },
    grid: { left: 42, right: 42, top: 38, bottom: 28 },
    xAxis: { type: 'category', data: metrics.value?.trend.map((x) => x.date) || [] },
    yAxis: { type: 'value', min: 80, max: 100, splitLine: { lineStyle: { color: '#eef2f7' } } },
    series: [
        ['数据准确率', 'data_accuracy', '#2563eb'],
        ['检索命中率', 'retrieval_hit_rate', '#10b981'],
        ['工具成功率', 'tool_success_rate', '#f59e0b'],
    ].map(([name, key, color]) => ({
        name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: metrics.value?.trend.map((x) => x[key]) || [],
        lineStyle: { color },
    })),
}));
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.metrics) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "kpi-grid six grid" },
    });
    /** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['six']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    const __VLS_0 = KpiCard;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        label: "数据准确率",
        value: (__VLS_ctx.metrics.data_accuracy + '%'),
        change: "较上周 +2.31pp",
        tone: "blue",
        icon: (__VLS_ctx.Target),
    }));
    const __VLS_2 = __VLS_1({
        label: "数据准确率",
        value: (__VLS_ctx.metrics.data_accuracy + '%'),
        change: "较上周 +2.31pp",
        tone: "blue",
        icon: (__VLS_ctx.Target),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_5 = KpiCard;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        label: "检索命中率",
        value: (__VLS_ctx.metrics.retrieval_hit_rate + '%'),
        change: "较上周 +1.87pp",
        tone: "green",
        icon: (__VLS_ctx.Search),
    }));
    const __VLS_7 = __VLS_6({
        label: "检索命中率",
        value: (__VLS_ctx.metrics.retrieval_hit_rate + '%'),
        change: "较上周 +1.87pp",
        tone: "green",
        icon: (__VLS_ctx.Search),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const __VLS_10 = KpiCard;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        label: "引用覆盖率",
        value: (__VLS_ctx.metrics.citation_coverage + '%'),
        change: "较上周 +2.06pp",
        tone: "purple",
        icon: (__VLS_ctx.Quote),
    }));
    const __VLS_12 = __VLS_11({
        label: "引用覆盖率",
        value: (__VLS_ctx.metrics.citation_coverage + '%'),
        change: "较上周 +2.06pp",
        tone: "purple",
        icon: (__VLS_ctx.Quote),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    const __VLS_15 = KpiCard;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        label: "工具成功率",
        value: (__VLS_ctx.metrics.tool_success_rate + '%'),
        change: "较上周 +3.41pp",
        tone: "orange",
        icon: (__VLS_ctx.Wrench),
    }));
    const __VLS_17 = __VLS_16({
        label: "工具成功率",
        value: (__VLS_ctx.metrics.tool_success_rate + '%'),
        change: "较上周 +3.41pp",
        tone: "orange",
        icon: (__VLS_ctx.Wrench),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const __VLS_20 = KpiCard;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: "幻觉率",
        value: (__VLS_ctx.metrics.hallucination_rate + '%'),
        change: "较上周 -0.64pp",
        tone: "red",
        icon: (__VLS_ctx.AlertTriangle),
    }));
    const __VLS_22 = __VLS_21({
        label: "幻觉率",
        value: (__VLS_ctx.metrics.hallucination_rate + '%'),
        change: "较上周 -0.64pp",
        tone: "red",
        icon: (__VLS_ctx.AlertTriangle),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_25 = KpiCard;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        label: "任务恢复率",
        value: (__VLS_ctx.metrics.task_recovery_rate + '%'),
        change: "较上周 +1.23pp",
        tone: "green",
        icon: (__VLS_ctx.RotateCcw),
    }));
    const __VLS_27 = __VLS_26({
        label: "任务恢复率",
        value: (__VLS_ctx.metrics.task_recovery_rate + '%'),
        change: "较上周 +1.23pp",
        tone: "green",
        icon: (__VLS_ctx.RotateCcw),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "chart-grid" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['chart-grid']} */ ;
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
    const __VLS_30 = BaseChart;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        option: (__VLS_ctx.option),
        height: (270),
    }));
    const __VLS_32 = __VLS_31({
        option: (__VLS_ctx.option),
        height: (270),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
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
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.skills.slice(0, 7)))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (item.name),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (item.title);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (item.success_rate);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        ((item.avg_latency_ms / 1000).toFixed(2));
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        const __VLS_35 = StatusBadge;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            text: "通过",
            tone: "success",
        }));
        const __VLS_37 = __VLS_36({
            text: "通过",
            tone: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        // @ts-ignore
        [metrics, metrics, metrics, metrics, metrics, metrics, metrics, Target, Search, Quote, Wrench, AlertTriangle, RotateCcw, option, skills,];
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
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.tools))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (item.name),
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (item.name);
        const __VLS_40 = StatusBadge;
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
            text: "在线",
            tone: "success",
        }));
        const __VLS_42 = __VLS_41({
            text: "在线",
            tone: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_41));
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "muted" },
        });
        /** @type {__VLS_StyleScopedClasses['muted']} */ ;
        (item.tools.length);
        (item.avg_latency_ms);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "progress" },
        });
        /** @type {__VLS_StyleScopedClasses['progress']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
            ...{ style: ({ width: item.success_rate + '%' }) },
        });
        // @ts-ignore
        [tools,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "split-main" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['split-main']} */ ;
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
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.calls))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (item.tool_name + item.created_at),
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (item.created_at?.slice(11, 19));
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
        (item.tool_name);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (item.tool_type);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (item.latency_ms);
        __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        const __VLS_45 = StatusBadge;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            text: (item.status),
            tone: "success",
        }));
        const __VLS_47 = __VLS_46({
            text: (item.status),
            tone: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        // @ts-ignore
        [calls,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
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
