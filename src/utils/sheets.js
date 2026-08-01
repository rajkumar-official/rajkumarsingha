import { sheetsWebAppUrl } from "./constants";

// Sends a form payload to the Google Apps Script web app, which appends it
// as a row in the Google Sheet. Content-Type text/plain keeps the request
// "simple" so the browser skips the CORS preflight Apps Script can't answer.
export const submitToSheet = async (payload) => {
  if (!sheetsWebAppUrl) {
    console.warn("VITE_SHEETS_WEBAPP_URL is not set — skipping sheet save.");
    return false;
  }

  try {
    const res = await fetch(sheetsWebAppUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    });
    const data = await res.json();
    return data.result === "success";
  } catch (error) {
    console.error("Error saving to Google Sheet:", error);
    return false;
  }
};
