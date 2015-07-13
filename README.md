Demo: [https://bevis-ui.github.io/bevis-blog/](https://bevis-ui.github.io/bevis-blog/)

## Быстрое знакомство
```
git clone git@github.com:bevis-ui/bevis-blog.git your-project
cd your-project
make
```
Команда `make` выкачает все необходимые инструменты, соберет все страницы блога, сгенерит статические файлы и запустит локальный сервер.

В-общем, она сделает всё, вам только открыть в браузере `http://localhost:8080/` :)

## Как выложить на бесплатный хостинг
Заведите пустой репозиторий `http://github.com/username/projectname`. Не инициализируйте его.

Вернитесь в терминал в папку с клонированным бивис-блогом и иницилизируйте новый репозиторий так:

```
git remote rename origin upstream
git remote add origin git@github.com:username/projectname.git
git push -u origin master
```

Теперь можно заплоить блог в новый репозиторий
```
make deploy
```

В результате вы сможете увидеть свой блог по адресу `http://username.github.io/projectname`

Почитать подробнее о [GitHub Pages](http://pages.github.com/)

## Как сделать ещё один блок?

Запустить команду и ответить на вопрос:
```shell
make block
# Введите имя блока: <ИМЯ БЛОКА>
```
После на файловой системе станет доступна директория с файлами блока `/pages/<ИМЯ БЛОКА>`.


###  Чего ещё нет?

- нет легкой настройки конфигурации (shortname для disqus и т.п.)
- нет RSS
- ...

Мы допишем Readme чуть позже ;)
