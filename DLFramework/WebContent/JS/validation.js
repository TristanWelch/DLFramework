/**
 *  Created 30 May 2015
 *  Creator: Tristan Welch
 *  
 *  Description: Handles all validation for user input
 */

function ValidateSearch(){
	
	var Value = $("#searchinput").val().length;
	
	if (Value > 0){
		return true;
	}
	else{
		alert("Search Problem: Please enter a valid value");
		return false;
	}
}