//Query 1

async function getLastUpdatedTime() {
  try {
    const result = await processorsStatus
      .find({
        customer: "Apple",
        crm: "finished",
      })
      .sort({ updatedDate: -1 })
      .limit(1)
      .toArray();
    result.length
      ? console.log(
          `Apple's Crm Last Updated Time is ${result[0].updatedDate.toLocaleString()}`
        )
      : console.log(`Apple's Crm Wasn't Updated`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

//Query 4

async function getStuckCustomersList() {
  const now = new Date();

  //get the last 24 hours time range
  const TIME_RANGE = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const result = await processorsStatus
      .find(
        {
          crm: "inProgress",
          updatedDate: { $gte: TIME_RANGE },
        },
        { customer: 1, _id: 0 }
      )
      .toArray();

    const customers = Array.from(new Set(result.map((c) => c.customer)));
    result.length
      ? console.log(
          `Stuck Customers in the last 24 hours: ${JSON.stringify(customers)}`
        )
      : console.log("There Are No Stuck Customers in The Last 24 Hours");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
