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
