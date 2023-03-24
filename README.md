# ThePainterSite
final trainee project for DigitazonTechSchool
#
#
#
#
#
#
#
#
# BACK END
# per generare DB su MySQL ed inserire un user diverso da localhost
# 
-- ddl necessarie alla creazione del DB in MySQL
CREATE DATABASE thePainterDb;
-- do uno user a questo DB con tutte le autorizzazioni necessarie
create user 'springUser'@'%' identified by 'fakePassword';
grant all on thePainterDb.* to 'springUser'@'%';

# per application properties in caso dell'user nuovo registrato
#
MYUSER=springUser;MYPSW=fakePassword;MYSQL_HOST=127.0.0.2

# per creare le tabelle, le relazioni e popolare il DB 
#
1) spostare data.sql e schema.sql dalla cartella "DDL generated" alla seguente:
 src > main > resources
2) avviare the PainterApplication ed attendere che vengano terminati i processi
3) spostare data.sql e schema.sql da cartella "DDL generated", per evitare ai successivi riavvii errori duplicazione
## NOTA: nel caso di reset del DB, prima eliminarlo da MySQL per poi ripetere la procedura di creazione(user persiste non necessario)
## 		e solo poi ripetere i punti da 1 a 3

## FRONT END - librerie installate ##
npm install react-router-dom
npm install react-icons
npm install react-bootstrap bootstrap
npm install reactive-button