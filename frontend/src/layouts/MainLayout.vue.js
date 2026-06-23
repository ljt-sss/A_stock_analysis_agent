/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BarChart3, Bell, BookOpen, BrainCircuit, BriefcaseBusiness, CalendarDays, ChartCandlestick, ChevronDown, FileChartColumn, Home, LineChart, MemoryStick, Search, Star, UserRound } from 'lucide-vue-next';
const route = useRoute(), router = useRouter(), keyword = ref('');
const title = computed(() => String(route.meta.title || '总览'));
const nav = [['总览', '/', Home], ['自选股分组', '/watchlist', Star], ['个股驾驶舱', '/stocks/600519.SH', BriefcaseBusiness], ['财报中心', '/reports', FileChartColumn], ['基本面分析', '/analysis', LineChart], ['新闻与板块', '/news', ChartCandlestick], ['Wiki知识库', '/wiki', BookOpen], ['长期记忆', '/wiki?tab=memory', MemoryStick], ['Skills / MCP', '/skills', BrainCircuit], ['Agent评估', '/evals', BarChart3]];
async function search() { if (keyword.value.trim())
    await router.push(`/stocks/600519.SH?keyword=${encodeURIComponent(keyword.value)}`); }
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "app-shell" },
});
/** @type {__VLS_StyleScopedClasses['app-shell']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "topbar" },
});
/** @type {__VLS_StyleScopedClasses['topbar']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "brand" },
});
/** @type {__VLS_StyleScopedClasses['brand']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-icon" },
});
/** @type {__VLS_StyleScopedClasses['brand-icon']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.Star} */
Star;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: (22),
    fill: "currentColor",
}));
const __VLS_2 = __VLS_1({
    size: (22),
    fill: "currentColor",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "global-search" },
});
/** @type {__VLS_StyleScopedClasses['global-search']} */ ;
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.Search} */
Search;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    size: (18),
}));
const __VLS_7 = __VLS_6({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    ...{ onKeyup: (__VLS_ctx.search) },
    placeholder: "搜索股票 / 板块 / 财报 / 指标 / 资料",
});
(__VLS_ctx.keyword);
__VLS_asFunctionalElement(__VLS_intrinsics.kbd, __VLS_intrinsics.kbd)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "top-actions" },
});
/** @type {__VLS_StyleScopedClasses['top-actions']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_10;
/** @ts-ignore @type {typeof ___VLS_components.CalendarDays} */
CalendarDays;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    size: (17),
}));
const __VLS_12 = __VLS_11({
    size: (17),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "market" },
});
/** @type {__VLS_StyleScopedClasses['market']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ class: "icon-btn" },
    title: "通知",
});
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
let __VLS_15;
/** @ts-ignore @type {typeof ___VLS_components.Bell} */
Bell;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    size: (19),
}));
const __VLS_17 = __VLS_16({
    size: (19),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_asFunctionalElement(__VLS_intrinsics.em, __VLS_intrinsics.em)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_20;
/** @ts-ignore @type {typeof ___VLS_components.UserRound} */
UserRound;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    size: (20),
}));
const __VLS_22 = __VLS_21({
    size: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_25;
/** @ts-ignore @type {typeof ___VLS_components.ChevronDown} */
ChevronDown;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    size: (14),
}));
const __VLS_27 = __VLS_26({
    size: (14),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "sidebar" },
});
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({});
for (const [[label, path, icon]] of __VLS_getVForSourceType((__VLS_ctx.nav))) {
    let __VLS_30;
    /** @ts-ignore @type {typeof ___VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        key: (String(path)),
        to: (String(path)),
    }));
    const __VLS_32 = __VLS_31({
        key: (String(path)),
        to: (String(path)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_35 } = __VLS_33.slots;
    const __VLS_36 = (icon);
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        size: (19),
    }));
    const __VLS_38 = __VLS_37({
        size: (19),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (label);
    // @ts-ignore
    [search, keyword, nav,];
    var __VLS_33;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "system-card" },
});
/** @type {__VLS_StyleScopedClasses['system-card']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "content" },
});
/** @type {__VLS_StyleScopedClasses['content']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-heading" },
});
/** @type {__VLS_StyleScopedClasses['page-heading']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_41;
/** @ts-ignore @type {typeof ___VLS_components.RouterView} */
RouterView;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_asFunctionalElement(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({});
// @ts-ignore
[title,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
