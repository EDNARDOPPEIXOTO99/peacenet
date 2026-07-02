<template>
  <div class="min-h-screen bg-gray-100">

    <!-- Navbar -->
    <nav class="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 class="text-2xl font-bold">🕊️ PeaceNet</h1>
      <div class="flex items-center gap-4">
        <router-link to="/profile" class="hover:text-red-300 transition">👤 {{ user?.username }}</router-link>
        <button @click="logout" class="bg-red-700 px-4 py-2 rounded-lg hover:bg-red-600 transition">Sair</button>
      </div>
    </nav>

    <div class="max-w-2xl mx-auto py-8 px-4">

      <!-- Criar Post -->
      <div class="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 class="text-lg font-bold text-blue-900 mb-4">Nova publicação 🕊️</h2>
        <textarea
          v-model="newPost.content"
          placeholder="Compartilhe uma mensagem de paz com o mundo..."
          class="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>

        <div class="flex gap-3 mt-3">
          <select v-model="newPost.module"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="PAZ">🕊️ Paz</option>
            <option value="SOLIDARIEDADE">🤝 Solidariedade</option>
            <option value="RELACOES_HUMANAS">🌍 Relações Humanas</option>
          </select>

          <input v-model="newPost.conflict_tag" placeholder="Tag (ex: diplomacia)"
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button @click="createPost"
            class="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition font-semibold">
            {{ posting ? '...' : 'Publicar' }}
          </button>
        </div>
      </div>

      <!-- Feed -->
      <div v-if="loading" class="text-center text-gray-500 py-8">Carregando feed... 🌍</div>

      <div v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow p-6 mb-4">

        <!-- Autor -->
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
            {{ post.author_name?.charAt(0) }}
          </div>
          <div>
            <p class="font-semibold text-gray-800">{{ post.author_name }}</p>
            <p class="text-sm text-gray-500">@{{ post.author_username }} · {{ post.author_role }}</p>
          </div>
          <span class="ml-auto text-xs px-3 py-1 rounded-full font-semibold"
            :class="{
              'bg-blue-100 text-blue-800': post.module === 'PAZ',
              'bg-green-100 text-green-800': post.module === 'SOLIDARIEDADE',
              'bg-purple-100 text-purple-800': post.module === 'RELACOES_HUMANAS'
            }">
            {{ post.module === 'PAZ' ? '🕊️ Paz' : post.module === 'SOLIDARIEDADE' ? '🤝 Solidariedade' : '🌍 Relações Humanas' }}
          </span>
        </div>

        <!-- Conteudo -->
        <p class="text-gray-800 mb-3">{{ post.content }}</p>
        <p v-if="post.conflict_tag" class="text-xs text-gray-400 mb-3">#{{ post.conflict_tag }}</p>

        <!-- Acoes -->
        <div class="flex gap-6 text-sm text-gray-500 border-t pt-3">
          <button @click="toggleLike(post)" class="flex items-center gap-1 hover:text-red-500 transition">
            ❤️ {{ post.likes_count }}
          </button>
          <button @click="toggleComments(post.id)" class="flex items-center gap-1 hover:text-blue-500 transition">
            💬 {{ post.comments_count }}
          </button>
        </div>

        <!-- Comentarios -->
        <div v-if="openComments === post.id" class="mt-4 border-t pt-4">
          <div v-for="comment in comments[post.id] || []" :key="comment.id" class="mb-2">
            <span class="font-semibold text-sm">@{{ comment.author_username }}: </span>
            <span class="text-sm text-gray-700">{{ comment.content }}</span>
          </div>
          <div class="flex gap-2 mt-3">
            <input v-model="newComment" placeholder="Comentar..."
              class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="addComment(post.id)"
              class="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition">
              Enviar
            </button>
          </div>
        </div>

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
const posting = ref(false)
const openComments = ref<number | null>(null)
const comments = ref<Record<number, any[]>>({})
const newComment = ref('')

const newPost = ref({
  content: '',
  module: 'PAZ',
  conflict_tag: ''
})

const loadFeed = async () => {
  loading.value = true
  try {
    const response = await api.get('/posts/feed')
    posts.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const createPost = async () => {
  if (!newPost.value.content.trim()) return
  posting.value = true
  try {
    await api.post('/posts', newPost.value)
    newPost.value = { content: '', module: 'PAZ', conflict_tag: '' }
    await loadFeed()
  } catch (err) {
    console.error(err)
  } finally {
    posting.value = false
  }
}

const toggleLike = async (post: any) => {
  try {
    const response = await api.post(`/likes/${post.id}`)
    if (response.data.liked) {
      post.likes_count = Number(post.likes_count) + 1
    } else {
      post.likes_count = Number(post.likes_count) - 1
    }
  } catch (err) {
    console.error(err)
  }
}

const toggleComments = async (postId: number) => {
  if (openComments.value === postId) {
    openComments.value = null
    return
  }
  openComments.value = postId
  try {
    const response = await api.get(`/comments/${postId}`)
    comments.value[postId] = response.data
  } catch (err) {
    console.error(err)
  }
}

const addComment = async (postId: number) => {
  if (!newComment.value.trim()) return
  try {
    await api.post(`/comments/${postId}`, { content: newComment.value })
    newComment.value = ''
    const response = await api.get(`/comments/${postId}`)
    comments.value[postId] = response.data
  } catch (err) {
    console.error(err)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/')
}

onMounted(loadFeed)
</script>
