import axios from 'axios'

const API_KEY = 'PLjHbz6wjh7NN0E3ThHIRF0jMWoR7Cok'

export async function fetchCurrencies() {
  const { data } = await axios.get('https://api.currencybeacon.com/v1/currencies', {
    params: { api_key: API_KEY },
  })
  if (Array.isArray(data.response)) {
    return data.response.map((item) => ({
      code: item.short_code,
      name: item.name,
    }))
  }
  throw new Error('Invalid currency data format')
}

export async function fetchConversion(from, to, amount) {
  const { data } = await axios.get('https://api.currencybeacon.com/v1/convert', {
    params: {
      api_key: API_KEY,
      from,
      to,
      amount,
    },
  })
  if (data && data.value !== undefined && data.success !== false) {
    return data.value
  }
  throw new Error(data.error?.message || 'Conversion failed')
}