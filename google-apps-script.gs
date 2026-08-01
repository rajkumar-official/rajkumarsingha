/**
 * Google Apps Script for the portfolio forms.
 *
 * Receives POSTs from the website and appends each submission as a row:
 *   - Contact form      -> "Contact Form" tab
 *   - Resume downloads  -> "Resume Downloads" tab
 *
 * SETUP (one time):
 * 1. Create a Google Sheet (sheets.new).
 * 2. Extensions > Apps Script, delete the default code, paste this file.
 * 3. Deploy > New deployment > type "Web app":
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 * 4. Authorize when prompted, then copy the Web app URL.
 * 5. Put it in the site's .env as VITE_SHEETS_WEBAPP_URL.
 *
 * NOTE: after any code change here you must create a NEW deployment
 * (or deploy a new version) — the URL only serves deployed code.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.formType === "resume") {
      var sheet = getOrCreateSheet(ss, "Resume Downloads", [
        "Timestamp",
        "Name",
        "Email",
        "Purpose",
      ]);
      sheet.appendRow([new Date(), data.name, data.email, data.purpose || ""]);
    } else {
      var sheet = getOrCreateSheet(ss, "Contact Form", [
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Message",
      ]);
      sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.phone || "",
        data.message || "",
      ]);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}
