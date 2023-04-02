<template>
  <el-config-provider :z-index="3000" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref } from 'vue'

const locale = ref(zhCn)
</script>
