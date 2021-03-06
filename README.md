# Zigmund Test Exercise

SPA, которое позволяет загружать данные о репозиториях выбранной компании на гитхабе.

[Link to deploy](https://zigmund-test.vercel.app/)

## Features:
- Валидация формы по сабмиту. Поле с именем компании обязательное. Нельзя добавить копию компании.
- Загрузка данных о репозиториях компании. Используется github api. Во время загрузки крутится прелоадер и форма задизейблена.
- Рендеринг списка компаний. Если список пуст, рендеринг сообщения об этом.
- По клику на компанию - переход на страницу со списком репозиториев. Если компания не разместила репозитории на гитхабе, рендеринг сообщения об этом.
- Пагинация на странице с репозиториями. Максимальное количество страниц - 4шт. Реализованы кнопки: "Вперед", "Назад", "В конец", "В начало".
Также переход происходит по клику на номер страницы. Для каждого списка репозиториев сохраняется текущая активная страница пагинации.

## Used in project:
- TypeScript
- React
- React Bootstrap
- Redux Toolkit
- Redux Saga
- Redux Forms
- Axios
- Lodash

## Clone the project:
```
git clone https://github.com/DmitryForsilov/zigmund-test.git
```

## Install deps:
```
npm i
```

## Start:
```
npm start
```

## Examples of Companies you can use:
```
Facebook
Microsoft
Google
```
