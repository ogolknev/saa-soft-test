import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Account, AccountData } from './interface'

export const useAccountStore = defineStore('account', () => {
  let lastId = 0

  const accountMap = ref(new Map<Account['id'], Account>())
  const accounts = computed(() => Array.from(accountMap.value.values()))

  function accountUpdate(data: AccountData | Account) {
    if ('id' in data) {
      accountMap.value.set(data.id, data)
    } else {
      const id = nextId()
      accountMap.value.set(id, { ...data, id })
    }
  }

  function accountDelete(id: Account['id']) {
    accountMap.value.delete(id)
  }

  function nextId() {
    return ++lastId
  }

  return {
    accounts,
    accountUpdate,
    accountDelete,
  }
})
