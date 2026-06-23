import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUiStore=defineStore('ui',()=>{const sidebarCollapsed=ref(false);const globalKeyword=ref('');return{sidebarCollapsed,globalKeyword}})

