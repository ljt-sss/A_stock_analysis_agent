import { defineStore } from 'pinia';
import { ref } from 'vue';
import { stockApi } from '../api/stocks';
export const useStockStore = defineStore('stock', () => { const selectedCode = ref('600519.SH'); const dashboard = ref(null); const loading = ref(false); async function load(code = selectedCode.value) { selectedCode.value = code; loading.value = true; try {
    dashboard.value = await stockApi.dashboard(code);
}
finally {
    loading.value = false;
} } return { selectedCode, dashboard, loading, load }; });
