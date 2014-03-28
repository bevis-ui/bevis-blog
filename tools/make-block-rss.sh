#!/bin/sh

echo ""
printf "Введите имя rss-блока: "
read BlockName

if [ -d blocks-rss/$BlockName ]; then
    echo "Операция прервана: блок '$BlockName' уже существует."
    exit
fi


mkdir -p blocks-rss/$BlockName

echo "module.exports = function (bt) {

    bt.match('$BlockName', function (ctx) {
        ctx.setContent('Содержимое блока');
    });

};" > blocks-rss/$BlockName/$BlockName.bt.js

echo "-------------------------------------------------"
echo "Создан блок blocks-rss/$BlockName"
echo "-------------------------------------------------"
ls -la blocks-rss/$BlockName
