Front Reembolso

Este é um projeto frontend desenvolvido em Vue.js 3, utilizando Vite para um ambiente de desenvolvimento rápido e eficiente.

Requisitos

Node.js (versão recomendada: 18+)

Docker (opcional, para rodar em ambiente conteinerizado)

Instalação

Clone o repositório:

git clone https://github.com/Marciohenr1que/Reembolsos-front.git
cd front-reembolso

Instale as dependências:

npm install

Executando o Projeto

Para rodar a aplicação em ambiente de desenvolvimento:

npm run dev

Acesse a aplicação em http://localhost:5173.

Construindo para Produção

npm run build

Executando com Docker

Crie a imagem do Docker:

docker build -t front-reembolso .

Execute o container:

docker run -p 5173:5173 front-reembolso

Estrutura do Projeto

/front-reembolso
├── src/ # Código-fonte principal
├── public/ # Arquivos estáticos
├── components/ # Componentes reutilizáveis
├── views/ # Páginas principais
├── store/ # Gerenciamento de estado (Pinia)
├── router/ # Configuração das rotas (Vue Router)
├── vite.config.ts # Configuração do Vite
├── package.json # Dependências do projeto

Tecnologias Utilizadas

Vue.js 3

Vite

Pinia

Vue Router

Tailwind CSS

Axios
