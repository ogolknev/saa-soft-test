<script setup lang="ts">
import { AccountRecord, useAccountStore } from '@/entities'
import { onMounted } from 'vue'

const accountStore = useAccountStore()

function addNewAccountRecord() {
  accountStore.createAccount({ type: 'Локальная', tags: [], login: '', password: null })
}

onMounted(() => {
  accountStore.loadAccounts()
})
</script>

<template>
  <v-container class="account-management-widget h-100 overflow-hidden">
    <v-row>
      <v-col cols="auto">
        <h1>Учетные записи</h1>
      </v-col>

      <v-col>
        <v-btn icon="mdi-plus" @click="addNewAccountRecord"></v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-alert icon="mdi-help-circle"
          >Для указания нескольких меток для одной записи используйте разделитель ";"</v-alert
        >
      </v-col>
    </v-row>

    <v-row class="fill-height overflow-y-auto">
      <v-col>
        <AccountRecord
          v-for="account of accountStore.accounts"
          :key="account.id"
          :account="account"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
