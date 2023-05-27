const LAST_UPDATED_DATA_TIME_RANGE = new Date(Date.now() - 2 * 60 * 60 * 1000);

async function scanValidates() {
  const customersLastUpdatedData = await processorsStatus
    .aggregate([
      {
        $match: {
          updatedDate: { $gte: LAST_UPDATED_DATA_TIME_RANGE },
        },
      },
      {
        $group: {
          _id: "$customer",
          crm: { $push: "$crm" },
          onlineTraffic: { $push: "$onlineTraffic" },
          analysis: { $push: "$analysis" },
          updatedDates: { $push: "$updatedDate" },
        },
      },
    ])
    .toArray();

  customersLastUpdatedData.map((data) => {
    let isStuck = false;
    let query = {};
    ["crm", "onlineTraffic", "analysis"].forEach((key) => {
      if (data[key][0] === data[key][1]) {
        isStuck = true;
        query[key] = "unhandled";
      }
    });

    if (isStuck) {
      //log Stuck Costumer
      console.log(`Stuck Customer is ${data._id}`);
      processorsStatus.findOneAndUpdate(
        { customer: data.customer },
        { $set: query },
        { sort: { updatedDate: -1 } }
      );
    }
  });
}

// scanValidates();
