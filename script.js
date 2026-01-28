/* =====================
   TERMINAL
===================== */
const terminal = document.getElementById("terminal");
const output = document.getElementById("output");
const input = document.getElementById("command-input");

const commands = {
  help: "about  skills  projects  contact  theme  clear",
  about: "Creative frontend developer focused on interactive experiences.",
  skills: "JavaScript ██████████\nCSS ██████████\nReact █████████",
  projects: "Terminal Portfolio\nData Visualizer\nMini Game",
  contact: "email@example.com\nGitHub: github.com/username"
};

function print(text) {
  const p = document.createElement("p");
  p.innerHTML = text.replace(/\n/g, "<br>");
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

/* INPUT FUNCIONA SIEMPRE */
terminal.addEventListener("click", () => input.focus());

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    print(`&gt; ${cmd}`);
    run(cmd);
    input.value = "";
  }
});

function run(cmd) {
  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }
  if (commands[cmd]) {
    print(commands[cmd]);
  } else {
    print("<span style='color:red'>command not found</span>");
  }
}

/* =====================
   BOOT SEQUENCE
===================== */
const bootLines = [
  "Booting system...",
  "Loading modules...",
  "Initializing interface...",
  "System ready.",
  "",
  "Welcome.",
  "Type 'help' to begin."
];

(function boot(i = 0) {
  if (i < bootLines.length) {
    print(bootLines[i]);
    setTimeout(() => boot(i + 1), 300);
  } else {
    input.focus(); // 🔥 CLAVE
  }
})();
