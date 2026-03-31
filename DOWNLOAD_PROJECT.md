# 📥 Como Baixar o Projeto no Seu Computador

## 🎯 Passo 1: Acessar o Painel Manus

1. Abra o navegador
2. Acesse: https://manus.im (ou o link que você recebeu)
3. Faça login com sua conta

---

## 🎯 Passo 2: Encontrar o Projeto Finance Manager

1. No painel, procure por **"finance-app"** ou **"Finance Manager"**
2. Clique no projeto

---

## 🎯 Passo 3: Baixar os Arquivos

**Opção A: Baixar como ZIP (Mais Fácil)**

1. No painel do projeto, clique em **"⋯"** (três pontos)
2. Selecione **"Download as ZIP"**
3. Espere o download terminar
4. Extraia o arquivo ZIP em uma pasta

**Opção B: Usar Git (Se Souber)**

```bash
git clone <URL-do-repositorio>
cd finance-app
```

---

## 📁 Onde Salvar?

Recomendo salvar em uma destas pastas:

- **Desktop** (Área de Trabalho)
- **Downloads**
- **Documentos**
- **Qualquer pasta que você queira**

**Exemplo:**
```
C:\Users\alexa\Desktop\finance-app
```

---

## ✅ Depois de Baixar

1. Abra a pasta `finance-app`
2. Você deve ver arquivos como:
   - `app.config.ts`
   - `package.json`
   - `app/`
   - `components/`
   - etc.

3. Abra CMD nessa pasta:
   - Clique na barra de endereço
   - Digite `cmd`
   - Pressione Enter

4. Execute:
   ```cmd
   npm install
   ```

5. Depois:
   ```cmd
   set EXPO_TOKEN=owwqVWLEYJh2coywbWMEHKA0GW8IegkKyd82-ub9 && npx eas credentials --platform ios
   ```

---

## 🎓 Resumo

1. ✅ Acesse o painel Manus
2. ✅ Encontre o projeto finance-app
3. ✅ Baixe como ZIP
4. ✅ Extraia em uma pasta
5. ✅ Abra CMD na pasta
6. ✅ Execute `npm install`
7. ✅ Execute o comando de credenciais

---

**Quando tiver baixado, me avisa! Aí continuamos com o build! 🚀**
