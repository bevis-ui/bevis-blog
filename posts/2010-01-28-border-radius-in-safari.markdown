---
author: makishvili
comments: true
date: 2010-01-28 11:50:33+00:00
layout: post
slug: border-radius-in-safari
title: Border-radius in Safari
wordpress_id: 1345
categories:
- tech
tags:
- Safari
---

В Safari столкнулся с неаккуратным рендерингом элемента, если ему задан  border-radius и  фоновый цвет. Увидеть проблему и её решение можно на [тестовой странице](http://makishvili.com/code/border-radius-in-safari.html).


### Решение

1. Фоновый цвет у блока убрать

2. Внутрь блока добавить обертку

3. Обертке задать фоновый цвет

4. Обёртке задать border-radius,  меньше на толщину бордера, чем у внешнего блока

```html
    <div class="button"><div class="button-inner">Кнопка</div></div>
```
```css
    .button
    {
        border: 5px solid #000;
    
        border-radius: 30px;
        -moz-border-radius: 30px;
        -webkit-border-radius: 30px;
        -khtml-border-radius: 30px;
    }
    
    .button-inner
    {
        border-radius: 25px;
        -moz-border-radius: 25px;
        -webkit-border-radius: 25px;
        -khtml-border-radius: 25px;
    
        background: #fff;
    }
```




### Update


![](http://makishvili.com/images/post/2010-01-28-border-radius-in-safari/bor-safari.png)

Между фоном и бордером появляются дырки, если border-radius у обоих блоков одинаковый и:

1. Внутреннему блоку задана большая высота (height)

2. Его содержимое имеет большой font-size

3. Его содержимое представлено многострочным текстовым узлом

  

Внутреннему блоку нужно задавать border-radius с меньшим значением, чем у внешнего блока, потому что при border-radius:30px внешняя сторона бордера (толщина которого равна 5px) скруглена с радиусом 30px, а внутренняя сторона скруглена с радиусом 25px, меньше на толщину бордера. 

Спасибо Александру Ермолаеву за багрепорт, а Степану Резникову за допиливание решения и объяснение про кривизну бордера. 
