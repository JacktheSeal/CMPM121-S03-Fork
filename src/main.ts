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
    }

    .container {
      display: flex;
      gap: 20px;
      margin: 40px;
    }

    .column {
      flex: 1;
      padding: 30px;
      border-radius: 15px;
      min-height: 300px;
    }

    button {
      font-size: 24px;
      padding: 40px 50px;
      background-color: navy;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      max-width: 100%;
    }

    button:hover {
      background-color: dodgerblue;
    }
  </style>

  <h1>Space Scrap Harvester</h1>

  <div class="container">
    <div class="column">
      <h2>Harvest</h2>
      <h2>Scrap: <span id="scrap">0</span></h2>
      <button id="harvest">Harvest Scrap</button>
    </div>

    <div class="column">
      <h2>Robots</h2>
      <h2><span id="robots">1</span></h2>
      <p>Auto harvesting every minute</p>
    </div>

    <div class="column">
      <h2>Upgrades</h2>
    </div>
  </div>
`;

const button = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;

button.addEventListener("click", () => {
  scrap++;
  scrapElement.textContent = scrap.toString();
});

// let robots: number = 1;
const robots: number = 1; //after enable purchase change to let
let timer: number = 0;
let autoScrap: number = 0;

let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  timer += robots * deltaTime;

  while (timer >= 60) {
    scrap++;
    timer -= 60;
    scrapElement.textContent = scrap.toString();

    autoScrap++;
    console.log("Total auto harvested scrap:", autoScrap);
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
