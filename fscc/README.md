# Full Stack Engineer Coding Challenge Application (FSCC) - Challenge 1

## Instructions (Tools required: Maven, Java Runtime Environment)

1. From the command line, go to the project's base directory and run a maven build   

    `
	mvn clean package -X
    `

    The `-X` option provides debugging information to help troubleshoot errors or failures during the Maven execution.

2. Upon successful build, type the following to run the Spring Boot Application from the project's base directory (edit runjar.bat to point to your local JDK/JRE):  
    
    > runjar.bat
    
    OR from the command line run the following
    
    > java -jar target/fsccapp.jar


3. You can then access the REST endpoint via the following URL:
    `
    http://localhost:23456/api/encode


4. The encoded message is stored in a file in the base directory called encoded.json