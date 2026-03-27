// MATRIX RAIN
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 33);

// TERMINAL
function log(text) {
    const terminal = document.getElementById("terminal");
    terminal.innerHTML += text + "<br>";
    terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(e) {
    if (e.key === "Enter") {
        const cmd = e.target.value;
        log("> " + cmd);

        if (cmd === "help") {
            log("Commands: help, clear, ip, hash");
        } else if (cmd === "clear") {
            document.getElementById("terminal").innerHTML = "";
        } else if (cmd === "ip") {
            getIP();
        }

        e.target.value = "";
    }
}

// HASH
async function generateHash() {
    const text = document.getElementById("hashInput").value;
    const data = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hex = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById("hashOutput").innerText = hex;
}

// PASSWORD
function checkPass() {
    const p = document.getElementById("passInput").value;
    let strength = "Weak";

    if (p.length > 8 && /[A-Z]/.test(p) && /[0-9]/.test(p)) {
        strength = "Strong 💪";
    } else if (p.length > 5) {
        strength = "Medium ⚠️";
    }

    document.getElementById("passOutput").innerText = strength;
}

// IP
async function getIP() {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const info = `${data.ip} | ${data.city} | ${data.country_name} | ${data.org}`;
    document.getElementById("ipOutput").innerText = info;
    log("IP: " + info);
}

// VOICE
function startVoice() {
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.onresult = function(e) {
        const text = e.results[0][0].transcript;
        log("🎤 " + text);

        if (text.includes("ip")) getIP();
        if (text.includes("clear")) document.getElementById("terminal").innerHTML = "";
    };
    rec.start();
}

// FAKE AI RESPONSES
setTimeout(() => {
    log("System initialized...");
    log("Welcome, HACKER 🔥");
}, 1000);
