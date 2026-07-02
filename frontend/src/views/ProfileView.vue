<template>
  <div class="min-h-screen bg-gray-100">

    <!-- Navbar -->
    <nav class="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <router-link to="/feed" class="text-2xl font-bold">🕊️ PeaceNet</router-link>
      <button @click="logout" class="bg-red-700 px-4 py-2 rounded-lg hover:bg-red-600 transition">Sair</button>
    </nav>

    <div class="max-w-2xl mx-auto py-8 px-4">

      <!-- Card Perfil -->
      <div class="bg-white rounded-2xl shadow p-8 mb-6">
        <div class="flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-bold">
            {{ user?.name?.charAt(0) }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-800">{{ user?.name }}</h2>
            <p class="text-gray-500">@{{ user?.username }}</p>
            <p class="text-sm text-gray-400">{{ user?.country }} · {{ user?.role }}</p>
          </div>
          <div class="ml-auto text-center">
            <p class="text-3xl font-bold text-blue-900">{{ user?.peace_score }}</p>
            <p class="text-xs text-gray-500">PeaceScore</p>
          </div>
        </div>
      </div>

      <!-- Posts do usuário -->
      <h3 class="text-lg font-bold text-gray-700 mb-4">Minhas publicações</h3>

      <div v-if="loading" class="text-center text-gray-500 py-8">Carregando... 🌍</div>

      <div v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow p-6 mb-4">
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs px-3 py-1 rounded-full font-semibold"
            :class="{
              'bg-blue-100 text-blue-800': post.module === 'PAZ',
              'bg-green-100 text-green-800': post.module === 'SOLIDARIEDADE',
              'bg-purple-100 text-purple-800': post.module === 'RELACOES_HUMANAS'
            }">
            {{ post.module === 'PAZ' ? '🕊️ Paz' : post.module === 'SOLIDARIEDADE' ? '🤝 Solidariedade' : '🌍 Relações Humanas' }}
          </span>
          <button @click="deletePost(post.id)" class="text-red-400 hover:text-red-600 text-sm transition">
            🗑️ Deletar
          </button>
        </div>
        <p class="text-gray-800 mb-2">{{ post.content }}</p>
        <p v-if="post.conflict_tag" class="text-xs text-gray-400">#{{ post.conflict_tag }}</p>
        <div class="flex gap-4 text-sm text-gray-500 mt-3 border-t pt-3">
          <span>❤️ {{ post.likes_count }} curtidas</span>
          <span>💬 {{ post.comments_count }} comentários</span>
        </div>
      </div>

      <div v-if="!loading && posts.length === 0" class="text-center text-gray-400 py-8">
        Nenhuma publicação ainda. Compartilhe uma mensagem de paz! 🕊️
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const posts = ref<any[]>([])
const loading = ref(false)

const loadPosts = async () => {
  loading.value = true
  try {
    const response = await api.get(`/posts/user/${user.value.id}`)
    posts.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deletePost = async (id: number) => {
  if (!confirm('Deletar este post?')) return
  try {
    await api.delete(`/posts/${id}`)
    posts.value = posts.value.filter(p => p.id !== id)
  } catch (err) {
    console.error(err)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/')
}

onMounted(loadPosts)
</script>
