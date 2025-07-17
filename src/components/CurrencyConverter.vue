<script setup>
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter'

const {
  currencies,
  fromCurrency,
  toCurrency,
  amount,
  result,
  error
} = useCurrencyConverter()
</script>

<template>
  <div class="currency-center-wrapper">
    <transition name="fade-slide">
      <el-card class="currency-card" v-if="currencies.length">
        <el-form label-position="top" class="currency-form">
          <el-form-item label="From">
            <el-select v-model="fromCurrency" filterable class="currency-select">
              <el-option v-for="c in currencies" :key="c.code" :label="`${c.code} - ${c.name}`" :value="c.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="To">
            <el-select v-model="toCurrency" filterable class="currency-select">
              <el-option v-for="c in currencies" :key="c.code" :label="`${c.code} - ${c.name}`" :value="c.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="Amount">
            <el-input-number v-model="amount" :min="0.01" :step="1" class="currency-input" />
          </el-form-item>
        </el-form>
        <el-divider />
        <transition name="fade-result" mode="out-in">
          <div class="currency-result-row" v-if="result" :key="result">
            <span class="currency-result">{{ amount }} {{ fromCurrency }} = {{ result }} {{ toCurrency }}</span>
          </div>
        </transition>
        <el-alert v-if="error" :title="error" type="error" show-icon style="margin-top: 16px" />
      </el-card>
    </transition>
  </div>
</template>

<style scoped>
.currency-center-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}
.currency-card {
  min-width: 340px;
  max-width: 480px;
  width: 100%;
  padding: 32px 24px 24px 24px;
  box-sizing: border-box;
  box-shadow: 0 2px 16px 0 rgba(60,60,60,0.08);
}
.currency-form {
  width: 100%;
}
.currency-select,
.currency-input {
  width: 100%;
}
.currency-result-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 32px;
  margin-bottom: 8px;
}
.currency-result {
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
}
.fade-slide-enter-active {
  animation: fadeSlideIn 0.5s cubic-bezier(.4,0,.2,1);
}
.fade-slide-leave-active {
  animation: fadeSlideOut 0.3s cubic-bezier(.4,0,.2,1);
}
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes fadeSlideOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
}
.fade-result-enter-active, .fade-result-leave-active {
  transition: opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
}
.fade-result-enter-from, .fade-result-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-result-enter-to, .fade-result-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
