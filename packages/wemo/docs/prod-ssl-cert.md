# Create SSL Cert
Make sure to run this command to upgrade pip before starting:

```shell
pip install --upgrade pip
```

Optionally, you can upgrade Let's Encrypt:

```shell
cd /usr/share/letsencrypt/
git pull
```

_Replace `SERVER_NAME` with the website address._

```shell
service nginx stop

/usr/share/letsencrypt/letsencrypt-auto certonly \
-a standalone \
-d www.SERVER_NAME \
-d SERVER_NAME \
--server https://acme-v01.api.letsencrypt.org/directory

service nginx start
```

Or try this experimental approach:

```shell
/usr/share/letsencrypt/letsencrypt-auto certonly \
-a nginx \
-d www.SERVER_NAME \
-d SERVER_NAME \
--server https://acme-v01.api.letsencrypt.org/directory
```

When running the Let's Encrypt with, it requires installing the NGINX plugin:

```shell
cd /usr/share/letsencrypt/
~/.local/share/letsencrypt/bin/pip install -U letsencrypt-nginx
```

Let's Encrypt allows renewing using:

```shell
/usr/share/letsencrypt/letsencrypt-auto renew
```

- Files are located in `conf/`
