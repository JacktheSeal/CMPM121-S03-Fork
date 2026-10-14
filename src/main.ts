import { setupRobots, updateAllRobotElements, updateRobots } from "./robots.ts";

// Dynamic Variables
let scrap: number = 0;
let lastTime = performance.now();

// HTML Variables
const harvestButton = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;

function setupHtmlElements() {
  harvestButton.addEventListener("click", () => {
    modifyScrap(1);
  });

  setupRobots();
}

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  modifyScrap(updateRobots(deltaTime));

  requestAnimationFrame(update);
}

export function modifyScrap(amount: number) {
  if (amount == 0) {
    return;
  }

  scrap += amount;
  updateHarvestElements();
  updateAllRobotElements();
}

export function getScrap(): number {
  return scrap;
}

function updateHarvestElements() {
  scrapElement.textContent = scrap.toString();
}

setupHtmlElements();
requestAnimationFrame(update);
