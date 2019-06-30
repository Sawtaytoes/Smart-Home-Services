#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

numberOfServers=$1

if [[ ! $numberOfServers ]]; then
	numberOfServers=0
fi

pm2 start packages/flic/app.js -i $numberOfServers --name flic
pm2 start packages/lifx/app.js -i $numberOfServers --name lifx
pm2 start packages/wemo/app.js -i $numberOfServers --name wemo
