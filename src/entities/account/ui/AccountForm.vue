<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { type AccountData, type AccountCreate, type Account } from '../model/interface'
import { accountSchema } from '../model/schema'
import { accountTypes } from '../config/account-types'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{ submit: [event: { data: AccountData | Account }]; delete: [] }>()
const props = defineProps<{ initialState?: Account }>()

const form = useTemplateRef('form')
const state = ref<AccountCreate>({
  tags: '',
  type: 'Локальная',
  login: '',
  password: '',
})

function onSubmit(event: FormSubmitEvent<AccountData>) {
  console.dir(event)

  const data = event.data

  state.value = {
    ...data,
    tags: data.tags.join('; '),
  }

  emit('submit', { data: { ...data, id: props.initialState?.id } })
}

function onDelete() {
  emit('delete')
}

onMounted(() => {
  if (props.initialState) {
    state.value = {
      ...props.initialState,
      tags: props.initialState.tags.join('; '),
    }
  }
})
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

    <UButton
      class="self-start"
      icon="lucide:trash"
      color="error"
      variant="soft"
      @click="onDelete"
    />
  </UForm>
</template>
