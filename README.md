# ITHelps-CMS
----
![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

## Project setup
```sh
$ npm install strapi -g
```
```sh
$ cd /ITHelps_CMS
```
```sh
$ strapi start
```
> ##### Username: ***admin*** #####

> ###### Password: ***admin@*** ######



#### Verify the deployment by navigating to your server address in your preferred browser. ####

[127.0.0.1:1337](http://localhost:1337)


## Project Documentation
 [Documentation v1.0.0](http://localhost:1337/documentation/v1.0.0)

##Start mongodb in bash
```sh
brew services run mongodb-community
brew services start mongodb-community
brew services list
brew services stop mongodb-community
```
Отличие между run & start: start автозапуск при включении операционной системы (MacOS)

##Start mongodb in zsh
```sh
alias mongod='brew services run mongodb-community'
alias mongod-status='brew services list'
alias mongod-stop='brew services stop mongodb-community'
```
& used
```sh
mongod
mongod-status
mongod-stop
```

## License
MIT

**Hell Yeah!**
