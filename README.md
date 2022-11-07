# HttpGetApp

This project was generated with Angular CLI version 14.2.7.  

## Aim
A simple web page. Performs access to a backend project springAPI. You can find this repository in my Github too.  
This project includes files to perform a deployment on a small Kubernetes cluster with Minikube.  

**Versions used for the frontend application**
Angular CLI (ng) : 14.2.7  
Node: 18.12.0  
Package Manager: npm 8.19.2  
Angular: 14.2.8  
Rxjs : 7.5.7  
typescript : 4.7.4  

**Minikube**
minikube : v1.27.2    
kubectl server version : v1.25.2  
kubectl client version : v1.25.3  

### inspired from
[link 1](https://www.tektutorialshub.com/angular/angular-http-get-example-using-httpclient/#comments)  

### Troubleshooting
**CrossOrigins**  
Add headers in responses with filters on the server and @CrossOrigin("*")  in the @RestController   

https://www.techiedelight.com/add-custom-header-to-all-responses-spring-boot/  


### run
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.  




>>>>>>>>>>>>>>>
angular get data from external file
 https://medium.com/beingcoders/angular-basics-read-data-from-external-file-on-your-prod-build-78cc3ae46e68
 https://robinraju.io/angular-loading-application-settings-from-external-file/

a voir  : docker build angular app



WIP 
### to check that everything works locally
docker pull httpd:alpine3.16
docker build --tag my-apache2 . --file ./Dockerfile.local .
docker run -dit --name my_running_app -p 8080:80 my-apache2
docker exec -it my_running_app sh

request in the input html element can be controller implemented in controller.java
etudiant/2 => @RequestMapping(value="/etudiant/{id}")
listeEtudiants => @RequestMapping(value="/listeEtudiants")
or nothing ! => @RequestMapping("/")

note : in "assets" directory, configuration looks like this
environment.json : { "env": "development" }
config.development.json file = { "host": "http://localhost:8282/api" }


### with minikube

kubernetes set serrvice for front and back end
https://kubernetes.io/docs/tasks/access-application-cluster/connecting-frontend-backend/
https://betterprogramming.pub/kubernetes-deployment-connect-your-front-end-to-your-back-end-with-nginx-7e4e7cfef177
https://www.smashingmagazine.com/2022/05/kubernetes-front-end-developers/

https://www.w3docs.com/snippets/apache/how-to-redirect-a-web-page-with-apache.html


### Apache configuration httpd.conf.local
configuration httpd.conf file can be seen at : /usr/local/apache2/conf
DocumentRoot "/usr/local/apache2/htdocs" : the The directory out of which you will serve your documents
Listen 80 :  Listen: Allows you to bind Apache to specific IP addresses and/or ports, instead of the default

verify that Apache httpd server listen to the according port : netstat -tulpn | less
result :
ctive Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:8282            0.0.0.0:*               LISTEN      1/httpd
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1/httpd

docker networking see : https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach

TUTO APACHE : setting up a reverse proxy
https://www.netnea.com/cms/apache-tutorial-9_setting-up-a-reverse-proxy/
https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension-ubuntu-20-04
https://httpd.apache.org/docs/2.4/fr/mod/mod_proxy.html#access
https://perhonen.fr/blog/2015/05/un-reverse-proxy-apache-avec-mod_proxy-1713


### adapt it to kubernetes
note : server tcp port list reserved or allowed : https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
note : kubernetes network : https://learnk8s.io/kubernetes-network-packets


docker build --tag skeres95250/my-apache2:v1.0  --file ./Dockerfile.kubernetes .
docker image push skeres95250/my-apache2:v1.0

minikube addons enable metrics-server
minikube tunnel : to enable service type loadbalancer
minikube addons enable metrics-server
