# 🕊️ PeaceNet Backend

API REST da rede social pela paz mundial — conectando governos, ONGs, ativistas e cidadãos em torno de um único objetivo: **paz mundial e fim dos conflitos armados**.

## 🚀 Tecnologias

- Node.js + TypeScript
- Express
- PostgreSQL 18
- JWT (autenticação)
- bcryptjs (criptografia de senha)
- Nodemon (hot reload)

## 📁 Arquitetura

```
src/
├── config/         # Banco de dados e migrations
├── entities/       # Interfaces TypeScript
├── repositories/   # Acesso ao banco de dados
├── services/       # Regras de negócio
├── controllers/    # Handlers das requisições
├── middlewares/    # Autenticação JWT
└── routes/         # Definição das rotas
```

## ⚙️ Como rodar

```bash
# Clone o repositório
git clone https://github.com/EDNARDOPPEIXOTO99/peacenet.git

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env
# edite o .env com suas credenciais

# Rode o servidor
npm run dev
```

## 📡 Rotas disponíveis

### 👤 Usuários
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | / | Status da API | ❌ |
| POST | /api/users/register | Cadastro de usuário | ❌ |
| POST | /api/users/login | Login + JWT | ❌ |
| GET | /api/users/profile/:id | Perfil do usuário | ✅ |
| GET | /api/users | Listar usuários | ✅ |

### 📝 Posts
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /api/posts/feed | Feed de publicações | ❌ |
| GET | /api/posts/:id | Post por ID | ❌ |
| GET | /api/posts/user/:user_id | Posts do usuário | ❌ |
| POST | /api/posts | Criar post | ✅ |
| DELETE | /api/posts/:id | Deletar post | ✅ |

### ❤️ Likes
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/likes/:post_id | Curtir/descurtir post | ✅ |

### 💬 Comentários
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/comments/:post_id | Adicionar comentário | ✅ |
| GET | /api/comments/:post_id | Listar comentários | ❌ |
| DELETE | /api/comments/:id | Deletar comentário | ✅ |

### 👥 Follows
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/follows/:user_id | Seguir/deixar de seguir | ✅ |
| GET | /api/follows/:user_id/followers | Listar seguidores | ❌ |
| GET | /api/follows/:user_id/following | Listar quem segue | ❌ |

> ❌ Rota pública — qualquer um acessa (sem token)
> 
> ✅ Rota protegida — requer `Authorization: Bearer token` no header

OBS.: 

❌ Não precisa de token — rotas públicas, qualquer um acessa (register, login, status)

✅ Precisa de token — rotas protegidas, só acessa quem está logado (perfil, listar usuários)

## 🌍 Módulos da PeaceNet

- **PAZ** — conflitos, disputas, acordos, governos, ONU
- **SOLIDARIEDADE** — vaquinhas, doações, campanhas humanitárias
- **RELAÇÕES_HUMANAS** — raças, gêneros, culturas, conexões

## 🎯 Entidades do Banco

- **users** — perfis com role (CITIZEN, GOV, NGO, ORG)
- **posts** — publicações com módulo e tag de conflito
- **likes** — curtidas nos posts
- **comments** — comentários nos posts
- **follows** — relacionamento entre usuários

## 🏆 Hackathon

Projeto desenvolvido para o **Hackathon Fullstack — Trilha PU12**
TIC-Hub | Programa Residência em TIC 12 | UECE + IFCE + Softex + MCTI

---

Desenvolvido por **Ednardo Peixoto** 🕊️