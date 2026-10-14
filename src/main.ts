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

// Dynamic Variables
let scrap: number = 0;
let robotTimer: number = 0;
let lastTime = performance.now();
// let robots: number = 1;
const robots: number = 1; //after enable purchase change to let

// HTML Variables
const button = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;

function setupHtmlElements() {
  button.addEventListener("click", () => {
    scrap++;
    scrapElement.textContent = scrap.toString();
  });
}

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  robotTimer += robots * deltaTime;

  while (robotTimer >= 5) {
    scrap++;
    robotTimer -= 5;
    scrapElement.textContent = scrap.toString();
  }

  requestAnimationFrame(update);
}

setupHtmlElements();
requestAnimationFrame(update);
