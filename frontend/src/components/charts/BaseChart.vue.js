/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
const props = defineProps();
const el = ref(null);
let chart = null;
let observer = null;
onMounted(() => { if (!el.value)
    return; chart = echarts.init(el.value); chart.setOption(props.option); observer = new ResizeObserver(() => chart?.resize()); observer.observe(el.value); });
watch(() => props.option, o => chart?.setOption(o, true), { deep: true });
onBeforeUnmount(() => { observer?.disconnect(); chart?.dispose(); });
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "el",
    ...{ class: "base-chart" },
    ...{ style: ({ height: `${__VLS_ctx.height || 250}px` }) },
});
/** @type {__VLS_StyleScopedClasses['base-chart']} */ ;
// @ts-ignore
[height,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
