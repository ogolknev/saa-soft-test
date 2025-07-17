<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { type Account, type AccountCreate } from '../model/interface'
import { accountSchema } from '../model/schema'
import { accountTypes } from '../config/account-types'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{ submit: [event: { data: Account }]; delete: [] }>()

const form = useTemplateRef('form')
const state = ref<AccountCreate>({
  tags: '',
  type: 'Локальная',
  login: '',
  password: '',
})

function onSubmit(event: FormSubmitEvent<Account>) {
  console.dir(event)

  const data = event.data

  state.value = {
    ...data,
    tags: data.tags.join('; '),
  }

  emit('submit', { data })
}

function onDelete() {
  emit('delete')
}
</script>

<template>
  <UForm ref="form" :schema="accountSchema" :state class="flex gap-2" @submit="onSubmit">
    <UFormField name="tags">
      <UInput v-model="state.tags" placeholder="Метки" @blur="form?.submit" />
    </UFormField>

    <UFormField name="type">
      <USelect
        class="min-w-50"
        v-model="state.type"
        :items="accountTypes.slice()"
        @change="form?.submit"
      />
    </UFormField>

    <UFormField name="login">
      <UInput v-model="state.login" placeholder="Логин" @blur="form?.submit" />
    </UFormField>

    <UFormField v-if="state.type === 'Локальная'" name="password">
      <UInput v-model="state.password" placeholder="Пароль" type="password" @blur="form?.submit" />
    </UFormField>

    <UButton icon="lucide:trash" color="error" variant="soft" @click="onDelete" />
  </UForm>
</template>
