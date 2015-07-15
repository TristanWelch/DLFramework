<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<!-- Below is a list of included CSS Files -->
<link rel="stylesheet" type="text/css" href="CSS/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css" href="CSS/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="CSS/bootstrap-select.min.css">
<link rel="stylesheet" type="text/css" href="CSS/jquery.dataTables_themeroller.css">
<link rel="stylesheet" type="text/css" href="CSS/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="CSS/styleframework.css">




<!-- Below is a list of included JavaScript Files -->
<script src="/DLFramework/JS/jquery.js"></script>
<script src="/DLFramework/JS/bootstrap.min.js"></script>
<script src="/DLFramework/JS/bootstrap-select.js"></script>
<script src="/DLFramework/JS/jquery.dataTables.js"></script>
<script src="/DLFramework/JS/documentsearch.js"></script>
<script src="/DLFramework/JS/validation.js"></script>
<script src="/DLFramework/JS/frameanimation.js"></script>
<script src="/DLFramework/JS/adminrequest.js"></script>




<!-- Below is the prerequisite initialisations required for the framework -->
<script>
	$(document).ready(function() {

		var DocumentTable = null;
		
				initialiseTable();
				GenerateTableHeaders();
				$('[data-toggle="tooltip"]').tooltip(); 
				$('.selectpicker').selectpicker();
				$('.selectpicker').selectpicker({
					style : 'btn-info',
					size : 4
				});
				$('#documentcleartabs').append('<button id="cleartabs" onClick="ClearTabs();" class="cleartabinfo pull-right btn-danger searchtab"><span class="cleartabinfo">Clear All Tabs</span></button>');
				
				jQuery(function($) {
					$("#searchbtn").click(function() {
					   var Valid = ValidateSearch();
						 if (Valid) {		
							DocumentSearch($.trim($('#selectchoice').val()),$.trim($('#searchinput').val()));							
							return false;
						 }
					});
				});
	});
</script>

<!-- Below are the required functions for the framework -->
<script></script>


<!-- Specify the title of the page -->
<title>DLFramework</title>
</head>
<body>
	<!-- This Frame is designed to handle all functionality -->
	<div id="headerframe" class="headerframe pull-left">
		<div class="panel panel-default">
			<div class="panel-body">
				<div id="searchfield" class="searchfield pull-left">
					<div id='searchgrp' class="searchgrp input-group">
						<div class="input-group-btn">					
							<select id='selectchoice' class="pull-left selectpicker selectdropdown">
								<option value="casesearch">Case Search</option>
								<option value="documentsearch">Document Search</option>
							</select>
							<input id="searchinput" type="text"
							class="pull-left form-control searchinputfield" aria-label="...">
							<button id="searchbtn" type="button" class="pull-left btn btn-default">Search</button>					
						</div>
					</div>
				</div>
				<div class="optionsfield pull-right">
					<div class="btn-group optionbtn">
						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
							<span class="glyphicon glyphicon-cog"></span> <span class="caret"></span>
						</button>
						<ul class="dropdown-menu dropdown-menu-right" role="menu">
							<li><a href="#">Column Settings</a></li>
						</ul>
					</div>
				</div>
				<div class="togglefield well well-lg pull-right">
						<div class="btn-group optionbtn">
						<button id='dltogglebtn' type="button" onClick="ToggleDocumentFrame();" class="btn btn-default hidedocumentlistbtn active"  data-toggle="tooltip" data-placement="bottom" title="Hide Document List">
							<span class="glyphicon glyphicon-th-list"></span>
						</button>
						</div>				
				</div>
				<div class="actionfield well well-lg pull-left">
					<div class="btn-group optionbtn">
						<button id='dltogglebtn' type="button" onClick="ToggleDocumentFrame();" class="btn btn-default hidedocumentlistbtn"  data-toggle="tooltip" data-placement="bottom" title="Stamp Document">
							<span class="glyphicon glyphicon-th-list"></span>
						</button>
					</div>
					<div class="btn-group optionbtn">
						<button id='dltogglebtn' type="button" onClick="ToggleDocumentFrame();" class="btn btn-default hidedocumentlistbtn"  data-toggle="tooltip" data-placement="bottom" title="Convert Document">
							<span class="glyphicon glyphicon-th-list"></span>
						</button>
					</div>
					<div class="btn-group optionbtn">
						<button id='dltogglebtn' type="button" onClick="ToggleDocumentFrame();" class="btn btn-default hidedocumentlistbtn"  data-toggle="tooltip" data-placement="bottom" title="Stamp & Convert Document">
							<span class="glyphicon glyphicon-th-list"></span>
						</button>
					</div>
					<div class="btn-group optionbtn">
						<button id='dltogglebtn' type="button" onClick="ToggleDocumentFrame();" class="btn btn-default hidedocumentlistbtn"  data-toggle="tooltip" data-placement="bottom" title="Print">
							<span class="glyphicon glyphicon-th-list"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- This Frame is designed to contain tabs of searches -->
	<div id="documenttabs" class="documenttabs pull-left">
		<div id="documenttabholder" class="pull-left documenttabholder"></div>
		<div id="documentcleartabs" class="pull-right documentcleartabs"></div>
		<div id="documenttablimit" class="documenttablimit"></div>
	</div>

	<!-- This Frame is designed to contain a list of documents -->
	<div id="documentframe" class="documentframe pull-left">
		<div class="panel panel-default">
			<div class="panel-body documentpanel">
				<table id="documenttable" class="documenttable">
			 		<thead>
			 			<th>2424</th>
			 			<th>2424</th>
			 			<th>2424</th>
			 			<th>2424</th>
			 			<th>2424</th>
			 			<th>2424</th>
			 		</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- This Frame is designed to allow the viewing of documents-->
	<div id="viewframe" class="viewframe pull-left">
		<div class="panel panel-default">
			<div class="panel-body">
				<applet class="applet" code="applet.core" archive="applet.jar"> </applet>
			</div>
		</div>
	</div>
</body>
</html>