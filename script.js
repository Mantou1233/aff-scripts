const fs = require("fs/promises");

const arcx = [-25, 25, 75, 125];

(async () => {
	let chart = (await fs.readFile("./1.aff", { encoding: "utf8" })).split(
		"\r\n"
	);

	for (let i = 2; i < chart.length; i++) {
		let line = chart[i];

		if (line.startsWith("hold")) {
			let args = line.replace("hold(", "").replace(");", "").split(",");
			line = `arc(${args[0]},${args[1]},${p(arcx[+args[2]-1])},${p(arcx[+args[2]-1])},s,0.00,0.00,2,none,false);`;
            line += `\r\narc(${args[0]},${args[1]},${p((arcx[+args[2]-1]+25/2))},${p(arcx[+args[2]-1]+25/2)},s,0.00,0.00,2,none,false);`;
            line += `\r\narc(${args[0]},${args[1]},${p((arcx[+args[2]-1]-25/2))},${p(arcx[+args[2]-1]-25/2)},s,0.00,0.00,2,none,false);`;
			//arc(40205,40283,-0.25,-0.25,s,0.00,0.00,0,none,false);
		}

		chart[i] = line;
	}

	await fs.writeFile("./1.aff", chart.join("\r\n"));
})();

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function p(k){ return (k/100).toFixed(2); }