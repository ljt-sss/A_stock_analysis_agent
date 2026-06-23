/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { onMounted, ref } from 'vue';
import { AlertTriangle, CheckCircle2, FileClock, FileText, RefreshCw, Sparkles } from 'lucide-vue-next';
import KpiCard from '../components/common/KpiCard.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import { reportApi } from '../api/reports';
const reports = ref([]), selected = ref(null), pipeline = ref([]), updating = ref(false);
async function load() { reports.value = await reportApi.list(); selected.value = reports.value[0]; if (selected.value)
    pipeline.value = await reportApi.pipeline(selected.value.id); }
async function update() { updating.value = true; await reportApi.updateAll(); setTimeout(() => updating.value = false, 900); }
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
    ...{ onClick: (__VLS_ctx.update) },
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
(__VLS_ctx.updating ? '更新中...' : '更新全部财报');
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ class: "btn" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ class: "btn" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ class: "btn primary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.Sparkles} */
Sparkles;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    size: (16),
}));
const __VLS_7 = __VLS_6({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "kpi-grid grid" },
});
/** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
const __VLS_10 = KpiCard;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    label: "已收录财报",
    value: "1,286份",
    change: "覆盖 128 家公司",
    tone: "blue",
    icon: (__VLS_ctx.FileText),
}));
const __VLS_12 = __VLS_11({
    label: "已收录财报",
    value: "1,286份",
    change: "覆盖 128 家公司",
    tone: "blue",
    icon: (__VLS_ctx.FileText),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_15 = KpiCard;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    label: "待解析",
    value: "18份",
    change: "队列正常",
    tone: "orange",
    icon: (__VLS_ctx.FileClock),
}));
const __VLS_17 = __VLS_16({
    label: "待解析",
    value: "18份",
    change: "队列正常",
    tone: "orange",
    icon: (__VLS_ctx.FileClock),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const __VLS_20 = KpiCard;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "解析成功率",
    value: "96.8%",
    change: "较上周 +1.2pp",
    tone: "green",
    icon: (__VLS_ctx.CheckCircle2),
}));
const __VLS_22 = __VLS_21({
    label: "解析成功率",
    value: "96.8%",
    change: "较上周 +1.2pp",
    tone: "green",
    icon: (__VLS_ctx.CheckCircle2),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_25 = KpiCard;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    label: "本周新增公告",
    value: "84份",
    change: "较上周 +16",
    tone: "purple",
    icon: (__VLS_ctx.FileText),
}));
const __VLS_27 = __VLS_26({
    label: "本周新增公告",
    value: "84份",
    change: "较上周 +16",
    tone: "purple",
    icon: (__VLS_ctx.FileText),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const __VLS_30 = KpiCard;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    label: "待复核异常",
    value: "6份",
    change: "需人工确认",
    tone: "red",
    icon: (__VLS_ctx.AlertTriangle),
}));
const __VLS_32 = __VLS_31({
    label: "待复核异常",
    value: "6份",
    change: "需人工确认",
    tone: "red",
    icon: (__VLS_ctx.AlertTriangle),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "split-3" },
});
/** @type {__VLS_StyleScopedClasses['split-3']} */ ;
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
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
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
(__VLS_ctx.reports.length);
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
for (const [x] of __VLS_getVForSourceType((__VLS_ctx.reports))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selected = x;
                // @ts-ignore
                [update, updating, FileText, FileText, FileClock, CheckCircle2, AlertTriangle, reports, reports, selected,];
            } },
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
    (x.ts_code);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (x.report_period);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (x.publish_date);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "progress" },
    });
    /** @type {__VLS_StyleScopedClasses['progress']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ style: ({ width: x.parse_progress + '%' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (x.extraction_completeness);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    const __VLS_35 = StatusBadge;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        text: (x.parse_status === 'success' ? '解析成功' : '待解析'),
        tone: (x.parse_status === 'success' ? 'success' : 'warning'),
    }));
    const __VLS_37 = __VLS_36({
        text: (x.parse_status === 'success' ? '解析成功' : '待解析'),
        tone: (x.parse_status === 'success' ? 'success' : 'warning'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    // @ts-ignore
    [];
}
if (__VLS_ctx.selected) {
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
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.selected.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (__VLS_ctx.selected.ts_code);
    (__VLS_ctx.selected.report_period);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.selected.summary);
    __VLS_asFunctionalElement(__VLS_intrinsics.hr)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.selected.extraction_completeness);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "progress" },
    });
    /** @type {__VLS_StyleScopedClasses['progress']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ style: ({ width: __VLS_ctx.selected.extraction_completeness + '%' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.selected.source);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (__VLS_ctx.selected.source_url);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "disclaimer" },
    });
    /** @type {__VLS_StyleScopedClasses['disclaimer']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
for (const [x, i] of __VLS_getVForSourceType((__VLS_ctx.pipeline))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (x.name),
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "kpi-icon green" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['kpi-icon']} */ ;
    /** @type {__VLS_StyleScopedClasses['green']} */ ;
    let __VLS_40;
    /** @ts-ignore @type {typeof ___VLS_components.CheckCircle2} */
    CheckCircle2;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        size: (18),
    }));
    const __VLS_42 = __VLS_41({
        size: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
        ...{ style: {} },
    });
    (x.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (i + 1);
    // @ts-ignore
    [selected, selected, selected, selected, selected, selected, selected, selected, selected, pipeline,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
