import { ref, watch, onMounted } from 'vue'
import { fetchCurrencies, fetchConversion } from '../api/currencyApi'
import { formatCurrency } from '../helpers/format'
import { useStore } from 'vuex'

const currencies = ref([])
const fromCurrency = ref('')
const toCurrency = ref('')
const amount = ref(1)
const result = ref('')
const error = ref('')
let initialized = false
const store = useStore()

const setFromCurrency = (val) => { fromCurrency.value = val }
const setToCurrency = (val) => { toCurrency.value = val }
const setAmount = (val) => { amount.value = val }

const loadCurrencies = async () => {
  error.value = ''
  try {
    const data = await fetchCurrencies()
    currencies.value = data
    if (!initialized) {
      fromCurrency.value = currencies.value[0]?.code || ''
      toCurrency.value = currencies.value[1]?.code || ''
      initialized = true
    }

  } catch (e) {
    error.value = 'Failed to load currencies'
  }
}

const loadConversion = async (store) => {
  error.value = ''
  try {
    const value = await fetchConversion(fromCurrency.value, toCurrency.value, amount.value)
    store.commit('setHistory' , {
    key:`${fromCurrency.value}-${toCurrency.value}`,
      value
    }

    )

    result.value = formatCurrency(value)



  } catch (e) {
    console.log('e' , e)
    result.value = ''
    error.value = 'Conversion failed'
  }
}

export function useCurrencyConverter(store) {
  onMounted(loadCurrencies)
  watch([fromCurrency, toCurrency, amount], () => {
    if (fromCurrency.value && toCurrency.value && amount.value) loadConversion(store)
  })
  return {
    currencies,
    fromCurrency,
    toCurrency,
    amount,
    result,
    error,
    setFromCurrency,
    setToCurrency,
    setAmount
  }
}