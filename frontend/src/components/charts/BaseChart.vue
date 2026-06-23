<script setup lang="ts">
import * as echarts from 'echarts'
import {onBeforeUnmount,onMounted,ref,watch} from 'vue'
const props=defineProps<{option:any;height?:number}>();const el=ref<HTMLElement|null>(null);let chart:echarts.ECharts|null=null;let observer:ResizeObserver|null=null
onMounted(()=>{if(!el.value)return;chart=echarts.init(el.value);chart.setOption(props.option);observer=new ResizeObserver(()=>chart?.resize());observer.observe(el.value)})
watch(()=>props.option,o=>chart?.setOption(o,true),{deep:true});onBeforeUnmount(()=>{observer?.disconnect();chart?.dispose()})
</script>
<template><div ref="el" class="base-chart" :style="{height:`${height||250}px`}"></div></template>

