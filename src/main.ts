import { setupRobots, updateAllRobotElements, updateRobots } from "./robots.ts";
import { setupUpgrades, updateAllUpgradeElements } from "./upgrades.ts";

// Dynamic Variables
let scrap: number = 0;
let clickHarvestAmount: number = 1;
let lastTime = performance.now();

// HTML Variables
const harvestButton = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;

function setupHtmlElements() {
  harvestButton.addEventListener("click", () => {
    modifyScrap(clickHarvestAmount);
  });

  setupRobots();
  setupUpgrades();
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
  updateAllUpgradeElements();
}

export function getScrap(): number {
  return scrap;
}

export function modifyClickHarvestAmount(amount: number) {
  if (amount == 0) {
    return;
  }

  clickHarvestAmount += amount;
}

function updateHarvestElements() {
  scrapElement.textContent = scrap.toString();
}

setupHtmlElements();
requestAnimationFrame(update);
