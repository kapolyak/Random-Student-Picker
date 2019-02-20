const {google} = require('googleapis');
const config = require('./../config.js');
const GOOGLE_SHEET_ID = config.SPREADSHEET_ID;
const GOOGLE_SHEET_RANGE = config.RANGE;

const readSheet= (auth) => {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: GOOGLE_SHEET_RANGE,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

const writeWinnerToSheet = (auth, winner, writeCompleteCallback) => {
  const sheets = google.sheets({version: 'v4', auth});
  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: GOOGLE_SHEET_ID,  // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: GOOGLE_SHEET_RANGE,  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: "USER_ENTERED",  // TODO: Update placeholder value.

    // How the input data should be inserted.
    insertDataOption: "INSERT_ROWS",  // TODO: Update placeholder value.

    resource: {
      "values": [
        [
          `${winner}`
        ]
      ],
      "majorDimension": "ROWS"
    },

    auth: auth,
  };

  sheets.spreadsheets.values.append(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
    writeCompleteCallback();
  });
}

module.exports.readSheet = readSheet;
module.exports.writeWinnerToSheet = writeWinnerToSheet;
