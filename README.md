# Projeto WhatsApp Clone

[![Hcode Treinamentos](https://www.hcode.com.br/res/img/hcode-200x100.png)](https://www.hcode.com.br)

Projeto desenvolvido como exemplo do Curso Completo de JavaScript na Udemy.com.

### Projeto
![WhatsApp Clone](https://firebasestorage.googleapis.com/v0/b/hcode-com-br.appspot.com/o/whatsapp.jpg?alt=media&token=5fc78e3b-4871-424f-abfa-b765f2515d0c)

### Recursos Usados

Lista de recursos usados em aula para este projeto

| Recurso | Link |
| ------ | ------ |
| Webpack | https://webpack.js.org/ |
| Firebase Authentication | https://firebase.google.com/docs/auth/?authuser=0 |
| Cloud Firestore | https://firebase.google.com/docs/firestore/?authuser=0 |
| Cloud Functions | https://firebase.google.com/docs/functions/?hl=pt-br |
| Cloud Storage | https://firebase.google.com/docs/storage/?authuser=0 |
| PDF.js | https://mozilla.github.io/pdf.js/ |
| MediaDevices.getUserMedia() | https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia |


### Instalação de Dependências 

Atualização do npm:
```bash
npm install -g npm
```

Inicialização do npm:
```bash
npm init
```

Webpack 3.1.0 e Webpack Dev Server 2.5.1:
```bash
npm install webpack@3.1.0 --save
npm install webpack-dev-server@2.5.1 --save
```

### Alterando o arquivo package.json

Adicione as seguintes linhas em "script" no arquivo package.json, logo abaixo de "test":
```js
"build": "webpack --config webpack.config.js",
"start": "webpack-dev-server"
```

### Executando

Rodando no servidor
```bash
npm run start
```

Acesse: http://localhost:8080/
