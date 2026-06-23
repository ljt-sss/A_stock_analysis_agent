/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { BookOpen, Brain, Clock3, Link2, Plus, Save } from 'lucide-vue-next';
import { wikiApi } from '../api/wiki';
const pages = ref([]), memories = ref([]), selected = ref(null), newMemory = ref('');
async function load() { pages.value = await wikiApi.pages(); memories.value = await wikiApi.memories(); selected.value = pages.value[0]; }
async function add() { if (!newMemory.value.trim())
    return; await wikiApi.createMemory({ scope: 'stock', memory_type: 'risk_note', ts_code: '600519.SH', title: '研究员补充', content: newMemory.value, confidence: .8 }); newMemory.value = ''; memories.value = await wikiApi.memories(); }
onMounted(load);
const graphOption = computed(() => ({ tooltip: {}, series: [{ type: 'graph', layout: 'force', roam: true, label: { show: true }, force: { repulsion: 180 }, data: [{ name: '贵州茅台', symbolSize: 58, itemStyle: { color: '#2563eb' } }, { name: '食品饮料', symbolSize: 40, itemStyle: { color: '#10b981' } }, { name: '高端白酒', symbolSize: 40, itemStyle: { color: '#8b5cf6' } }, { name: '品牌壁垒', symbolSize: 34, itemStyle: { color: '#f59e0b' } }, { name: '渠道库存', symbolSize: 34, itemStyle: { color: '#ef4444' } }], links: [{ source: '贵州茅台', target: '食品饮料' }, { source: '贵州茅台', target: '高端白酒' }, { source: '贵州茅台', target: '品牌壁垒' }, { source: '高端白酒', target: '渠道库存' }] }] }));
import BaseChart from '../components/charts/BaseChart.vue';
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
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
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.BookOpen} */
BookOpen;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (17),
}));
const __VLS_2 = __VLS_1({
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.Plus} */
Plus;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "spacer" },
    size: (16),
}));
const __VLS_7 = __VLS_6({
    ...{ class: "spacer" },
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
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
(__VLS_ctx.pages.length);
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
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-panel" },
});
/** @type {__VLS_StyleScopedClasses['list-panel']} */ ;
for (const [p] of __VLS_getVForSourceType((__VLS_ctx.pages))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selected = p;
                // @ts-ignore
                [pages, pages, selected,];
            } },
        key: (p.id),
        ...{ class: "list-item" },
        ...{ class: ({ active: __VLS_ctx.selected?.id === p.id }) },
    });
    /** @type {__VLS_StyleScopedClasses['list-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (p.title);
    // @ts-ignore
    [selected,];
}
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
(__VLS_ctx.selected?.title || 'Wiki 页面');
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "spacer status-badge success" },
});
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['success']} */ ;
(__VLS_ctx.selected?.freshness || 'unknown');
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ class: "btn" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
let __VLS_10;
/** @ts-ignore @type {typeof ___VLS_components.Save} */
Save;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    size: (14),
}));
const __VLS_12 = __VLS_11({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_asFunctionalElement(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
    ...{ class: "markdown" },
});
/** @type {__VLS_StyleScopedClasses['markdown']} */ ;
(__VLS_ctx.selected?.content_md);
__VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "panel chart-panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
let __VLS_15;
/** @ts-ignore @type {typeof ___VLS_components.Link2} */
Link2;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    size: (16),
}));
const __VLS_17 = __VLS_16({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
const __VLS_20 = BaseChart;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    option: (__VLS_ctx.graphOption),
    height: (260),
}));
const __VLS_22 = __VLS_21({
    option: (__VLS_ctx.graphOption),
    height: (260),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.Brain} */
Brain;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    size: (17),
}));
const __VLS_27 = __VLS_26({
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "spacer status-badge info" },
});
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
(__VLS_ctx.memories.length);
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-body" },
});
/** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
    value: (__VLS_ctx.newMemory),
    rows: "3",
    placeholder: "记录新的投资假设、观察指标或风险变化",
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.add) },
    ...{ class: "btn primary" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
let __VLS_30;
/** @ts-ignore @type {typeof ___VLS_components.Plus} */
Plus;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    size: (15),
}));
const __VLS_32 = __VLS_31({
    size: (15),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
for (const [m] of __VLS_getVForSourceType((__VLS_ctx.memories))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (m.id),
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (m.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "status-badge success" },
    });
    /** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
    /** @type {__VLS_StyleScopedClasses['success']} */ ;
    (Math.round(m.confidence * 100));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (m.content);
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    let __VLS_35;
    /** @ts-ignore @type {typeof ___VLS_components.Clock3} */
    Clock3;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        size: (12),
    }));
    const __VLS_37 = __VLS_36({
        size: (12),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    (m.source);
    (m.updated_at?.slice(0, 10));
    // @ts-ignore
    [selected, selected, selected, graphOption, memories, memories, newMemory, add,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "disclaimer" },
});
/** @type {__VLS_StyleScopedClasses['disclaimer']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
