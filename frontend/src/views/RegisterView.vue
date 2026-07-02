<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 to-red-800 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-blue-900">🕊️ PeaceNet</h1>
        <p class="text-gray-500 mt-2">Junte-se à rede da paz mundial</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
          <input v-model="name" type="text" placeholder="Seu nome"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input v-model="username" type="text" placeholder="@username"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" placeholder="seu@email.com"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">País</label>
          <input v-model="country" type="text" placeholder="Brasil"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de perfil</label>
          <select v-model="role"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="CITIZEN">🌍 Cidadão</option>
            <option value="GOV">🏛️ Governo</option>
            <option value="NGO">🤝 ONG</option>
            <option value="ORG">🌐 Organização Internacional</option>
          </select>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input v-model="password" type="password" placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>

        <button type="submit"
          class="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">
          {{ loading ? 'Cadastrando...' : 'Criar conta' }}
        </button>
      </form>

      <p class="text-center text-gray-500 mt-6">
        Já tem conta?
        <router-link to="/" class="text-blue-600 font-semibold hover:underline">Entrar</router-link>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'

const router = useRouter()
const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const country = ref('')
const role = ref('CITIZEN')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  try {
    await api.post('/users/register', {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      country: country.value,
      role: role.value
    })
    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Erro ao cadastrar!'
  } finally {
    loading.value = false
  }
}
</script>
