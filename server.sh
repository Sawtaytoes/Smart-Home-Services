#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd packages/flic
pm2 start app.js -i 1 --name flic
cd ../lifx
pm2 start app.js -i 1 --name lifx
cd ../wemo
pm2 start app.js -i 1 --name wemo
