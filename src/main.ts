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
let robots: number = 1;
// const robots: number = 1; //after enable purchase change to let
let autoScrap: number = 0; //for console
const robotElement = document.getElementById("robots")!;
const robotCostElement = document.getElementById("robotCost")!;

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

  robotTimer += deltaTime;

  // every 5 sec produce 1 * robotCount scrap
  while (robotTimer >= 5) {
    scrap += robots;
    robotTimer -= 5;
    scrapElement.textContent = scrap.toString();

    autoScrap += robots;
    console.log("Total auto harvested scrap:", autoScrap);
  }

  requestAnimationFrame(update);
}

// helper for robot price
function getRobotCost(): number {
  return Math.ceil(10 * 1.15 ** (robots - 1));
}

function buyRobot() {
  const cost = getRobotCost();

  if (scrap >= cost) {
    scrap -= cost;
    robots++;

    scrapElement.textContent = scrap.toString();
    robotElement.textContent = robots.toString();
    robotCostElement.textContent = getRobotCost().toString();
  }
}

setupHtmlElements();
document.getElementById("buyRobot")!.addEventListener("click", buyRobot);
requestAnimationFrame(update);
