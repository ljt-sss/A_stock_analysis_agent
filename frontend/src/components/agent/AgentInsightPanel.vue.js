/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { Bot } from 'lucide-vue-next';
const __VLS_props = defineProps(); // @ts-ignore
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
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
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Bot} */
Bot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (18),
}));
const __VLS_2 = __VLS_1({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
if (__VLS_ctx.insight) {
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "status-badge success" },
    });
    /** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
    /** @type {__VLS_StyleScopedClasses['success']} */ ;
    (__VLS_ctx.insight.valuation?.label);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.insight.valuation?.text);
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "status-badge success" },
    });
    /** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
    /** @type {__VLS_StyleScopedClasses['success']} */ ;
    (__VLS_ctx.insight.performance?.label);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.insight.performance?.text);
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.insight.cashflow?.text);
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [x] of __VLS_getVForSourceType((__VLS_ctx.insight.risks))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (x),
        });
        (x);
        // @ts-ignore
        [insight, insight, insight, insight, insight, insight, insight,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [x] of __VLS_getVForSourceType((__VLS_ctx.insight.followups))) {
        __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (x),
        });
        (x);
        // @ts-ignore
        [insight,];
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "disclaimer" },
});
/** @type {__VLS_StyleScopedClasses['disclaimer']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
