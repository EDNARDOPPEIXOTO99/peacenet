# 🕊️ PeaceNet Frontend

Interface da rede social pela paz mundial — desenvolvida com Vue.js 3 + TypeScript + Tailwind CSS.

## 🚀 Tecnologias

- Vue.js 3 + TypeScript
- Tailwind CSS
- Axios (consumo da API)
- Vue Router (navegação)
- Pinia (gerenciamento de estado)
- Vite (build tool)

## 📁 Estrutura

src/
├── config/       # Configuração do Axios
├── views/        # Páginas da aplicação
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── FeedView.vue
│   └── ProfileView.vue
├── router/       # Rotas da aplicação
├── stores/       # Estado global (Pinia)
├── assets/       # Estilos globais
├── App.vue
└── main.ts

## 🖥️ Telas

- **Login** — autenticação com email e senha
- **Cadastro** — registro com nome, username, país e tipo de perfil
- **Feed** — publicações com módulos Paz, Solidariedade e Relações Humanas
- **Perfil** — dados do usuário e suas publicações

## ⚙️ Como rodar

```bash
# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

> ⚠️ O backend deve estar rodando em `http://localhost:3000`

## 🌍 Módulos da PeaceNet

- 🕊️ **PAZ** — conflitos, disputas, acordos, governos, ONU
- 🤝 **SOLIDARIEDADE** — vaquinhas, doações, campanhas humanitárias
- 🌍 **RELAÇÕES HUMANAS** — raças, gêneros, culturas, conexões

## 🏆 Hackathon

Projeto desenvolvido para o **Hackathon Fullstack — Trilha PU12**
TIC-Hub | Programa Residência em TIC 12 | UECE + IFCE + Softex + MCTI

---

Desenvolvido por **Ednardo Peixoto** 🕊️  
[LinkedIn](https://www.linkedin.com/in/engcivilednardoppeixoto)
