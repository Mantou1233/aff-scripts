/**
 * Making Arcs (void or not void).to a sq. of sky notes
 */

const fs = require("fs/promises");

const invr = 100;

(async () => {
    let chart = (await fs.readFile("./2.aff", {encoding: "utf8"})).split("\r\n");

    for(let i = 2; i < chart.length; i++){
        let line = chart[i];
        line = line.replace("false", "true"); //
        if(line.includes("true")){
            const skys = [];
            const time = [line.replace("arc(", "").split(",")[0].replace("undefined", ""), line.replace("arc(").split(",")[1]].map(v => parseInt(v));
            if(line.includes("[") || line.includes("]")) line = line.replace(/\[(.+)\]/gm, "");
            for(let ii = time[0]; ii < time[1]; ii+=invr){
                skys.push(ii);
            }
            line = line.replace(";", "")
            if(skys.length == 0) continue;
            let skystr = "", _t = 1
            for(let sky of skys){
                if(_t) {
                    skystr += `[arctap(${sky})`
                    _t = 0
                    continue;
                }
                skystr += `,arctap(${sky})`
            }
            skystr += "]"
            line += `${skystr};`
        }
        chart[i] = line;
    }

    (await fs.writeFile("./3.aff", chart.join("\r\n")))
})()