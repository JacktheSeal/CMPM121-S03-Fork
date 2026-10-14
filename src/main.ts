// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
/*
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(heading, image, message);
*/

let scrap: number = 0;

document.body.innerHTML = `
  <style>
    body {
      color: black;
      text-align: center;
      font-family: Arial, sans-serif;
      padding-top: 80px;
    }

    button {
      font-size: 24px;
      padding: 40px 60px;
      background-color: navy;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }

    button:hover {
      background-color: dodgerblue;
    }
  </style>

  <h1>Space Scrap Harvester</h1>
  <h2>Scrap: <span id="scrap">0</span></h2>
  <button id="harvest">Harvest Scrap</button>
`;

const button = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;

button.addEventListener("click", () => {
  scrap++;
  scrapElement.textContent = scrap.toString();
});
