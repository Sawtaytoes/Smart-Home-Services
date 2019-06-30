#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH
export NODE_ENV=production

git reset --hard HEAD
git pull
yarn
chown -R www-data:www-data .
pm2 gracefulReload ${PWD##*/}
