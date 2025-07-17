import { defineStore } from 'pinia'
import { computed, nextTick, ref } from 'vue'
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

    nextTick(saveState)
  }

  function accountDelete(id: Account['id']) {
    accountMap.value.delete(id)

    nextTick(saveState)
  }

  function nextId() {
    return ++lastId
  }

  function saveState() {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
    localStorage.setItem('accountLastId', lastId.toString())
  }

  function loadState() {
    const loadedAccounts: Account[] = JSON.parse(localStorage.getItem('accounts') ?? '[]')
    const loadedLastId: number = parseInt(localStorage.getItem('accountLastId') ?? '0')

    for (const account of loadedAccounts) {
      accountMap.value.set(account.id, account)
    }

    lastId = loadedLastId
  }

  return {
    accounts,
    accountUpdate,
    accountDelete,
    saveState,
    loadState,
  }
})
