import { ref, watch, onMounted } from 'vue'
import { fetchCurrencies, fetchConversion } from '../api/currencyApi'
import { formatCurrency } from '../helpers/format'

const currencies = ref([])
const fromCurrency = ref('')
const toCurrency = ref('')
const amount = ref(1)
const result = ref('')
const error = ref('')
let initialized = false

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

const loadConversion = async () => {
  error.value = ''
  try {
    const value = await fetchConversion(fromCurrency.value, toCurrency.value, amount.value)
    result.value = formatCurrency(value)
  } catch (e) {
    result.value = ''
    error.value = 'Conversion failed'
  }
}

export function useCurrencyConverter() {
  onMounted(loadCurrencies)
  watch([fromCurrency, toCurrency, amount], () => {
    if (fromCurrency.value && toCurrency.value && amount.value) loadConversion()
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