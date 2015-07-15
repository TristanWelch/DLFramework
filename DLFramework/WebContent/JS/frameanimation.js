/**
 *  Created 30 May 2015
 *  Creator: Tristan Welch
 *  
 *  Description: Handles the animations of the framework components
 */
var DocumentFrameState = true;

function ToggleDocumentFrame(){
	if (DocumentFrameState){
	
		$("#dltogglebtn").removeClass("active");
		$('#dltogglebtn').attr('data-original-title', 'Show Document List');
		$('#dltogglebtn').tooltip();
		$("#documentframe").hide();
		$("#viewframe").css("width",'100%');
		
		DocumentFrameState = false;
	}
	else{
		
		$("#dltogglebtn").addClass("active");
		$('#dltogglebtn').attr('data-original-title', 'Hide Document List');
		$('#dltogglebtn').tooltip();
		$("#documentframe").show();
		$("#viewframe").css("width",'70%');
		
		DocumentFrameState = true;
	}	
}

