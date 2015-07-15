package framework.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

/**
 * Servlet implementation class framework
 */
public class Dataprocessor extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Dataprocessor() {
		super();

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("Loading Framework...");
		if (request.getParameter("adminconsole") != null){
			System.out.println("Loading Admin Console...");
		}
		else{
			System.out.println("Loading web applet...");
			request.getRequestDispatcher("/JSP/DocumentFramework.jsp").include(request, response);
		}


	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


		request.setCharacterEncoding("utf8");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		JSONObject SearchObj = (JSONObject) JSONValue.parse(request.getParameter("searchdata"));
		System.out.println("Identified Choice:  " + SearchObj.get("Choice"));
		System.out.println("Identified Value:  " + SearchObj.get("Value"));

		JSONObject SendObj = new JSONObject();
		SendObj.put("TableData", unitTest(SearchObj.get("Choice").toString(),SearchObj.get("Value").toString()));
		out.println(SendObj);
	}

	@SuppressWarnings("unchecked")
	public JSONObject unitTest(String Choice, String Value){

		System.out.println("Running Unit Test Script " + new Date());
		System.out.println("  Choice:  " + Choice);
		System.out.println("  Value:  " + Value);

		JSONObject TableData = new JSONObject();

		if (Choice.equalsIgnoreCase("casesearch")){

			System.out.println("Testing case:" + Value);
			// Create a table with 6 columns and random number of rows with random data


			//Generate Random Rows
			int RowNumber = GenerateRandomNumber(1,40);
			JSONArray rowobj = new JSONArray();
			
			//Create Columns with data in each row
			for (int i = 0; i < RowNumber;i++){

				JSONArray columnsobj = new JSONArray();
				//Create 6 rows of random data
				for (int n = 0; n < 6;n++){
					columnsobj.add(GenerateRandomNumber(1,4000));
				}
				rowobj.add(columnsobj);
			}
			TableData.put("Rows", rowobj);
		}
		else{

			System.out.println("Testing Document:" + Value);
			//Generate Random Rows

			JSONArray rowobj = new JSONArray();
			JSONArray columnsobj = new JSONArray();
			//Create 6 rows of random data
			for (int n = 0; n < 6;n++){
				columnsobj.add(GenerateRandomNumber(1,4000));
			}

			rowobj.add(columnsobj);

			TableData.put("Rows", rowobj);
		}
		return TableData;
	}

	public int GenerateRandomNumber(int min,int max){		
		Random random = new Random();
		return (random.nextInt(max - min + 1) + min);
	}

}
