# GoogleScripts
codes for google scripts. 

## FormC-code.gs
Very simple use of google scripts to automatically rename the uploaded files via google form according to other provided information.




## FormD-code.gs
Improved version of the code used in FormC-code.gs
Much more flexible code and writes logging information. If something goes wrong, it records the reason along with other logging info.
Another important feature is that you don't have to create folder for each section manually, unlike FormC-code.gs. Folder creation is automated.




## FormE-code.gs
Uses the same technique as FormD-code.gs but allows you to move the files according to submission type along with sections. For example,
say the submission type for a student is "Assignment 01" and section is "Section 02" then the folder structure for the submitted file will be 
  "Assignment 01/Section 02/"
