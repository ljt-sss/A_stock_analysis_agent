/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { onMounted, ref } from 'vue';
import { FileText, Play, RefreshCw } from 'lucide-vue-next';
import { agentApi } from '../api/agent';
import { useTaskStore } from '../stores/taskStore';
import StatusBadge from '../components/common/StatusBadge.vue';
const tasks = useTaskStore(), reports = ref([]), selected = ref(null);
async function load() { reports.value = await agentApi.reports(); selected.value = reports.value[0]; }
async function run() { await tasks.create('600519.SH'); await load(); }
onMounted(load);
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-actions" },
});
/** @type {__VLS_StyleScopedClasses['page-actions']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.load) },
    ...{ class: "btn" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.run) },
    ...{ class: "btn primary" },
    disabled: (__VLS_ctx.tasks.current?.status === 'running'),
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.Play} */
Play;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    size: (16),
}));
const __VLS_7 = __VLS_6({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
(__VLS_ctx.tasks.current?.status === 'running' ? `执行中 ${__VLS_ctx.tasks.current.progress}%` : '生成贵州茅台报告');
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
const __VLS_10 = StatusBadge;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ class: "spacer" },
    text: (__VLS_ctx.tasks.current?.status || 'ready'),
    tone: (__VLS_ctx.tasks.current?.status === 'success' ? 'success' : 'info'),
}));
const __VLS_12 = __VLS_11({
    ...{ class: "spacer" },
    text: (__VLS_ctx.tasks.current?.status || 'ready'),
    tone: (__VLS_ctx.tasks.current?.status === 'success' ? 'success' : 'info'),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "progress" },
});
/** @type {__VLS_StyleScopedClasses['progress']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
    ...{ style: ({ width: (__VLS_ctx.tasks.current?.progress || 0) + '%' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "muted" },
});
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
(__VLS_ctx.tasks.current?.current_step || '等待创建任务');
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-grid" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['chart-grid']} */ ;
for (const [step] of __VLS_getVForSourceType((__VLS_ctx.tasks.steps))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (step.id),
        ...{ class: "panel-body" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
    const __VLS_15 = StatusBadge;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        text: (step.status),
        tone: (step.status === 'success' ? 'success' : 'info'),
    }));
    const __VLS_17 = __VLS_16({
        text: (step.status),
        tone: (step.status === 'success' ? 'success' : 'info'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
        ...{ style: {} },
    });
    (step.step_name);
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (step.step_order);
    // @ts-ignore
    [load, run, tasks, tasks, tasks, tasks, tasks, tasks, tasks, tasks,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
let __VLS_20;
/** @ts-ignore @type {typeof ___VLS_components.FileText} */
FileText;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    size: (17),
}));
const __VLS_22 = __VLS_21({
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
if (__VLS_ctx.selected) {
    __VLS_asFunctionalElement(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
        ...{ class: "markdown" },
    });
    /** @type {__VLS_StyleScopedClasses['markdown']} */ ;
    (__VLS_ctx.selected.content_md);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty" },
    });
    /** @type {__VLS_StyleScopedClasses['empty']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-panel" },
});
/** @type {__VLS_StyleScopedClasses['list-panel']} */ ;
for (const [x] of __VLS_getVForSourceType((__VLS_ctx.reports))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selected = x;
                // @ts-ignore
                [selected, selected, selected, reports,];
            } },
        key: (x.id),
        ...{ class: "list-item" },
        ...{ class: ({ active: __VLS_ctx.selected?.id === x.id }) },
    });
    /** @type {__VLS_StyleScopedClasses['list-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (x.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (x.created_at?.slice(0, 10));
    // @ts-ignore
    [selected,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
if (__VLS_ctx.selected) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-body" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (__VLS_ctx.selected.structured_result?.data_accuracy);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (__VLS_ctx.selected.structured_result?.citation_coverage);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (__VLS_ctx.selected.structured_result?.tool_success_rate);
}
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "disclaimer" },
});
/** @type {__VLS_StyleScopedClasses['disclaimer']} */ ;
// @ts-ignore
[selected, selected, selected, selected,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
