#!/bin/sh

echo ""
printf "Введите имя страницы: "
read PageName


if [ -d pages/$PageName-page  ]; then
    echo "Операция прервана: Директория с таким именем существует по адресу pages/$PageName-page"
    exit
fi

mkdir -p pages/$PageName-page
echo "- layout-for-page" > pages/$PageName-page/$PageName-page.deps.yaml
echo "module.exports = function (pages) {
    pages.declare('${PageName}-page', function (params) {
        var options = params.options;

        return {
            block: 'page-layout',
            pageTitle: '${PageName} page',
            params: params,
            content: [
                // здесь ваши блоки
            ]
        };
    });
};" > pages/$PageName-page/$PageName-page.page.js

echo "-------------------------------------------------"
echo "Создана страница pages/$PageName-page"
echo "-------------------------------------------------"
ls -la pages/$PageName-page
