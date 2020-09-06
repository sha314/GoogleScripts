// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = 'EMAIL_SENT';
var EMAIL_NOT_SENT = 'EMAIL_NOT_SENT';
var INVALID_EMAIL = 'INVALID_EMAIL';

var NOT_APPLICABLE = "NA";

var subject = "Midterm Result PHY112, SM2020"

// indices. count starts from 0
var col_id    = 0;
var col_name  = 1;
var col_email = 2;
var col_score = 3;
var col_EmailSent = 4; 

var numberOfColumn = 5;  // how many columns to read


function getMessage(name, score){
  Logger.log("getMessage()");
  var line1 = "Hello " + name + ",\n";
  var line2 = "Your score in Midterm exam is " + score + " out of 20 in PHY112 course. ";
  var line3 = "Please contact your instructor for further inquiry.\n";
  var line4 = "This is a software generated mail. Please do not reply."
  return line1 + line2 + line3 + line4;
}



/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var maxRows = sheet.getLastRow();
  var numRows = maxRows-1; // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, numberOfColumn);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row   = data[i];
    Logger.log("##row [", i, "] => " , row);
    // selecting different columns
    var id = row[col_id]
    var name = row[col_name]
    var emailAddress = row[col_email]
    var score = row[col_score]
    var emailSent    = row[col_EmailSent];
    Logger.log("emailSent flag is => ", emailSent);
    
    
    if(score == NOT_APPLICABLE){
      Logger.log("socore is => ", NOT_APPLICABLE);
      sheet.getRange(startRow + i, col_EmailSent+1).setValue(EMAIL_NOT_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
      continue; 
    }

    
    if (emailSent != EMAIL_SENT) { // Prevents sending duplicates
      var message = getMessage(name, score);
      Logger.log("mail will be sent");
//      Logger.log(message);
//      Logger.log("to ", emailAddress);
      try{
      MailApp.sendEmail(emailAddress, subject, message); // this command is used to send the mail 
        sheet.getRange(startRow + i, col_EmailSent+1).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
      } catch(e){
        Logger.log("Error with email (" + email + "). id " + id + " ." + e);
        sheet.getRange(startRow + i, col_EmailSent+1).setValue(INVALID_EMAIL);
      }
    }else{
//      Logger.log("flag ", EMAIL_SENT, " for ", emailAddress)
    }
  }
}
