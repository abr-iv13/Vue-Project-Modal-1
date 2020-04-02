# Usage manual

## Генерация для разработки

##### 1. Установить зависимости:

```shell
yarn install
```

##### 2. Скопировать env-файл:

```shell
cp .env.sample .env.development.local
```

##### 3. Запустить dev-сервер:

```shell
yarn serve
```

##### 4. Чтобы подключить дебаг-режим, воспользуйтесь следующими флагами в localStorage:

```javascript
localStorage['AMODEV_DEBUG'] = true // debug на аккаунт
localStorage['dabed3ad-375f-11ea-85e5-d00dbbf1b441'] = true // debug на продукт
```

### В результате в консоли браузера должно появиться сообщение об использование Vue в development-версии, а так же подключение hotreload функционала. В сайдбаре(меню) слева должна появиться иконка модуля Риелтор.
