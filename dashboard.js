const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrN_Sogd0JQ9ozvbgPQMTarrdXtSE_0fkORfkqy_2Jh766U2Mlfxk5wgZYJ133_t8S7I4A_jiJiX3E/pub?gid=0&single=true&output=csv";

// DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    window.location.href = "index.html";
  } else {
    fetch(CSV_URL)
      .then(res => res.text())
      .then(csv => {
        const rows = csv.split("\n").filter(row => row.trim() !== "");
        const userRows = rows.filter(row => row.split(",")[0] === userData[0]);

        const monthSelect = document.getElementById("monthSelect");
        const uniqueMonths = [...new Set(userRows.map(row => row.split(",")[5]))];

        uniqueMonths.forEach(month => {
          const option = document.createElement("option");
          option.value = month;
          option.textContent = month;
          monthSelect.appendChild(option);
        });

        monthSelect.value = userRows[0].split(",")[5];
        displayData(userRows[0]);

        window.userRows = userRows;
      })
      .catch(error => console.error(error));
  }
}

function displayData(data) {
  const dataArray = data.split(",");
  document.getElementById("profileName").textContent = dataArray[2];  // nama
  document.getElementById("profileClass").textContent = dataArray[3]; // kelas
  document.getElementById("profileUsername").textContent = dataArray[0]; // username
  document.getElementById("scoreText").textContent = dataArray[4]; // nilai
  document.getElementById("attendanceText").textContent = dataArray[8]; // keberangkatan
  document.getElementById("notesText").textContent = dataArray[9]; // notes

  // Fill monthly report and attendance
  document.getElementById("progressBody").innerHTML = `<tr><td>${dataArray[5]}</td><td>${dataArray[4]}</td><td>${dataArray[6]}</td><td>${dataArray[7]}</td></tr>`; // Pencapaian added
}

function filterMonth() {
  const selectedMonth = document.getElementById("monthSelect").value;
  const selectedData = window.userRows.find(row => row.split(",")[5] === selectedMonth); // F column for bulan
  displayData(selectedData);
}

// Fungsi logout
document.getElementById("logoutBtn").addEventListener("click", function() {
  // Hapus data user dari localStorage
  localStorage.removeItem("userData");

  // Arahkan pengguna ke halaman login
  window.location.href = "index.html";
});
