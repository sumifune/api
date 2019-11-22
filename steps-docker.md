docker build -t kubia .
docker run --name kubia-container -p 8080:8080 -d kubia
docker ps
docker inspect kubia-container
docker exec -it kubia-container bash

### Listing processes from inside a container
root@44d76963e8e1:/# ps aux
### A container’s processes run in the host OS
$ ps aux | grep app.js
### A container has its own complete filesystem
root@44d76963e8e1:/# ls /
app.js  boot  etc   lib    media  opt   root  sbin  sys  usr
bin     dev   home  lib64  mnt    proc  run   srv   tmp  var

### Stoping containers
docker stop kubia-container
### Listing containers
ps -a --> prints out all the containers, those running and those that have been stopped.
### Removing containers
docker rm kubia-container --> its contents are removed and it can’t be started again.

### A container image can have multiple tags
docker tag kubia sukia/kubia

$ docker images | head
REPOSITORY        TAG      IMAGE ID        CREATED             VIRTUAL SIZE
sukia/kubia       latest   d30ecc7419e7    About an hour ago   654.5 MB
kubia             latest   d30ecc7419e7    About an hour ago   654.5 MB

### PUSHING THE IMAGE TO DOCKER HUB
Log in under your user ID
docker login
Push the image to Docker Hub
docker push sukia/kubia

### RUNNING THE IMAGE ON A DIFFERENT MACHINE
Run the image on any machine running Docker
$ docker run -p 8080:8080 -d sukia/kubia

# Passing variables to Docker
There are 2ways to pass variables environment to docker. There are all documented : https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file

Also:
https://medium.com/@felipedutratine/pass-environment-variables-from-docker-to-my-nodejs-or-golang-app-a1f2ddec31f5

using the option -e
$ sudo docker run  [...] -e my_connection_string="xxxxx"
                         -e my_password="xxx" [...]

using env-file docker option.
So first you should create a file .list using, for each line, the format :

KEY_NAME=VALUE
exemple :

my_connection_string=xxxxxx
my_password=yyyyyyyy
my_secret=zzzzz
And giving this information to docker :

$ sudo docker run [...] --env-file ./my_env.list [...]

### GET the variables in NodeJs
All the variables pass to docker, will be found in process.env.{Key}

Try in a node console app dockerize :

console.log('Hello ' + process.env.NAME)

And of course pass to docker :

$ sudo docker run [...] -e NAME="Felipe"

### Define  the environment variable Dockerfile

ENV NAME Rafal

run the container without specifying the -e option.
$ docker build -t node .
$ docker run node

output:
Hello Rafal

Environment variables are useful when we need to have different versions of  the Docker container depending on its purpose, for example, to have separate profiles for production  and testing servers.
If  the environment variable is defined both in Dockerfile and as a
flag, then the command flag takes precedence.

# Logs
$   docker  logs    d51ad8634fac

# Port forwarding or publishing

-p, --publish   <host_port>:<container_port>

$   docker  run -d  -p  8080:8080 node

# Aaccess the virtual machine that kitematic launched

$ docker-machine ssh

# Container networks

$ ifconfig docker0
docker0 Link encap:Ethernet HWaddr 02:42:db:d0:47:db
        inet addr:172.17.0.1 Bcast:0.0.0.0 Mask:255.255.0.0
...

The  docker0    interface   is  created by  the Docker  daemon  in  order   to  connect with the Docker  container.

We  can see what    interfaces  are created inside  the Docker  container
$ docker inspect <container_id>

filter response
$ docker inspect --format '{{.NetworkSettings.IPAddress  }}' <container_id> .

# Delete stopped container

if the container   is  running,    we  need    to  stop    it  first

$  docker  rm  47ba1c0ba90e

### Remove  all stopped containers
$  docker rm $(docker ps  --no-trunc -aq)

-aq -> pass only IDs (no additional data) for all containers.
--no-trunc -> asks Docker not to truncate the output.

### Ask the container   to  remove  itself
when    it's    stopped using   the  --rm   flag

$ docker run --rm hello-world

# Cleaning  up  images

Set up  the Cron cleanup job, which removes all old and unused images.
$ docker rmi $(docker images -q)

In  order to  prevent removing the images with tags (for    example,    to  not remove all the latest  images), use the  dangling   parameter:

$ docker rmi $(docker images -f "dangling=true" -q)

If  we  have containers  that use volumes, then, in  addition to  images and containers, it's    worth   to  think   about   cleaning    up  volumes.

The easiest way to do this is:

docker volume ls -qf dangling=true | xargs -r docker volume rm


# Volumes

docker run -d -v ~/docker/tut:/usr/src/app -p 49160:8080 sukia/node-web-app

# Commit the stopped container:

This command saves modified container state into a new image user/test_image

docker commit $CONTAINER_ID user/test_image


# Clear any cache previous jenkins
docker system prune -a




# pm2-dev for development

Only by passing usePolling=true will chokidar watch for changes inside mounted folders. Could be that this happens with all VM shared folders and not just with docker.

PM2 comes with a handy development tool that allow you to start an application and restart it on file change:

Start your application in development mode it print the logs and restart on file change too

Two way of running your application :

pm2-dev start my-app.js -or- pm2-dev my-app.js


## Troubleshooting

Based on:
https://github.com/Unitech/pm2/issues/1313

Shared volumes and file watching are known to not to work very well together. Since you are using a docker+Mac OSX I guess VirtualBox (NFS) is the problem. Try passing `usePolling: true` as described in [paulmillr/chokidar#242](https://github.com/paulmillr/chokidar/issues/242). It works for us but comes with a higher CPU cost.

Example processes.json:

```js
{
  "apps" : [{
    ...
    "watch"      : true,
    "watch_options": {
      "usePolling": true
    }
  }]
}
```


Link: https://github.com/Unitech/pm2/issues/2641

For development, use pm2-dev in your Dockerfile to restart your app on file change within the Docker container.
For production, use pm2-docker in your Dockerfile to restart your app in case of crash.
To expose a health check endpoint you can use the option `--web` ([doc here](http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/#expose-health-endpoint))