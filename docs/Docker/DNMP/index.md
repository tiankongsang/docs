# DNMP

DNMP（Docker + Nginx/Openresty + MySQL5,8 + PHP5,7,8 + Redis + ElasticSearch + MongoDB + RabbitMQ）是一款全功能的**LNMP 一键安装程序，支持 Arm CPU**。

<details>
<summary>项目地址</summary>

- [GitHub 地址](https://github.com/yeszao/dnmp)
- [Gitee 地址](https://gitee.com/yeszao/dnmp)

</details>

<details>
<summary>DNMP项目特点</summary>

1. `100%`开源
2. `100%`遵循 Docker 标准
3. 支持**多版本 PHP**共存，可任意切换（PHP5.4、PHP5.6、PHP7.1、PHP7.2、PHP7.3、PHP7.4、PHP8.0)
4. 支持绑定**任意多个域名**
5. 支持**HTTPS 和 HTTP/2**
6. **PHP 源代码、MySQL 数据、配置文件、日志文件**都可在 Host 中直接修改查看
7. 内置**完整 PHP 扩展安装**命令
8. 默认支持`pdo_mysql`、`mysqli`、`mbstring`、`gd`、`curl`、`opcache`等常用热门扩展，根据环境灵活配置
9. 可一键选配常用服务：
   - 多 PHP 版本：PHP5.4、PHP5.6、PHP7.0-7.4、PHP8.0
   - Web 服务：Nginx、Openresty
   - 数据库：MySQL5、MySQL8、Redis、memcached、MongoDB、ElasticSearch
   - 消息队列：RabbitMQ
   - 辅助工具：Kibana、Logstash、phpMyAdmin、phpRedisAdmin、AdminMongo
10. 实际项目中应用，确保`100%`可用
11. 所有镜像源于[Docker 官方仓库](https://hub.docker.com)，安全可靠
12. 一次配置，**Windows、Linux、MacOs**皆可用
13. 支持快速安装扩展命令 `install-php-extensions apcu`
14. 支持安装 certbot 获取免费 https 用的 SSL 证书

</details>

## 目录

- [DNMP](#dnmp)
  - [目录](#目录)
  - [1.目录结构](#1目录结构)
  - [2.快速使用](#2快速使用)
  - [3.PHP 和扩展](#3php-和扩展)
    - [3.1 切换 Nginx 使用的 PHP 版本](#31-切换-nginx-使用的-php-版本)
    - [3.2 安装 PHP 扩展](#32-安装-php-扩展)
    - [3.3 快速安装 php 扩展](#33-快速安装-php-扩展)
    - [3.4 Host 中使用 php 命令行（php-cli）](#34-host-中使用-php-命令行php-cli)
    - [3.5 使用 composer](#35-使用-composer)
  - [4.管理命令](#4管理命令)
    - [4.1 服务器启动和构建命令](#41-服务器启动和构建命令)
    - [4.2 添加快捷命令](#42-添加快捷命令)
    - [4.3 查看 docker 网络](#43-查看-docker-网络)
  - [5.使用 Log](#5使用-log)
    - [5.1 Nginx 日志](#51-nginx-日志)
    - [5.2 PHP-FPM 日志](#52-php-fpm-日志)
    - [5.3 MySQL 日志](#53-mysql-日志)
  - [6.数据库管理](#6数据库管理)
    - [6.1 phpMyAdmin](#61-phpmyadmin)
    - [6.2 phpRedisAdmin](#62-phpredisadmin)
  - [7.在正式环境中安全使用](#7在正式环境中安全使用)
  - [8 常见问题](#8-常见问题)
    - [8.1 如何在 PHP 代码中使用 curl？](#81-如何在-php-代码中使用-curl)
    - [8.2 Docker 使用 cron 定时任务](#82-docker-使用-cron-定时任务)
    - [8.3 Docker 容器时间](#83-docker-容器时间)
    - [8.4 如何连接 MySQL 和 Redis 服务器](#84-如何连接-mysql-和-redis-服务器)
    - [8.5 容器内的 php 如何连接宿主机 MySQL](#85-容器内的-php-如何连接宿主机-mysql)
    - [8.6 SQLSTATE\[HY000\] \[1130\] Host '172.19.0.2' is not allowed to connect to this MySQL server](#86-sqlstatehy000-1130-host-1721902-is-not-allowed-to-connect-to-this-mysql-server)
    - [8.7 Docker 是如何生成容器名](#87-docker-是如何生成容器名)

## 1.目录结构

```bash
/
├── data                        数据库数据目录
│   ├── esdata                  ElasticSearch 数据目录
│   ├── mongo                   MongoDB 数据目录
│   ├── mysql                   MySQL8 数据目录
│   └── mysql5                  MySQL5 数据目录
├── services                    服务构建文件和配置文件目录
│   ├── elasticsearch           ElasticSearch 配置文件目录
│   ├── mysql                   MySQL8 配置文件目录
│   ├── mysql5                  MySQL5 配置文件目录
│   ├── nginx                   Nginx 配置文件目录
│   ├── php                     PHP5.6 - PHP7.4 配置目录
│   ├── php54                   PHP5.4 配置目录
│   └── redis                   Redis 配置目录
├── logs                        日志目录
├── docker-compose.sample.yml   Docker 服务配置示例文件
├── env.smaple                  环境配置示例文件
└── www                         PHP 代码目录
```

## 2.快速使用

1. 本地安装
   - `git`
   - `Docker`(系统需为 Linux，Windows 10 Build 15063+，或 MacOS 10.12+，且必须要`64`位）
   - `docker-compose 1.7.0+`
2. `clone`项目：

   ```bash
   $ git clone https://github.com/yeszao/dnmp.git
   # 假如速度太慢，可以使用加速拉取镜像
   $ git clone https://github.com.cnpmjs.org/yeszao/dnmp.git
   ```

3. 如果主机是 Linux 系统，且当前用户不是`root`用户，还需将当前用户加入`docker`用户组：

   ```bash
   sudo gpasswd -a ${USER} docker
   ```

4. 拷贝并命名配置文件（Windows 系统请用`copy`命令），启动：

   ```bash
   $ cd dnmp                                           # 进入项目目录
   $ cp env.sample .env                                # 复制环境变量文件
   $ cp docker-compose.sample.yml docker-compose.yml   # 复制 docker-compose 配置文件。默认启动3个服务：
                                                       # Nginx、PHP7和MySQL8。要开启更多其他服务，如Redis、
                                                       # PHP5.6、PHP5.4、MongoDB，ElasticSearch等，请删
                                                       # 除服务块前的注释
   $ docker-compose up                                 # 启动
   ```

5. 在浏览器中访问：`http://localhost`或`https://localhost`(自签名 HTTPS 演示)就能看到效果，PHP 代码在文件`./www/localhost/index.php`。

## 3.PHP 和扩展

### 3.1 切换 Nginx 使用的 PHP 版本

首先，需要启动其他版本的 PHP，比如 PHP5.4，那就先在`docker-compose.yml`文件中删除 PHP5.4 前面的注释，再启动 PHP5.4 容器。

PHP5.4 启动后，打开 Nginx 配置，修改`fastcgi_pass`的主机地址，由`php`改为`php54`，如下：

```bash
    fastcgi_pass   php:9000;
```

为：

```bash
    fastcgi_pass   php54:9000;
```

其中 `php` 和 `php54` 是`docker-compose.yml`文件中服务器的名称。

最后，**重启 Nginx** 生效。

```bash
docker exec -it nginx nginx -s reload
```

这里两个`nginx`，第一个是容器名，第二个是容器中的`nginx`程序。

### 3.2 安装 PHP 扩展

PHP 的很多功能都是通过扩展实现，而安装扩展是一个略费时间的过程，
所以，除 PHP 内置扩展外，在`env.sample`文件中我们仅默认安装少量扩展，
如果要安装更多扩展，请打开你的`.env`文件修改如下的 PHP 配置，
增加需要的 PHP 扩展：

```bash
PHP_EXTENSIONS=pdo_mysql,opcache,redis       # PHP 要安装的扩展列表，英文逗号隔开
PHP54_EXTENSIONS=opcache,redis                 # PHP 5.4要安装的扩展列表，英文逗号隔开
```

然后重新 build PHP 镜像。

```bash
docker-compose build php
```

可用的扩展请看同文件的`env.sample`注释块说明。

### 3.3 快速安装 php 扩展

1.进入容器:

```sh
docker exec -it php /bin/sh

install-php-extensions apcu
```

2.支持快速安装扩展列表

### 3.4 Host 中使用 php 命令行（php-cli）

1. 参考[bash.alias.sample](https://github.com/yeszao/dnmp/blob/master/bash.alias.sample)示例文件，将对应 php cli 函数拷贝到主机的 `~/.bashrc`文件。
2. 让文件起效：

   ```bash
   source ~/.bashrc
   ```

3. 然后就可以在主机中执行 php 命令了：

   ```bash
   ~ php -v
   PHP 7.2.13 (cli) (built: Dec 21 2018 02:22:47) ( NTS )
   Copyright (c) 1997-2018 The PHP Group
   Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
       with Zend OPcache v7.2.13, Copyright (c) 1999-2018, by Zend Technologies
       with Xdebug v2.6.1, Copyright (c) 2002-2018, by Derick Rethans
   ```

### 3.5 使用 composer

方法 1：主机中使用 composer 命令

1. 确定 composer 缓存的路径。比如，我的 dnmp 下载在`~/dnmp`目录，那 composer 的缓存路径就是`~/dnmp/data/composer`。
1. 参考[bash.alias.sample](https://github.com/yeszao/dnmp/blob/master/bash.alias.sample)示例文件，将对应 php composer 函数拷贝到主机的 `~/.bashrc`文件。
   > 这里需要注意的是，示例文件中的`~/dnmp/data/composer`目录需是第一步确定的目录。
1. 让文件起效：

   ```bash
   source ~/.bashrc
   ```

1. 在主机的任何目录下就能用 composer 了：

   ```bash
   cd ~/dnmp/www/
   composer create-project yeszao/fastphp project --no-dev
   ```

1. （可选）第一次使用 composer 会在 `~/dnmp/data/composer` 目录下生成一个**config.json**文件，可以在这个文件中指定国内仓库，例如：

   ````json
   {
   "config": {},
   "repositories": {
   "packagist": {
   "type": "composer",
   "url": "https://mirrors.aliyun.com/composer/"
   }
   }
   }

       ```

   **方法二：容器内使用 composer 命令**
   ````

还有另外一种方式，就是进入容器，再执行`composer`命令，以 PHP7 容器为例：

```bash
docker exec -it php /bin/sh
cd /www/localhost
composer update
```

## 4.管理命令

### 4.1 服务器启动和构建命令

如需管理服务，请在命令后面加上服务器名称，例如：

```bash
docker-compose up                         # 创建并且启动所有容器
docker-compose up -d                      # 创建并且后台运行方式启动所有容器
docker-compose up nginx php mysql         # 创建并且启动nginx、php、mysql的多个容器
docker-compose up -d nginx php  mysql     # 创建并且已后台运行的方式启动nginx、php、mysql容器


docker-compose start php                  # 启动服务
docker-compose stop php                   # 停止服务
docker-compose restart php                # 重启服务
docker-compose build php                  # 构建或者重新构建服务

docker-compose rm php                     # 删除并且停止php容器
docker-compose down                       # 停止并删除容器，网络，图像和挂载卷
```

### 4.2 添加快捷命令

在开发的时候，我们可能经常使用`docker exec -it`进入到容器中，把常用的做成命令别名是个省事的方法。

首先，在主机中查看可用的容器：

```bash
docker ps           # 查看所有运行中的容器
docker ps -a        # 所有容器
```

输出的`NAMES`那一列就是容器的名称，如果使用默认配置，那么名称就是`nginx`、`php`、`php56`、`mysql`等。

然后，打开`~/.bashrc`或者`~/.zshrc`文件，加上：

```bash
alias dnginx='docker exec -it nginx /bin/sh'
alias dphp='docker exec -it php /bin/sh'
alias dphp56='docker exec -it php56 /bin/sh'
alias dphp54='docker exec -it php54 /bin/sh'
alias dmysql='docker exec -it mysql /bin/bash'
alias dredis='docker exec -it redis /bin/sh'
```

下次进入容器就非常快捷了，如进入 php 容器：

```bash
dphp
```

### 4.3 查看 docker 网络

```sh
ifconfig docker0
```

用于填写`extra_hosts`容器访问宿主机的`hosts`地址

## 5.使用 Log

Log 文件生成的位置依赖于 conf 下各 log 配置的值。

### 5.1 Nginx 日志

Nginx 日志是我们用得最多的日志，所以我们单独放在根目录`log`下。

`log`会目录映射 Nginx 容器的`/var/log/nginx`目录，所以在 Nginx 配置文件中，需要输出 log 的位置，我们需要配置到`/var/log/nginx`目录，如：

```bash
error_log  /var/log/nginx/nginx.localhost.error.log  warn;
```

### 5.2 PHP-FPM 日志

大部分情况下，PHP-FPM 的日志都会输出到 Nginx 的日志中，所以不需要额外配置。

另外，建议直接在 PHP 中打开错误日志：

```php
error_reporting(E_ALL);
ini_set('error_reporting', 'on');
ini_set('display_errors', 'on');
```

如果确实需要，可按一下步骤开启（在容器中）。

1. 进入容器，创建日志文件并修改权限：

   ```bash
   docker exec -it php /bin/sh
   mkdir /var/log/php
   cd /var/log/php
   touch php-fpm.error.log
   chmod a+w php-fpm.error.log
   ```

2. 主机上打开并修改 PHP-FPM 的配置文件`conf/php-fpm.conf`，找到如下一行，删除注释，并改值为：

   ```bash
   php_admin_value[error_log] = /var/log/php/php-fpm.error.log
   ```

3. 重启 PHP-FPM 容器。

### 5.3 MySQL 日志

因为 MySQL 容器中的 MySQL 使用的是`mysql`用户启动，它无法自行在`/var/log`下的增加日志文件。所以，我们把 MySQL 的日志放在与 data 一样的目录，即项目的`mysql`目录下，对应容器中的`/var/log/mysql/`目录。

```bash
slow-query-log-file     = /var/log/mysql/mysql.slow.log
log-error               = /var/log/mysql/mysql.error.log
```

以上是 mysql.conf 中的日志文件的配置。

## 6.数据库管理

本项目默认在`docker-compose.yml`中不开启了用于 MySQL 在线管理的*phpMyAdmin*，以及用于 redis 在线管理的*phpRedisAdmin*，可以根据需要修改或删除。

### 6.1 phpMyAdmin

phpMyAdmin 容器映射到主机的端口地址是：`8080`，所以主机上访问 phpMyAdmin 的地址是：

```bash
http://localhost:8080
```

MySQL 连接信息：

- host：(本项目的 MySQL 容器网络)
- port：`3306`
- username：（手动在 phpmyadmin 界面输入）
- password：（手动在 phpmyadmin 界面输入）

### 6.2 phpRedisAdmin

phpRedisAdmin 容器映射到主机的端口地址是：`8081`，所以主机上访问 phpMyAdmin 的地址是：

```bash
http://localhost:8081
```

Redis 连接信息如下：

- host: (本项目的 Redis 容器网络)
- port: `6379`

## 7.在正式环境中安全使用

要在正式环境中使用，请：

1. 在 php.ini 中关闭 XDebug 调试
2. 增强 MySQL 数据库访问的安全策略
3. 增强 redis 访问的安全策略

## 8 常见问题

### 8.1 如何在 PHP 代码中使用 curl？

参考这个 issue：[https://github.com/yeszao/dnmp/issues/91](https://github.com/yeszao/dnmp/issues/91)

### 8.2 Docker 使用 cron 定时任务

[Docker 使用 cron 定时任务](https://www.awaimai.com/2615.html)

### 8.3 Docker 容器时间

容器时间在.env 文件中配置`TZ`变量，所有支持的时区请看[时区列表·维基百科](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)或者[PHP 所支持的时区列表·PHP 官网](https://www.php.net/manual/zh/timezones.php)。

### 8.4 如何连接 MySQL 和 Redis 服务器

这要分两种情况，

第一种情况，在**PHP 代码中**。

```php
// 连接MySQL
$dbh = new PDO('mysql:host=mysql;dbname=mysql', 'root', '123456');

// 连接Redis
$redis = new Redis();
$redis->connect('redis', 6379);
```

因为容器与容器是`expose`端口联通的，而且在同一个`networks`下，所以连接的`host`参数直接用容器名称，`port`参数就是容器内部的端口。更多请参考[《docker-compose ports 和 expose 的区别》](https://www.awaimai.com/2138.html)。

第二种情况，**在主机中**通过**命令行**或者**Navicat**等工具连接。主机要连接 mysql 和 redis 的话，要求容器必须经过`ports`把端口映射到主机了。以 mysql 为例，`docker-compose.yml`文件中有这样的`ports`配置：`3306:3306`，就是主机的 3306 和容器的 3306 端口形成了映射，所以我们可以这样连接：

```bash
mysql -h127.0.0.1 -uroot -p123456 -P3306
redis-cli -h127.0.0.1
```

这里`host`参数不能用 localhost 是因为它默认是通过 sock 文件与 mysql 通信，而容器与主机文件系统已经隔离，所以需要通过 TCP 方式连接，所以需要指定 IP。

### 8.5 容器内的 php 如何连接宿主机 MySQL

1.宿主机执行`ifconfig docker0`得到`inet`就是要连接的`ip`地址

```sh
$ ifconfig docker0
docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ...
```

2.运行宿主机 Mysql 命令行

```mysql
 mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
 mysql>flush privileges;
// 其中各字符的含义：
// *.* 对任意数据库任意表有效
// "root" "123456" 是数据库用户名和密码
// '%' 允许访问数据库的IP地址，%意思是任意IP，也可以指定IP
// flush privileges 刷新权限信息
```

3.接着直接 php 容器使用`172.0.17.1:3306`连接即可

### 8.6 SQLSTATE[HY000] [1130] Host '172.19.0.2' is not allowed to connect to this MySQL server

1. 目前使用 mysql-server `8.0.28`以上的版本,php 版本需要`7.4.7`以上才能连接

### 8.7 Docker 是如何生成容器名

[在不指定容器名称时,是如何生成容器名](https://pet2cattle.com/2022/08/docker-container-names-generator)
