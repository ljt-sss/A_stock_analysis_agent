<script setup lang="ts">defineProps<{label:string;value:string|number;change?:string;tone?:'blue'|'green'|'orange'|'red'|'purple';icon?:any}>()</script>
<template><article class="kpi-card"><div class="kpi-icon" :class="tone||'blue'"><component :is="icon" :size="20"/></div><div><span>{{label}}</span><strong>{{value}}</strong><small v-if="change">{{change}}</small></div></article></template>

