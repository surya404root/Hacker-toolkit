// SHA-256 Hash Generator
async function generateHash() {
    const text = document.getElementById("textInput").value;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    document.getElementById("hashOutput").innerText = hashHex;
}

// Password Strength Checker
function checkPassword() {
    const pass = document.getElementById("passwordInput").value;
    let strength = "Weak";

    if (pass.length > 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
        strength = "Strong 💪";
    } else if (pass.length > 5) {
        strength = "Medium ⚠️";
    }

    document.getElementById("strengthOutput").innerText = strength;
}

// Get IP Info
async function getIP() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    document.getElementById("ipOutput").innerText = "IP: " + data.ip;
      }
