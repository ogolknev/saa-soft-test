import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { Account } from './account'

const LOCAL_STORAGE_ACCOUNTS_KEY = 'account'

export const useAccountStore = defineStore('account', () => {
  const accountsMap = reactive<Map<AccountId, AccountData>>(new Map())

  const accounts = computed(() => {
    const result: Account[] = []
    for (const [id, accountData] of accountsMap.entries()) {
      result.push({ id, ...accountData })
    }
    return result
  })
  const lastId = computed(() => Math.max(...accountsMap.keys(), 0))

  function createAccount(accountData: AccountData) {
    accountsMap.set(lastId.value + 1, accountData)
  }

  function editAccount(account: Account) {
    accountsMap.set(account.id, account)
  }

  function deleteAccount(id: AccountId) {
    accountsMap.delete(id)
  }

  function isAccountValid(account: Account) {
    if (account.id < 0) return false
    if (!account.type) return false
    if (!account.login) return false
    if (account.password !== null && !account.password) return false
    return true
  }

  function saveAccounts() {
    const validAccounts = accounts.value.filter(isAccountValid)
    const serializedAccounts = JSON.stringify(validAccounts)
    localStorage.setItem(LOCAL_STORAGE_ACCOUNTS_KEY, serializedAccounts)
  }

  function loadAccounts() {
    const serializedAccounts = localStorage.getItem(LOCAL_STORAGE_ACCOUNTS_KEY) ?? '[]'
    const deserializedAccounts: Account[] = JSON.parse(serializedAccounts)
    deserializedAccounts.forEach((account) => accountsMap.set(account.id, account))
  }

  return {
    accounts,
    createAccount,
    editAccount,
    deleteAccount,
    saveAccounts,
    loadAccounts,
  }
})

type AccountId = Account['id']
type AccountData = Omit<Account, 'id'>
