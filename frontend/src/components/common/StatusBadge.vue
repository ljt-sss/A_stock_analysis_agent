<script setup lang="ts">defineProps<{text:string;tone?:'success'|'warning'|'danger'|'info'}>()</script>
<template><span class="status-badge" :class="tone||'info'">{{text}}</span></template>

