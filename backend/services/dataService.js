const fs = require("fs");
const csv = require("fast-csv");

var AGENT_DATA = {};

const stream = fs
  .createReadStream("./resources/agent_data.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    const { agent, role, icon } = row;
    AGENT_DATA[agent] = { role: parseInt(role), icon };
});

module.exports = {
  AGENT_DATA,
};
