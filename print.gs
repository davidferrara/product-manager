let PRINT_OPTIONS = {
  'size': 0,               // paper size. 0=letter, 1=tabloid, 2=Legal, 3=statement, 4=executive, 5=folio, 6=A3, 7=A4, 8=A5, 9=B4, 10=B5
  'top_margin': 0.15,
  'left_margin': 0.10,
  'right_margin': 0.05,
  'bottom_margin': 0.05,
  'horizontal_alignment': 'LEFT',
  'vertical_alignmnet': 'TOP',
  'fzr': false,            // repeat row headers
  'portrait': false,       // false=landscape
  'fitw': false,           // fit window or actual size
  'gridlines': false,      // show gridlines
  'printtitle': false,
  'sheetnames': false,
  'pagenum': 'UNDEFINED',  // CENTER = show page numbers / UNDEFINED = do not show
  'attachment': false
}

let PDF_OPTS = objectToQueryString(PRINT_OPTIONS)

function printSelectedRange() {
  console.log('in print function')
  SpreadsheetApp.flush()
  let sheet = PRINT.getSheetByName('Print')
  console.log(sheet.getName())
  let range = sheet.getRange('A1:C3')
  console.log(range.getA1Notation())

  let gid = sheet.getSheetId()
  let printRange = objectToQueryString({
    'c1': range.getColumn() - 1,
    'r1': range.getRow() - 1,
    'c2': range.getColumn() + range.getWidth() - 1,
    'r2': range.getRow() + range.getHeight() - 1
  })
  let url = PRINT.getUrl().replace(/edit$/, '') + 'export?format=pdf' + PDF_OPTS + printRange + "&gid=" + gid;
  console.log(url);

  return url;
}

function objectToQueryString(obj) {
  return Object.keys(obj).map(function(key) {
    return Utilities.formatString('&%s=%s', key, obj[key])
  }).join('')
}











