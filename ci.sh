#! /bin/bash

ssh root@167.99.106.189 << 'EOSSH'

    # move to work timer app directory
    cd work-timer-react/

    # pull the latest code
    git pull

    # WORK TIMER UI START
    # get id of currently running work timer docker container
    container=$(docker ps -a -q --filter ancestor=work-timer-react --format="{{.ID}}")

    # stop the docker container
    docker stop $container
    
    # delete old container to save space
    docker rm $(docker ps -a -q)

    # build a new docker container based upon updated repository
    docker build -t work-timer-react .

    # WORK TIMER UI END

    # WORK TIMER API START
    # get id of currently running work timer docker container
    container=$(docker ps -a -q --filter ancestor=work-timer-api --format="{{.ID}}")

    # stop the docker container
    docker stop $container
    
    # delete old container to save space
    docker rm $(docker ps -a -q)

    # build a new docker container based upon updated repository
    docker build -t work-timer-api .

    # start the docker container
    docker-compose up -d
    # WORK TIMER API END
    
    # list currently running containers
    docker ps

    echo "looks like it worked!!!"
EOSSH
