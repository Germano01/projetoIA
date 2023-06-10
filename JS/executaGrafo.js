const { spawn } = require("child_process");

window.addEventListener("load", function () {
    
    const child = spawn("python", ["Python/teste.py"]);
    child.on("exit", (code) => console.log("exitCode:", code));

    child.stdout.on("data", function (buffer) {
        const message = String(buffer);
        console.log("stdout:", message);
    });

    child.stdin.write("Olá Python!\n");
});
