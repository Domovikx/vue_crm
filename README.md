# vue_crm

## Памятки

Установка зависимостей:  
`src\frontend_vue npm install`  
`npm install`

Установка сервера
`npm install express serve-static --save`

Запуск:
`npm run c` или `npm run client`

## Ресурсы:

`BD : https://vuecrm200711.firebaseio.com/`

### курсы валют:

`https://fixer.io/quickstart`
`https://belarusbank.by/ru/33139/forDevelopers/api/kursinfo`

### git памятки

Git настройки пользователя:
git config --global user.name "domovikx"
git config --global user.email "domovikx@gmail.com"

памятки команд:
git stash save "name_stash"
git stash list
git stash apply stash@{n}

git merge --squash name_branch

git checkout -b name_branch

git remote -v
git add .
git commit -m "name_commit"
feature / bugfix / techdebt / unittests
git push|pull upstream|origin name_branch

откатить и перезаписать:
git reset --soft HEAD^
git reset --soft HEAD~1
git commit -m "name_commit"
git push --force-with-lease origin name_branch
git push -f origin name_branch

git remote -v (настройка)
origin ssh://any.git (fetch)
origin ssh://any.git (push)
upstream ssh://any.git (fetch)
upstream ssh://any.git (push)
git remote set-url origin ssh://any.git
git remote add upstream ssh://any.git
git remote remove origin
git remote rename

git remote set-url origin https://github.com/Domovikx/vue_crm.git
git remote add upstream https://github.com/ChupilinGroup/vue_crm.git
