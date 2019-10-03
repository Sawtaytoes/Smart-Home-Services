# Running Flic Daemon

## Development
```shell
sudo ~/projects/fliclib-linux-hci/bin/armv6l/flicd -f flic-db.sqlite3 -w -s 0.0.0.0
```

## Production
```shell
sudo ~/projects/fliclib-linux-hci/bin/armv6l/flicd -f flic-db.sqlite3 -w -d
```


# Raspberry Pi Config
```shell
sudo raspi-config
```

## Raise Volume of Raspberry Pi
```shell
alsamixer
```

# Install Dependencies
```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update
sudo apt install -y htop curl git software-properties-common
sudo apt install -y --no-install-recommends yarn

git clone https://github.com/creationix/nvm.git ~/.nvm
sudo echo "source ~/.nvm/nvm.sh" >> ~/.bashrc && sudo echo "source ~/.nvm/nvm.sh" >> ~/.profile
bash

nvm install stable
npm i -g pm2@latest
pm2 completion install

pm2 startup
pm2 save

sudo apt -y dist-upgrade
sudo apt-get -y autoremove


mkdir scripts

nano scripts/scan-new-clients.sh
```

```shell
#!/bin/bash
node ~/projects/fliclib-linux-hci/clientlib/nodejs/newscanwizard.js

nano scripts/start-flic-daemon.sh
```

```shell
#!/bin/bash
sudo ~/projects/fliclib-linux-hci/bin/armv6l/flicd -f ~/flic-db.sqlite3 -w -s 0.0.0.0 -d
```

```shell
crontab -e
@reboot /home/pi/scripts/start-flic-daemon.sh
```

## Install Audio Player
If you want to allow audible beeps denoting when buttons are pressed, install `omxplayer`.

```shell
apt-get install omxplayer
```


# [Wi-Fi Setup](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
Can instead use `sudo raspi-config` > Network Options > Wi-Fi

```shell
sudo su -
wpa_passphrase "ssid" "password" >> /etc/wpa_supplicant/wpa_supplicant.conf
wpa_cli reconfigure
```
