const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrN_Sogd0JQ9ozvbgPQMTarrdXtSE_0fkORfkqy_2Jh766U2Mlfxk5wgZYJ133_t8S7I4A_jiJiX3E/pub?gid=0&single=true&output=csv"; // Ganti dengan link CSV Google Sheet kamu

// Fungsi untuk login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.querySelector("input[name='Username']").value;
    const pass = document.querySelector("input[name='password']").value;

    fetch(CSV_URL)
        .then(res => res.text())
        .then(csv => {
            const rows = csv.split("\n").slice(1); // Skip header
            for (let row of rows) {
                const cols = row.split(",");

                const username = cols[0]?.trim();
                const password = cols[1]?.trim();

                if (user === username && pass === password) {
                    // Simpan data user ke localStorage
                    localStorage.setItem("userData", JSON.stringify(cols));
                    window.location.href = "dashboard.html"; // Redirect ke dashboard
                    return;
                }
            }

            document.getElementById("error").innerText = "Username atau password salah"; // Tampilkan error
        });

        
});
