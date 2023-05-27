const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydatabase.db");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("exportedData.csv");

function exportData(customerName, funnel, startDate, endDate) {
  const query = `SELECT * 
                 FROM CRM
                 WHERE customer='${customerName}'
                 AND funnel='${funnel}'
                 AND transition_date BETWEEN '${startDate}' AND '${endDate}'`;

  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      return;
    }
    console.log(JSON.stringify(rows));
    fastcsv
      .write(rows, { headers: true })
      .on("finish", () => {
        console.log("Write to csv file done");
      })
      .pipe(ws);
  }).close();
}

// exportData("Customer1", "Funnel1", "2023-05-01", "2023-05-05");
