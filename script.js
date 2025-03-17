const ctx = document.getElementById("myChart");
const ctx1 = document.getElementById("myChart1");

fetch("data.json")
  .then(function (response) {
    if (response.ok == true) {
      return response.json();
    }
  })
  .then(function (data) {
    createChartWeek(data, "bar");
    createChartYear(data, "line");
  });
function createChartWeek(data, type) {
  // Filter data for the last 7 days
  const last7DaysData = data.filter((row) => {
    const rowDate = new Date(row.date);
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    return rowDate >= sevenDaysAgo && rowDate <= today;
  });

  new Chart(ctx, {
    type: type,
    data: {
      labels: last7DaysData.map((row) => row.date),
      datasets: [
        {
          label: "Last Weeks Apex Test Fails",
          data: last7DaysData.map((row) => row.fails),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
    },
  });
}
function createChartYear(data, type) {
  new Chart(ctx1, {
    type: type,
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: "Total Apex Test Fails",
          data: data.map((row) => row.fails),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
    },
  });
}
