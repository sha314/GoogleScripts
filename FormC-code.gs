function moveToDifferentFolder(section, file){
  // Move to appropriate folder according to section
  var folders = DriveApp.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    var folderName = folder.getName();
    if (section == folderName){
      
      file.moveTo(folder);
      
      break;
    }
  } 
}


function myFunctionToRenameFiles(){
  
  var section_INDEX = 0; // the section 
  var id_INDEX = 1; // the student id 
  var type_INDEX = 2 ;// type of file. assignment 1 or 2 or midterm
  var file_INDEX = 3 ;// the section 
  
  var form=FormApp.getActiveForm();
  
// returns the total number of form submissions
  var length    =   form.getResponses().length;
  
  // get the last form submission
  //getResponses()[length-1] retrieves the last form response, accounting for the fact that the first index is zero and hte last length-1
  var last_form = form.getResponses()[length-1]
  
  // last form responses
  var last_form_responses = last_form.getItemResponses()
  
//replace INDEX of the questions. keep in mind that the first question has the index 0
  
  var section  = last_form_responses[section_INDEX].getResponse(); // retrieve section number
  var id       = last_form_responses[id_INDEX].getResponse(); // retrieve id
  var type     = last_form_responses[type_INDEX].getResponse(); // retrieve type
  var fileID   = last_form_responses[file_INDEX].getResponse(); // retrieve file id. Assuming the file is uploaded in the last field of the form
  
  
//accesses the uploaded file
  var file=DriveApp.getFileById(fileID);
  
  var old_name = file.getName();
  
  //var splitted = old_name.split('.')
  //var splitted_length = splitted.length
  //changes the file name
  //var fileFormat = splitted[splitted_length-1];
  //var newName = section + '_' + id + '_' + type + '.' + fileFormat;
  
  var newName = section + '_' + id + '_' + type + '__' + old_name;
  file.setName(newName);
  
  
   moveToDifferentFolder(section, file);
}
