// Global Variables (executes everytime a function is run)
const SPREADSHEET = SpreadsheetApp.openById('1M9liIYbgj3s_zhMz-lLnB5ps-4wPSNH193Of3aJifQA');
const PRINT = SpreadsheetApp.openById('13GNn4Tfw6jzxeqhA-636dSmLdJPisQjr49pLUGfRzRk');

/**
 * Get "home page", or a requested page.
 * Expects a 'page' parameter in querystring.
 *
 * @param {event} e Event passed to doGet, with querystring
 * @returns {String/html} Html to be served
 */
function doGet(e) {
  console.log(JSON.stringify(e));
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Product Manager | Home')
                    .setFaviconUrl('https://i.ibb.co/tsVf9d9/pm-logo-favicon.png').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setTitle('Product Manager | ' + e.parameter['page'])
                    .setFaviconUrl('https://i.ibb.co/tsVf9d9/pm-logo-favicon.png').setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Get the URL for the Google Apps Script running as a WebApp.
 */
function getScriptUrl() {
 let url = ScriptApp.getService().getUrl()
 console.log(url)

  // let url = 'https://script.google.com/macros/s/AKfycbzE2oUSa_Cled1MCR0Oq0u0gFX4qVbUqMcWlmfTt2_3/dev'
  // console.log(url)

  return url
}

/**
 * indclude(filename)
 * Used to insert code into the HTML Template.
 * 
 * @param {string} filename - The name of the file to get content from.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent()
}

/**
 * Generates an ID string using all uppercase letters and numbers.
 * The length of the string is dictated but the condition in the 
 * for loop.
 * 
 * @return {string} s - The ID string of characters.
 */
function genID() {  
  let s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  // The number of loops determines the amount of characters in the ID.
  for (let i = 0; i < 5; i++) {
    s += r.charAt(Math.floor(Math.random()*r.length));
  }
  return s;
}

/**
 * Search the tracking sheet for an already in use ID
 * 
 * @param   {string}  id      - The ID to be searched.
 * @return  {boolean} result  - Returns true if and ID matches, or false if
 *                              no ID is found.
 */
function isUsed(id, sheet) {
  let result;

  let tf = sheet.createTextFinder(id);
  let found = tf.findNext();

  if(found != null) {
    result = true;
  } else {
    result = false;
  }

  return result;
}

/**
 * getProductData()
 * Gets a 2D array of string data located in the Products Sheet from the 
 * Products Database spreadsheet.
 * 
 * @return {array} values - The 2D array containing row values.
 */
function getProductsData() {
  let spreadSheetId = "1M9liIYbgj3s_zhMz-lLnB5ps-4wPSNH193Of3aJifQA";
  let dataRange = "Products!A2:K";

  let range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  console.log(range)
  var values = range.values;
  console.log(values)
  return values;
}

/**
 * getDisposalData()
 * Gets a 2D array of string data located in the Disposals Sheet from the 
 * Products Database spreadsheet.
 * 
 * @return {array} values - The 2D array containing row values.
 */
function getDisposalsData() {
  var spreadSheetId = "1M9liIYbgj3s_zhMz-lLnB5ps-4wPSNH193Of3aJifQA";
  var dataRange = "Disposals!A2:H";

  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  console.log(range)
  var values = range.values;
  console.log(values)
  return values;
}

/**
 * getDisposalData()
 * Gets a 2D array of string data located in the Disposals Sheet from the 
 * Products Database spreadsheet.
 * 
 * @return {array} values - The 2D array containing row values.
 */
function getCLISData() {
  const spreadsheet = SpreadsheetApp.openById('1mYar4KjWJ_eMUX9VkF7CLRAfUuOXCG_1UvTwGWgshzM');
  console.log(spreadsheet.getName());
  const sheet = spreadsheet.getSheetByName('CLIS');
  console.log(sheet.getName());
  const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7);
  console.log(range.getA1Notation());
  const values = range.getValues();

  // Format the data
  for(let i = 0; i < values.length; i++) {
    let storeNames = values[i][2].toString().trim().split('\n');
    console.log(i,storeNames);
    let formattedStoreNames = '';
    for(let j = 0; j < storeNames.length; j++) {
      if(j == 0) {
        formattedStoreNames += storeNames[j].trim();
      } else {
        formattedStoreNames += ', ' + storeNames[j].trim();
      }
    }
    console.log(i,formattedStoreNames);
    values[i][2] = formattedStoreNames;

    let accounts = values[i][3].toString().trim().split('\n');
    console.log(i,accounts);
    let formattedAccounts = '';
    for(let j = 0; j < accounts.length; j++) {
      if(j == 0) {
        formattedAccounts += accounts[j].trim();
      } else {
        formattedAccounts += ', ' + accounts[j].trim();
      }
    }
    console.log(i,formattedAccounts);
    values[i][3] = formattedAccounts;
  }

  return values;
}

