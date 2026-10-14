interface RobotType {
  name: string;
  harvestAmount: number;
  costFunction: (numRobots: number) => number;
}

interface RobotData {
  numRobots: number;
  countElement: HTMLElement;
  harvestElement: HTMLElement;
  costElement: HTMLElement;
  buyButton: HTMLElement;
}

// Data Driven Config
const robotTypes: RobotType[] = [
  { name: "Scrap Robot", harvestAmount: 1, costFunction: getScrapRobotCost },
  { name: "Steel Robot", harvestAmount: 5, costFunction: getSteelRobotCost },
];

function getScrapRobotCost(numRobots: number): number {
  return Math.ceil(10 * 1.15 ** numRobots);
}

function getSteelRobotCost(numRobots: number): number {
  return Math.ceil(40 * 1.16 ** numRobots);
}

// Dynamic Variables
let scrap: number = 0;
let robotTimer: number = 0;
let lastTime = performance.now();
let autoScrap: number = 0; //for console
const robotData: RobotData[] = [];

// HTML Variables
const harvestButton = document.getElementById("harvest")!;
const scrapElement = document.getElementById("scrap")!;
const robotColumn = document.getElementById("robotColumn")!;

function setupHtmlElements() {
  harvestButton.addEventListener("click", () => {
    scrap++;
    updateHarvestElements();
  });

  updateHarvestElements();
  setupRobots();
}

function setupRobots() {
  for (const robotType of robotTypes) {
    const divElement = document.createElement("div");

    const countElement = document.createElement("h2");
    divElement.append(countElement);

    const harvestElement = document.createElement("p");
    divElement.append(harvestElement);

    const costElement = document.createElement("p");
    divElement.append(costElement);

    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy " + robotType.name;
    divElement.append(buyButton);

    const finalRobotData: RobotData = {
      numRobots: 0,
      countElement: countElement,
      harvestElement: harvestElement,
      costElement: costElement,
      buyButton: buyButton,
    };
    robotData.push(finalRobotData);
    buyButton.addEventListener(
      "click",
      () => buyRobot(robotType, finalRobotData),
    );

    robotColumn.append(divElement);
    updateRobotElements(robotType, finalRobotData);
  }
}

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  robotTimer += deltaTime;

  while (robotTimer >= 5) {
    for (const [index, robotType] of robotTypes.entries()) {
      const harvest: number = getRobotHarvest(
        robotType,
        robotData[index].numRobots,
      );
      scrap += harvest;

      autoScrap += harvest;
      console.log("Total auto harvested scrap:", autoScrap);
    }
    robotTimer -= 5;
  }
  updateHarvestElements();

  requestAnimationFrame(update);
}

function getRobotHarvest(robotType: RobotType, numRobots: number): number {
  return robotType.harvestAmount * numRobots;
}

function buyRobot(robotType: RobotType, robotData: RobotData) {
  const robotCost: number = robotType.costFunction(robotData.numRobots);

  if (scrap >= robotCost) {
    scrap -= robotCost;
    robotData.numRobots++;

    updateHarvestElements();
    updateRobotElements(robotType, robotData);
  }
}

function updateHarvestElements() {
  scrapElement.textContent = scrap.toString();
}

function updateRobotElements(robotType: RobotType, robotData: RobotData) {
  robotData.countElement.textContent = robotType.name + "s: " +
    robotData.numRobots;

  const robotHarvest: number = getRobotHarvest(robotType, robotData.numRobots);
  robotData.harvestElement.textContent = "Harvesting " +
    robotHarvest.toString() + " scrap every 5 seconds";

  const robotCost: number = robotType.costFunction(robotData.numRobots);
  robotData.costElement.textContent = "Cost: " + robotCost.toString() +
    " Scrap";
}

setupHtmlElements();
requestAnimationFrame(update);
