# Front Reembolso

Este é um projeto frontend desenvolvido em **Vue.js 3**, utilizando **Vite** para um ambiente de desenvolvimento rápido e eficiente.

## 🛠 Requisitos

- **Node.js** (versão recomendada: 18+)
- **Docker** (opcional, para rodar em ambiente conteinerizado)

## 📦 Instalação

### Clone o repositório:

```bash
git clone https://github.com/Marciohenr1que/Reembolsos-front.git
cd Reembolsos-front
```

### Instale as dependências:

```bash
npm install
```

## 🚀 Executando o Projeto

### Para rodar a aplicação em ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse a aplicação em [http://localhost:5173](http://localhost:5173).

## 🐳 Executando com Docker

### Crie a imagem do Docker:

```bash
docker compose build
```

### Execute o container:

```bash
docker compose up
```

### Acesse o container:

```bash
docker exec -it reembolsos-front-frontend-1 sh
```

## 📂 Estrutura do Projeto

```
/front-reembolso
├── src/         # Código-fonte principal
├── public/      # Arquivos estáticos
├── components/  # Componentes reutilizáveis
├── views/       # Páginas principais
├── store/       # Gerenciamento de estado (Pinia)
├── router/      # Configuração das rotas (Vue Router)
├── vite.config.ts  # Configuração do Vite
├── package.json    # Dependências do projeto
```

## 🚀 Tecnologias Utilizadas

- **Vue.js 3**
- **Vite**
- **Pinia**
- **Vue Router**
- **Tailwind CSS**
- **Axios**

## ✅ Rodando os Testes

Para rodar os testes, execute:

```bash
npx vitest
```