/**
 * Gets the Client Prefixes from the Customer Listing Info Sheet and formats
 * it so that Select2 javascript library can populate a select with the 
 * returned data.
 * 
 * @return {Array of Objects} data - The data passed to Select2 creation.
 */
function getSelectData() {
  console.log('getSelectData was run.');
  const clis = SpreadsheetApp.openById('1mYar4KjWJ_eMUX9VkF7CLRAfUuOXCG_1UvTwGWgshzM').getSheetByName('CLIS');

  const clisValues = clis.getRange(2, 2, clis.getLastRow() - 1, 2).getValues();
  // console.log(clisValues);

  let sortedData = [];
  for(let j = 0; j < clisValues.length; j++) {
    console.log('----- j: %d -----', j);
    if(clisValues[j][0] != '') {
      console.log('clisValues[j][0]: %s\nclisValues[j][1]: %s', clisValues[j][0], clisValues[j][1]);
      let prefix = clisValues[j][0].toString().toUpperCase().trim();
      let storeNames = clisValues[j][1].toString().toUpperCase().trim().split('\n');
      let formattedStoreNames = '';
      for(let k = 0; k < storeNames.length; k++) {
        if(k == 0) {
          formattedStoreNames += storeNames[k].trim();
        } else {
          formattedStoreNames += ', ' + storeNames[k].trim();
        }
      }
      console.log('formattedStoreNames:', formattedStoreNames);

      sortedData.push([prefix, formattedStoreNames]);
    }
  }

  sortedData.sort();

  // Format it for Select2.
  let data = [];
  for(let i = 0; i < sortedData.length; i++) {
    console.log('----- i: %d -----', i);
    console.log('value: %s', sortedData[i])
    let optionID = sortedData[i][0];
    let optionText = '';
    if(sortedData[i][1] == '') {
      optionText = sortedData[i][0];
    } else {
      optionText = sortedData[i][0] + ' - ' + sortedData[i][1];
    }
    let option = {id: optionID, text: optionText };
    data.push(option);    
  }

  return data;
}

/**
 * Takes the user input from the form.html file and processes it, then
 * adds it to the bottom of the Tracking sheet.
 * 
 * @param {array} array - An array containing all the form data.
 */
