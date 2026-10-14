// Data Driven Config

// Dynamic Variables
let scrap: number = 0;
let robotTimer: number = 0;
let lastTime = performance.now();
let scrapRobots: number = 0;
let autoScrap: number = 0; //for console

// HTML Variables
const harvestButton = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;
const scrapRobotCountElement = document.getElementById("scrapRobotCount")!;
const scrapRobotHarvestElement = document.getElementById("scrapRobotHarvest")!;
const scrapRobotCostElement = document.getElementById("scrapRobotCost")!;
const scrapRobotButton = document.getElementById("scrapRobotButton")!;

function setupHtmlElements() {
  harvestButton.addEventListener("click", () => {
    scrap++;
    updateHarvestElements();
  });

  scrapRobotButton.addEventListener("click", buyRobot);

  updateHarvestElements();
  updateRobotElements();
}

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  robotTimer += deltaTime;

  // Every 5 sec produce 1 * robotCount scrap
  while (robotTimer >= 5) {
    scrap += scrapRobots;
    robotTimer -= 5;
    updateHarvestElements();

    autoScrap += scrapRobots;
    console.log("Total auto harvested scrap:", autoScrap);
  }

  requestAnimationFrame(update);
}

// Helper for robot price
function getScrapRobotCost(): number {
  return Math.ceil(10 * 1.15 ** scrapRobots);
}

function buyRobot() {
  const cost = getScrapRobotCost();

  if (scrap >= cost) {
    scrap -= cost;
    scrapRobots++;

    updateHarvestElements();
    updateRobotElements();
  }
}

function updateHarvestElements() {
  scrapElement.textContent = scrap.toString();
}

function updateRobotElements() {
  scrapRobotCountElement.textContent = scrapRobots.toString();
  scrapRobotHarvestElement.textContent = scrapRobots.toString();
  scrapRobotCostElement.textContent = getScrapRobotCost().toString();
}

setupHtmlElements();
requestAnimationFrame(update);
