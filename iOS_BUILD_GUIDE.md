# iOS Build Guide - Finance Manager App

## Pré-requisitos

1. **Conta Expo/EAS** - Crie em https://expo.dev se não tiver
2. **Conta Apple Developer** - Necessária para publicar na App Store
3. **EAS CLI instalado** - Já está instalado no projeto

## Passo 1: Fazer Login no EAS

```bash
cd /home/ubuntu/finance-app
eas login
```

Você será solicitado a inserir suas credenciais do Expo.

## Passo 2: Configurar Credenciais do iOS

Para gerar um build para iOS, você precisa fornecer credenciais da Apple:

```bash
eas credentials
```

Siga as instruções para:
- Selecionar plataforma: **iOS**
- Selecionar perfil: **preview** ou **production**
- Fornecer Apple Team ID (encontre em https://developer.apple.com/account)

## Passo 3: Gerar Build para iOS

### Opção A: Build na nuvem (Recomendado)

```bash
eas build --platform ios --profile preview
```

Isso gerará um build que pode ser testado no TestFlight.

### Opção B: Build local (Requer Xcode)

```bash
eas build --platform ios --profile preview --local
```

## Passo 4: Monitorar o Build

Após executar o comando, você pode acompanhar o progresso em https://expo.dev/builds

## Passo 5: Testar no TestFlight

1. Quando o build estiver pronto, você receberá um link
2. Faça upload para TestFlight via App Store Connect
3. Convide testadores para testar o app

## Passo 6: Publicar na App Store

Quando estiver pronto para publicar:

```bash
eas submit --platform ios --profile production
```

Isso enviará o app para revisão na App Store.

## Configuração de Perfis

O projeto está configurado com 3 perfis em `eas.json`:

- **development**: Para desenvolvimento local
- **preview**: Para testes (TestFlight)
- **production**: Para publicação na App Store

## Troubleshooting

### Erro: "Apple Team ID not found"
- Verifique seu Apple Team ID em https://developer.apple.com/account
- Execute `eas credentials` novamente

### Erro: "Provisioning profile not found"
- Certifique-se de que tem uma conta Apple Developer ativa
- Verifique se o Bundle ID está correto em `app.config.ts`

### Erro: "Certificate not found"
- Execute `eas credentials` para regenerar certificados

## Informações do App

- **Nome**: Finance Manager
- **Bundle ID**: space.manus.finance.app.t20260331114603
- **Versão**: 1.0.0
- **Suporte**: iOS 13.0+

## Próximos Passos

1. ✅ Fazer login no EAS
2. ✅ Configurar credenciais do iOS
3. ✅ Gerar build para iOS
4. ✅ Testar no TestFlight
5. ✅ Publicar na App Store
