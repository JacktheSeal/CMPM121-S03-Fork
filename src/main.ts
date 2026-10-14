// Data Driven Config

// Dynamic Variables
let scrap: number = 0;
let robotTimer: number = 0;
let lastTime = performance.now();
let robots: number = 1;
let autoScrap: number = 0; //for console

// HTML Variables
const harvestButton = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;
const robotElement = document.getElementById("robots")!;
const robotCostElement = document.getElementById("robotCost")!;
const buyRobotButton = document.getElementById("buyRobot")!;

function setupHtmlElements() {
  harvestButton.addEventListener("click", () => {
    scrap++;
    scrapElement.textContent = scrap.toString();
  });

  buyRobotButton.addEventListener("click", buyRobot);
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

// Helper for robot price
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
requestAnimationFrame(update);
