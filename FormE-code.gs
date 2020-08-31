
function checkFolderList(folderName, list_of_folders){
  Logger.log("In checkFolderList()");
  var outputs = []; //a list
  while(list_of_folders.hasNext()){
    folder = list_of_folders.next()
    var name = folder.getName();
    console.log("   got : " +  name)
    if (folderName == name){
      console.log("   folder found!");
      outputs.push(true)
      outputs.push(folder)
      break;
    }
  }
  outputs.push(false)
  return outputs;
}



// create folder if it does not exist
function createFolderIfNotFound(folder_name, file){
  Logger.log("In createFolderIfNotFound()");
  console.log("name of the file : " + file.getName());
  // Move to appropriate folder according to folder_name  
  var parents = file.getParents();
  console.log("parent of the file : " + parents.getContinuationToken());
  var folder = parents.next(); // first folder in the parent
  console.log("Selected Parent : " + folder.getName());
  
  var sub_folders = folder.getFolders(); // folder inside the parent
  
  var status = checkFolderList(folder_name, sub_folders);
  console.log("from checkFolderList() status returned : " + status[0]);
  
  if(status[0]){
   // is status is true 
    var folder_out = status[1]
    Logger.log("Folder to be used \'" + folder_out.getName() + "\'");
  }else{
    var folder_out = folder.createFolder(folder_name);
    Logger.log("Folder to be used \'" + folder_out.getName() + "\'");
    Logger.log("folder \'" + folder_name + "\' created in " + folder.getName()); 
  }
  
  return folder_out;  
  
}


function moveToDifferentFolder(folder_name, file){
  Logger.log("In moveToDifferentFolder()");
  var folder = createFolderIfNotFound(folder_name, file)
  file.moveTo(folder)
}



function myFunctionFormAToDifferentFolder(){
  
  var section_INDEX = 0; // the section 
  var id_INDEX = 1; // the student id 
  var type_INDEX = 2 ;// type of file. assignment 1 or 2 or midterm or lab
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
  
  Logger.log("File Renamed successfully : " + newName);
   
  moveToDifferentFolder(type, file);    // move the file to different 'type' folder
  moveToDifferentFolder(section, file); // move the file to different 'section' folder
}
