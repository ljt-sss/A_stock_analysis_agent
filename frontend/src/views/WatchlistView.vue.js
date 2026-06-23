/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { Activity, AlertTriangle, CheckCircle2, FileClock, Plus, Settings, Star } from 'lucide-vue-next';
import KpiCard from '../components/common/KpiCard.vue';
import StatusBadge from '../components/common/StatusBadge.vue';
import { api } from '../api/client';
const groups = ref([]), stocks = ref([]), selected = ref(null), activeGroup = ref('');
async function load() { groups.value = await api('/watchlists/groups'); if (groups.value.length) {
    activeGroup.value = groups.value[0].id;
    stocks.value = await api(`/watchlists/groups/${activeGroup.value}/stocks`);
    selected.value = stocks.value[0];
} }
onMounted(load);
const selectedStock = computed(() => selected.value?.stock);
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
    ...{ class: "btn primary" },
});
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "kpi-grid grid" },
});
/** @type {__VLS_StyleScopedClasses['kpi-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
const __VLS_5 = KpiCard;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    label: "关注股票数",
    value: "128只",
    change: "较上周 +3",
    tone: "blue",
    icon: (__VLS_ctx.Star),
}));
const __VLS_7 = __VLS_6({
    label: "关注股票数",
    value: "128只",
    change: "较上周 +3",
    tone: "blue",
    icon: (__VLS_ctx.Star),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = KpiCard;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    label: "待更新财报",
    value: "18只",
    change: "较上周 -2",
    tone: "orange",
    icon: (__VLS_ctx.FileClock),
}));
const __VLS_12 = __VLS_11({
    label: "待更新财报",
    value: "18只",
    change: "较上周 -2",
    tone: "orange",
    icon: (__VLS_ctx.FileClock),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_15 = KpiCard;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    label: "本周预警",
    value: "6只",
    change: "较上周 +1",
    tone: "red",
    icon: (__VLS_ctx.AlertTriangle),
}));
const __VLS_17 = __VLS_16({
    label: "本周预警",
    value: "6只",
    change: "较上周 +1",
    tone: "red",
    icon: (__VLS_ctx.AlertTriangle),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const __VLS_20 = KpiCard;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "新增热点",
    value: "12只",
    change: "较上周 +4",
    tone: "purple",
    icon: (__VLS_ctx.Activity),
}));
const __VLS_22 = __VLS_21({
    label: "新增热点",
    value: "12只",
    change: "较上周 +4",
    tone: "purple",
    icon: (__VLS_ctx.Activity),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_25 = KpiCard;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    label: "已完成分析",
    value: "86只",
    change: "较上周 +8",
    tone: "green",
    icon: (__VLS_ctx.CheckCircle2),
}));
const __VLS_27 = __VLS_26({
    label: "已完成分析",
    value: "86只",
    change: "较上周 +8",
    tone: "green",
    icon: (__VLS_ctx.CheckCircle2),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
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
let __VLS_30;
/** @ts-ignore @type {typeof ___VLS_components.Plus} */
Plus;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ class: "spacer" },
    size: (16),
}));
const __VLS_32 = __VLS_31({
    ...{ class: "spacer" },
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-panel" },
});
/** @type {__VLS_StyleScopedClasses['list-panel']} */ ;
for (const [g] of __VLS_getVForSourceType((__VLS_ctx.groups))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (g.id),
        ...{ class: "list-item" },
        ...{ class: ({ active: __VLS_ctx.activeGroup === g.id }) },
    });
    /** @type {__VLS_StyleScopedClasses['list-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    let __VLS_35;
    /** @ts-ignore @type {typeof ___VLS_components.Star} */
    Star;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        size: (16),
    }));
    const __VLS_37 = __VLS_36({
        size: (16),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (g.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (g.stock_count);
    // @ts-ignore
    [Star, FileClock, AlertTriangle, Activity, CheckCircle2, groups, activeGroup,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
let __VLS_40;
/** @ts-ignore @type {typeof ___VLS_components.Star} */
Star;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    size: (16),
}));
const __VLS_42 = __VLS_41({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
let __VLS_45;
/** @ts-ignore @type {typeof ___VLS_components.Star} */
Star;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    size: (16),
}));
const __VLS_47 = __VLS_46({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "list-item" },
});
/** @type {__VLS_StyleScopedClasses['list-item']} */ ;
let __VLS_50;
/** @ts-ignore @type {typeof ___VLS_components.AlertTriangle} */
AlertTriangle;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    size: (16),
}));
const __VLS_52 = __VLS_51({
    size: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
let __VLS_55;
/** @ts-ignore @type {typeof ___VLS_components.Settings} */
Settings;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    size: (15),
}));
const __VLS_57 = __VLS_56({
    size: (15),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "panel" },
});
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "panel-title" },
});
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
(__VLS_ctx.stocks.length);
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "spacer muted" },
});
/** @type {__VLS_StyleScopedClasses['spacer']} */ ;
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
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
for (const [row] of __VLS_getVForSourceType((__VLS_ctx.stocks))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selected = row;
                // @ts-ignore
                [stocks, stocks, selected,];
            } },
        key: (row.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    (row.stock.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (row.stock.ts_code);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (row.stock.price);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({
        ...{ class: (row.stock.pct_chg > 0 ? 'positive' : 'negative') },
    });
    (row.stock.pct_chg > 0 ? '+' : '');
    (row.stock.pct_chg);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (row.stock.pe_ttm);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (row.stock.pb);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (row.stock.total_mv.toLocaleString());
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    (row.stock.latest_report_period);
    __VLS_asFunctionalElement(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
    const __VLS_60 = StatusBadge;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        text: (row.stock.status),
        tone: (row.stock.status === '需复核' ? 'warning' : 'success'),
    }));
    const __VLS_62 = __VLS_61({
        text: (row.stock.status),
        tone: (row.stock.status === '需复核' ? 'warning' : 'success'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    // @ts-ignore
    [];
}
if (__VLS_ctx.selectedStock) {
    __VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "panel" },
    });
    /** @type {__VLS_StyleScopedClasses['panel']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-title" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.selectedStock.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "muted" },
    });
    /** @type {__VLS_StyleScopedClasses['muted']} */ ;
    (__VLS_ctx.selectedStock.ts_code);
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
        ...{ class: (__VLS_ctx.selectedStock.pct_chg > 0 ? 'positive' : 'negative') },
    });
    (__VLS_ctx.selectedStock.price);
    (__VLS_ctx.selectedStock.pct_chg);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "panel-body" },
    });
    /** @type {__VLS_StyleScopedClasses['panel-body']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "tabs" },
    });
    /** @type {__VLS_StyleScopedClasses['tabs']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ class: "active" },
    });
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.hr)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.ol, __VLS_intrinsics.ol)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
        ...{ class: "positive" },
    });
    /** @type {__VLS_StyleScopedClasses['positive']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
        ...{ class: "positive" },
    });
    /** @type {__VLS_StyleScopedClasses['positive']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.b, __VLS_intrinsics.b)({
        ...{ class: "negative" },
    });
    /** @type {__VLS_StyleScopedClasses['negative']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.hr)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
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
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "timeline" },
});
/** @type {__VLS_StyleScopedClasses['timeline']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
// @ts-ignore
[selectedStock, selectedStock, selectedStock, selectedStock, selectedStock, selectedStock,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
