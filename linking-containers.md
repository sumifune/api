from: https://cloudkul.com/blog/understanding-communication-docker-containers/



docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=rootpassword123 -d mysql/mysql-server:5.6

docker run -tid -p 80:80 --name apache2 --link mysql nimmis/apache-php5



docker inspect mysql

docker inspect apache2



docker exec -ti apache2 bash

ping mysql



docker exec -ti mysql bash

ping apache2