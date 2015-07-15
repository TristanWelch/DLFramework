/**
 *  Created 30 May 2015
 *  Creator: Tristan Welch
 *  
 *  Description: Handles the call process to search and retrieve a list of documents
 *  Description: Handles Add/Changing/Removing Tabs
 *  Description: Handles Adding Table Data to the Document Frame
 */


var DocumentTabs = new Array();
var DocumentTabNumber = 0;


function initialiseTable(){

	$.fn.dataTableExt.sErrMode = 'throw';
	
	DocumentTable = $('#documenttable').dataTable({
		"sDOM": "rti",
		 "bPaginate": false,
		  "bFilter": true,
		  "bDestroy": true,	
		  "aaSorting": [],
		  "aoColumnDefs": [
		     { 'bSortable': false, 'aTargets': [ 0 ] }
		  ]
	});
	DocumentTable.fnSort( [[1,"asc"]]);
	DocumentTable.fnClearTable();
}
function DocumentSearch(Choice,InputValue){

	//Check No Tabs are open for this search
	for (var i = 0;i < DocumentTabs.length;i++){
		 var DocumentTab = JSON.parse(DocumentTabs[i]);	  
		if (InputValue == DocumentTab.Value){
			ChangeTab(i);
			return false;
		}		  
	}
	
	//Check there is tab space before proceeding	
	if ($("#documenttabholder").width() > $("#documenttablimit").width()) {
	    alert("to many tabs: please clear");
	    return false;
	}
	else{
		var SearchObject = new Object();
		SearchObject.Choice = Choice;
		SearchObject.Value = InputValue;

		$.ajax({
			url: "/DLFramework/Dataprocessor", 
			dataType: 'json',
			data: {searchdata:JSON.stringify(SearchObject)},
			type: 'POST',
			cache:false,
			success: function(TableData){
				if($('#dltogglebtn').hasClass("active")){
					GenerateTableContent(SearchObject.Choice,SearchObject.Value,TableData,true);
				}
				else{
					ToggleDocumentFrame();
					GenerateTableContent(SearchObject.Choice,SearchObject.Value,TableData,true);
				}
				
		}});	
	}
}

function GenerateTab(Choice,InputValue,TableData){

	/**
	 *  Data retrieved in this function should push the choice and value into the document tab array;
	 */
	
	var JSONObj = new Object();

	JSONObj.Value = InputValue;
	JSONObj.TableData = TableData;
	JSONObj.Choice = Choice;
	var JSONString = JSON.stringify(JSONObj);
	DocumentTabs[DocumentTabNumber] = JSONString;
	DocumentTabNumber++;
	ClearandDisplayTabs();
}

function GenerateTableContent(Choice,InputValue,TableData,TabGeneration){
	/**
	 *  Data retrieved in this function should be a JSON Array of Data []
	 *  
	 *  Table should be cleared and the new data added.
	 */
	
	//Clear the Document Table
	DocumentTable.fnClearTable();
	var RowArray = JSON.parse(JSON.stringify(TableData.TableData.Rows));
	
	for (var i = 0; i < RowArray.length;i++){
		
		var Columns = RowArray[i].toString();
		var ColumnsArray = Columns.split(",");
		DocumentTable.fnAddData(ColumnsArray);
	}
	
	if (TabGeneration == true) {GenerateTab(Choice,InputValue,TableData)};
}

function RemoveTab(Value){

	/**
	 * This should remove the tab and remove its entry in the DocumentTabs Array
	 */
	var idlocated = false;
	var index = null;
	
	for (var i = 0;i < DocumentTabs.length;i++){
		var DocumentTab = JSON.parse(DocumentTabs[i]);	
		if (idlocated == false){
			if (DocumentTab.Value == Value){
				index = DocumentTabs.indexOf(DocumentTabs[i]);	
				if (index > -1) {				   
				    $('#'+Value).remove();
					DocumentTabNumber--;
					 idlocated = true;
				}
			}
		}
		else{		
			var indexnum = i - 1;
			$("#"+DocumentTab.Value).find("span:nth-child(1)").attr("onclick","ChangeTab("+indexnum+")");
			$("#"+DocumentTab.Value).find("span:nth-child(2)").attr("onclick","ChangeTab("+indexnum+")");	
		}	
	}
	
	if (idlocated) DocumentTabs.splice(index, 1);
	
}

function ClearTabs(){
	
	/**
	 * Clear Document Tab Bar and remove all entries
	 */
	
	$('#documenttabholder').html('');
	$('#documentcleartabs').html('');
	DocumentTable.fnClearTable();
	$('#documentcleartabs').append('<button id="cleartabs" onClick="ClearTabs();" class="cleartabinfo pull-right btn-danger searchtab"><span class="cleartabinfo">Clear All Tabs</span></button>');
	DocumentTabs = [];
	DocumentTabNumber = 0;
}
function ChangeTab(id){

	/**
	 * This should change to the select tab and change the document list in the left frame
	 */
	
	for (var i = 0;i < DocumentTabs.length;i++){
	   if (i == id){
		   var DocumentTab = JSON.parse(DocumentTabs[i]);	 		    
		   GenerateTableContent(DocumentTab.Choice,DocumentTab.Value,DocumentTab.TableData,false);
		   $('#'+DocumentTab.Value).removeClass('btn-default');
		   $('#'+DocumentTab.Value).addClass('btn-primary');
		  
	   }
	   else{
		   var DocumentTab = JSON.parse(DocumentTabs[i]);	 	 	
		   $('#'+DocumentTab.Value).removeClass('btn-primary');
		   $('#'+DocumentTab.Value).addClass('btn-default');
	   }
	}
}

function ClearandDisplayTabs(){

	/**
	 *  This function should clear the tab list and add the new list of tabs.
	 */
	
	$('#documenttabholder').html('');
	$('#documentcleartabs').html('');
	for (var i = 0;i < DocumentTabs.length;i++){
		var DocumentTab = JSON.parse(DocumentTabs[i]);
		var Choice = "";
		if (DocumentTab.Choice == "casesearch"){
			Choice = "Case";
		}
		else{
			Choice = "Document";
		}
		$('#documenttabholder').append('<button id='+DocumentTab.Value+'  class="searchtab"> <span id="documenttabchoice" class="documenttabchoice" onClick="ChangeTab('+i+');" style="font-weight:bold;">'+Choice+':</span> <span id="documenttabvalue" class="documenttabvalue" onClick="ChangeTab('+i+');" class="documenttabvalue">'+DocumentTab.Value+'</span> <span onClick="RemoveTab(\''+DocumentTab.Value+'\');" class="removebtn glyphicon glyphicon-remove"></span></button>');
		if (i == DocumentTabs.length - 1) ChangeTab(i);
	}
	$('#documentcleartabs').append('<button id="cleartabs" onClick="ClearTabs();" class="cleartabinfo pull-right btn-danger searchtab"><span class="cleartabinfo">Clear All Tabs</span></button>');
}