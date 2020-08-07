# Shadow accounting (spa/pwa)

Дипломная работа студента группы ИС-17  
Ивановского И.П.

https://vk.com/domovikx  
https://github.com/Domovikx  
domovikx@gmail.com

- Развернутое приложение  
  https://vuecrm200711.web.app/

- Репозитории разработки  
  https://github.com/BulbaGroup/vue_crm  
  https://github.com/Domovikx/vue_crm

## документации

https://ru.vuejs.org/ - vue-фреймворк
https://vuex.vuejs.org/ru/guide/ - хранилище Vuex
https://firebase.google.com/ - база данных
https://vuetifyjs.com/ru/ - Material Design Component Framework
https://www.npmjs.com/package/vue-moment - vue-moment работа с датами, библиотека
https://www.chartjs.org/samples/latest/ - библиотека для работы с графиками

## полезные ресурсы:

- база данных:

https://vuecrm200711.firebaseio.com/
https://firebase.google.com/docs/web/setup?hl=ru  
https://firebase.google.com/docs/cli#deployment

- курсы валют:

https://belarusbank.by/ru/33139/forDevelopers/api/kursinfo

## git памятки

- Git настройки пользователя:

git config --global user.name "domovikx"  
git config --global user.email "domovikx@gmail.com"

git config user.name (проверить имя)  
git config user.email

- памятки команд:

git checkout -b name_branch (**создать и перейти** на ветку)  
git checkout name_branch (**перейти** на ветку)  
git merge --squash name_branch (**сквош** ветки)  
git branch (посмотреть **спилок веток**)

- stash:

git stash save "name_stash"  
git stash list  
git stash apply stash@{n}

- частые команды

git add .  
git commit -m "name_commit"  
feature / bugfix / techdebt / unittests  
git push | pull upstream | origin name_branch

git pull **upstream** master (подтянуть с upstream/master)
git push **origin** anyBranch (запушить в origin/anyBranch)

- откатить и перезаписать:

git reset --soft HEAD^  
git reset --soft HEAD~1  
git commit -m "name_commit"

git push -f origin name_branch
git push --force-with-lease **origin** name_branch

- Настройка удаленных репозиториев

git remote -v (список удаленных репозиториев)  
origin ssh://any.git (fetch)  
origin ssh://any.git (push)  
upstream ssh://any.git (fetch)  
upstream ssh://any.git (push)

git remote set-url **origin** ssh://any.git  
git remote add **upstream** ssh://any.git  
git remote remove **origin**  
git remote rename **origin upstream**

git remote set-url **origin** https://github.com/Domovikx/vue_crm.git
git remote add **upstream** https://github.com/ChupilinGroup/vue_crm.git
