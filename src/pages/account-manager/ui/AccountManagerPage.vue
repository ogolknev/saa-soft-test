<script setup lang="ts">
import { AccountForm, useAccountStore } from '@/entities/account'
import { onMounted, ref } from 'vue'

const accountStore = useAccountStore()

const creatingAccount = ref(false)

onMounted(() => {
  accountStore.loadState()
})
</script>

<template>
  <div class="space-y-2 w-8/10 max-w-200 mx-auto">
    <div class="mt-10 flex gap-2">
      <h2 class="text-2xl font-bold">Учетные записи</h2>
      <UButton icon="lucide:plus" variant="soft" label="Добавить" @click="creatingAccount = true" />
    </div>

    <UAlert
      icon="lucide:info"
      description='Чтобы указать несколько меток для одной пары логин/пароль используйте разделитель ";"'
      color="info"
      variant="subtle"
    />

    <div
      class="grid grid-cols-[repeat(4,minmax(0,1fr))_auto] [&>span]:text-neutral-500 [&>span]:text-sm"
    >
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <div class="w-8"></div>
    </div>
    <AccountForm
      v-for="account in accountStore.accounts"
      :key="account.id"
      :initial-state="account"
      @submit="(event) => accountStore.accountUpdate(event.data)"
      @delete="() => accountStore.accountDelete(account.id)"
    />
    <AccountForm
      v-if="creatingAccount"
      @delete="creatingAccount = false"
      @submit="
        (event) => {
          accountStore.accountUpdate(event.data)
          creatingAccount = false
        }
      "
    />
  </div>
</template>