function inputProductForm(array) {
  console.log('Unprocessed Input Array: ', array);
  
  // Save the sheets in use to variables.
  const productsSheet = SPREADSHEET.getSheetByName('Products');
  const printSheet = PRINT.getSheetByName('Print');

  // Generate an ID for the entry (No Duplicates)
  let id = genID();
  console.log('Generated ID: %s', id);
  while(isUsed(id, productsSheet)) {
    console.log('ID in use already, generating new one.');
    id = genID();
    console.log('New ID: %s', id);
  }

  // Add the ID and the Date to the input array.
  array.unshift(id);
  let formattedDate = Utilities.formatDate(new Date(), "EST", "MM/dd/yyyy").toString();
  array.push(formattedDate);
  console.log('Unprocessed Complete Array: ', array);

  // Process the array
  array[1] = array[1].toString().toUpperCase().trim(); // Client Prefix
  if(array[1] == '') {
    array[1] = '?'
  }
  if(array[2] == 'Broken') {
    array[3] = 'Parts or Not Working'
  }
  if((array[2] == 'Major Component Missing')&&((array[3] == 'New')||(array[3] == 'Used Like New'))) {
    array[3] = 'Used Acceptable'
  }
  array[4] = array[4].toString().toUpperCase().trim();  //Comments
  array[5] = array[5].toString().toUpperCase().trim();  //ASIN
  if(array[5] == '') {
    array[5] = '?'
  }
  array[6] = array[6].toString().toUpperCase().trim();  //Variation
  if(array[7] == '') {
    array[7] = 0
  }
  array[8] = array[8].toString().toUpperCase().trim();  //Initials
  array[9] = array[9].toString().toUpperCase().trim();  //Location
  
  let inputRange = productsSheet.getRange(productsSheet.getLastRow() + 1, 1, 1, 11);
  console.log('Input Range: ', inputRange.getA1Notation());
  let containerArray = [array];
  console.log('contianerArray: %s', containerArray);
  inputRange.setValues(containerArray);

  //Create the untracked listing in Listing Mirror
  let sku = array[1].toString().toUpperCase().trim() + '-' + array[0].toString().toUpperCase().trim();
  let asin = array[5].toString().toUpperCase().trim();
  let quantity = array[7];
  let condition = array[3];
  console.log(`SKU: ${ sku }
  ASIN: ${ asin }
  quantity: ${ quantity }
  condition: ${ condition }`);
  createUntrackedListing(sku, asin, quantity, condition);
  
  // // Insert the label data to the print sheet.
  printSheet.getRange('A1').setValue(array[0]);  // ID
  printSheet.getRange('A3').setValue(array[3]);  // Condition
  printSheet.getRange('B2').setValue(array[10]); // Date
  printSheet.getRange('C2').setValue(array[8]);  // Initial
  printSheet.getRange('A2').setValue(array[1]);  // Client Prefix
  printSheet.getRange('B3').setValue(array[4]);  // Comments

  // Open the print dialog
  let url = printSelectedRange();
  let result = [url.toString(), array];
  console.log('End of inputForm function.');
  return result;
}

/**
 * Takes the user input from the form.html file and processes it, then
 * adds it to the bottom of the Tracking sheet.
 * 
 * @param {array} array - An array containing all the form data.
 */
function inputDisposalForm(array) {
  console.log('Unprocessed Input Array: ', array);
  
  // Save the sheets in use to variables.
  const disposalsSheet = SPREADSHEET.getSheetByName('Disposals');

  // Generate an ID for the entry (No Duplicates)
  let id = genID() + '-D';
  console.log('Generated ID: %s', id);
  while(isUsed(id, disposalsSheet)) {
    console.log('ID in use already, generating new one.')
    id = genID() + '-D';
    console.log('New ID: %s', id);
  }

  // Add the ID and the Date to the input array.
  array.unshift(id);
  let formattedDate = Utilities.formatDate(new Date(), "EST", "MM/dd/yyyy").toString();
  array.push(formattedDate);
  console.log('Unprocessed Complete Array: ', array);

  // Process the array
  array[0] = array[0].toString().toUpperCase().trim();  // LPN Number
  array[1] = array[1].toString().toUpperCase().trim();  // Client Prefix
  array[2] = array[2];                                  // Reason
  array[4] = array[4].toString().toUpperCase().trim();  // ASIN
  array[5] = array[5].toString().toUpperCase().trim();  // Initial
  array[6] = array[6].toString().toUpperCase().trim();  // Location
  
  let inputRange = disposalsSheet.getRange(disposalsSheet.getLastRow() + 1, 1, 1, 8);
  console.log('Input Range: ', inputRange.getA1Notation());
  let containerArray = [array];
  console.log('contianerArray: %s', containerArray);
  inputRange.setValues(containerArray);
  
  console.log('End of inputForm function.');
  let result = array;
  return result;
}

function printRow(data) {
  const printSheet = PRINT.getSheetByName('Print');
  console.log('Printing Row...');
  console.log(data);

  printSheet.getRange('A1').setValue(data[0])  // ID
  printSheet.getRange('A3').setValue(data[3])  // Condition
  printSheet.getRange('B2').setValue(data[10]) // Date
  printSheet.getRange('C2').setValue(data[8])  // Initial
  printSheet.getRange('A2').setValue(data[1])  // Client Prefix
  printSheet.getRange('B3').setValue(data[4])  // Comments

  let url = printSelectedRange();
  return url;
}











