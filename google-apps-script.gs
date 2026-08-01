/**
 * Google Apps Script for the portfolio forms — SINGLE self-contained function.
 *
 * Appends each website submission as a row:
 *   - Contact form      -> "Contact Form" tab
 *   - Resume downloads  -> "Resume Downloads" tab
 *
 * HOW TO INSTALL (copy EVERYTHING in this file):
 * 1. Open your Google Sheet > Extensions > Apps Script.
 * 2. Select ALL existing code (Ctrl+A), delete it, paste this whole file.
 * 3. Save (Ctrl+S).
 * 4. Deploy > Manage deployments > pencil icon (Edit) >
 *    Version: "New version" > Deploy.  (URL stays the same.)
 *
 * If you ever edit this code again, repeat step 4 — the URL only serves
 * DEPLOYED versions, not saved drafts.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var isResume = data.formType === "resume";

    var tabName = isResume ? "Resume Downloads" : "Contact Form";
    var headers = isResume
      ? ["Timestamp", "Name", "Email", "Purpose"]
      : ["Timestamp", "Name", "Email", "Phone", "Message"];

    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    if (isResume) {
      sheet.appendRow([new Date(), data.name, data.email, data.purpose || ""]);
    } else {
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
