const fs = require("fs");

const input = fs.readFileSync("uk-texts.txt", "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const targets = ["en", "ru"];
const output = fs.existsSync("i18n-auto-data.json")
  ? JSON.parse(fs.readFileSync("i18n-auto-data.json", "utf8"))
  : { en: {}, ru: {} };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translate(text, target) {
  const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl="
    + target + "&dt=t&q=" + encodeURIComponent(text);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data[0].map((part) => part[0]).join("").trim();
}

(async () => {
  for (const target of targets) {
    let done = 0;
    for (const text of input) {
      if (output[target][text]) {
        done++;
        continue;
      }
      try {
        output[target][text] = await translate(text, target);
      } catch (error) {
        console.error("FAILED", target, text, error.message);
        output[target][text] = text;
      }
      done++;
      if (done % 25 === 0) {
        fs.writeFileSync("i18n-auto-data.json", JSON.stringify(output, null, 2), "utf8");
        console.log(target, done, "/", input.length);
      }
      await sleep(35);
    }
    fs.writeFileSync("i18n-auto-data.json", JSON.stringify(output, null, 2), "utf8");
  }

  const js = "window.I18N_AUTO_TRANSLATIONS = "
    + JSON.stringify(output, null, 2)
    + ";\n";
  fs.writeFileSync("i18n-auto.js", js, "utf8");
})();
