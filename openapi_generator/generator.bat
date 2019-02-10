
if not exist ".\openapi-generator-cli.jar"  goto nofile
goto start                                

:nofile                                   

powershell -Command "Invoke-WebRequest -OutFile openapi-generator-cli.jar http://central.maven.org/maven2/org/openapitools/openapi-generator-cli/3.3.4/openapi-generator-cli-3.3.4.jar"

:start                               

powershell -Command "Invoke-WebRequest http://localhost:8080/v2/api-docs -OutFile api-docs.json"

java -jar openapi-generator-cli.jar generate -i .\api-docs.json -g typescript-angular -o ..\shared\  --skip-validate-spec