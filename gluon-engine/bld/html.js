require('shelljs/global');
 
if (!test('-d', "dist")) mkdir("dist");

cp("src/resources/html/main.html", "dist");

exit(0);