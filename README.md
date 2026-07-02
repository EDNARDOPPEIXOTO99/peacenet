# 🕊️ PeaceNet — Rede Social pela Paz Mundial

## 🌐 Deploy

- **Frontend:** https://peacenet.vercel.app
- **Backend:** http://localhost:3000 (local)

Plataforma fullstack que conecta governos, ONGs, ativistas e cidadãos em torno de um único objetivo: **paz mundial e fim dos conflitos armados**.

> Ideia original concebida em janeiro de 2020, antes da pandemia. Agora realidade! 🕊️

## 🌍 Sobre o Projeto

PeaceNet é uma rede social com tripé fundamental:
- **PAZ** — conflitos, disputas, acordos, governos, ONU
- **SOLIDARIEDADE** — vaquinhas, doações, campanhas humanitárias  
- **RELAÇÕES HUMANAS** — raças, gêneros, culturas, conexões

## 🚀 Tecnologias

### Backend
- Node.js + TypeScript
- Express
- PostgreSQL 18
- JWT + bcryptjs

### Frontend
- Vue.js 3 + TypeScript
- Tailwind CSS
- Axios
- Vue Router + Pinia

## 📁 Estrutura

peacenet/
├── backend/    # API REST Node.js + TypeScript
└── frontend/   # Interface Vue.js 3 + Tailwind

## ⚙️ Como rodar

### Backend
```bash
cd backend
npm install
cp .env.example .env
# configure o .env com suas credenciais PostgreSQL
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📡 Principais Rotas da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/users/register | Cadastro | ❌ |
| POST | /api/users/login | Login + JWT | ❌ |
| GET | /api/posts/feed | Feed de publicações | ❌ |
| POST | /api/posts | Criar post | ✅ |
| POST | /api/likes/:post_id | Curtir/descurtir | ✅ |
| POST | /api/comments/:post_id | Comentar | ✅ |
| POST | /api/follows/:user_id | Seguir/deixar de seguir | ✅ |

## 🎯 Funcionalidades

- ✅ Cadastro e login com autenticação JWT
- ✅ Feed de publicações em tempo real
- ✅ Posts com módulo (Paz, Solidariedade, Relações Humanas)
- ✅ Curtidas e comentários
- ✅ Sistema de seguidores
- ✅ Perfil do usuário com PeaceScore
- ✅ Roles: Cidadão, Governo, ONG, Organização Internacional

## 🏆 Hackathon

Projeto desenvolvido para o **Hackathon Fullstack — Trilha PU12**
TIC-Hub | Programa Residência em TIC 12 | UECE + IFCE + Softex + MCTI

## 🎥 Pitch

🔗 *(link do vídeo será adicionado após gravação)*

---

Desenvolvido por **Ednardo Peixoto** 🕊️  
[LinkedIn](https://www.linkedin.com/in/engcivilednardoppeixoto)

