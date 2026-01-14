const input = document.getElementById('command-input');
const output = document.getElementById('output');

const commands = {
    help: "Available commands: about, skills, projects, contact, resume, clear",
    about: "Hi! I'm [Tu Nombre], a developer passionate about web interactivity.",
    skills: "JavaScript 90%\nReact 85%\nCSS/HTML 95%\nNode.js 70%",
    projects: "1. Portfolio Website → GitHub | Live\n2. Data Visualizer → GitHub | Live",
    contact: "Email: user@example.com\nLinkedIn: linkedin.com/in/username",
    resume: "Download my CV at: link-to-cv.pdf"
};

input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        const cmd = input.value.toLowerCase().trim();
        const p = document.createElement('p');
        p.innerHTML = "> " + cmd;
        output.appendChild(p);

        if(cmd === 'clear'){
            output.innerHTML = '';
        } else if(commands[cmd]){
            const res = document.createElement('p');
            res.innerHTML = commands[cmd].replace(/\n/g, "<br>");
            output.appendChild(res);
        } else {
            const res = document.createElement('p');
            res.innerHTML = `Command not found: ${cmd}`;
            res.style.color = 'red';
            output.appendChild(res);
        }

        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});
