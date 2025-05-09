<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef } from 'vue'
import { accountTypes, useAccountStore, type Account, type AccountType } from '../model'
import { validationRules } from '@/shared'

const { account } = defineProps<{ account: Account }>()
const accountStore = useAccountStore()
const form = useTemplateRef('form')
const valid = ref(true)
const showPassword = ref(false)
const fields = reactive<{
  tags: string
  type: AccountType
  login: string
  password: string | null
}>({
  tags: '',
  type: accountTypes[0],
  login: '',
  password: null,
})

onMounted(() => {
  setInitialValues()
})

function setInitialValues() {
  fields.tags = account.tags.map((tag) => tag.text).join('; ')
  fields.type = account.type
  fields.login = account.login
  fields.password = account.password
}

function saveAccount() {
  if (!form.value?.validate()) return

  const accountEdit = {
    id: account.id,
    tags: fields.tags.split(';').map((tagText) => {
      return { text: tagText }
    }),
    type: fields.type,
    login: fields.login,
    password: fields.password || null,
  }

  accountStore.editAccount(accountEdit)
  accountStore.saveAccounts()
}

function deleteAccount() {
  accountStore.deleteAccount(account.id)
  accountStore.saveAccounts()
}
</script>

<template>
  <v-form ref="form" v-model="valid" class="account-record">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            class="tag-field"
            v-model="fields.tags"
            label="Тэги"
            maxlength="50"
            @blur="saveAccount"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-select
            class="type-select"
            v-model="fields.type"
            label="Тип записи"
            :items="accountTypes"
            @update:model-value="saveAccount"
          ></v-select>
        </v-col>

        <v-col>
          <v-text-field
            class="login-field"
            v-model="fields.login"
            label="Логин"
            maxlength="100"
            :rules="[validationRules.required()]"
            @blur="saveAccount"
          ></v-text-field>
        </v-col>

        <v-col v-if="fields.type === 'Локальная'">
          <v-text-field
            class="password-field"
            v-model="fields.password"
            label="Пароль"
            maxlength="100"
            :rules="[validationRules.required()]"
            @blur="saveAccount"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-btn
            class="delete-button"
            icon="mdi-trash-can"
            size="large"
            @click="deleteAccount"
          ></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
