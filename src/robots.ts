import { getScrap, modifyScrap } from "./main.ts";

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
const robotData: RobotData[] = [];
let robotTimer: number = 0;
let autoScrap: number = 0; //for console

// HTML Variables
const robotColumn = document.getElementById("robotColumn")!;

export function setupRobots() {
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

export function updateRobots(deltaTime: number): number {
  robotTimer += deltaTime;
  let scrapHarvest: number = 0;

  while (robotTimer >= 5) {
    for (const [index, robotType] of robotTypes.entries()) {
      const harvest: number = getRobotHarvest(
        robotType,
        robotData[index].numRobots,
      );
      scrapHarvest += harvest;

      autoScrap += harvest;
      console.log("Total auto harvested scrap:", autoScrap);
    }
    robotTimer -= 5;
  }

  return scrapHarvest;
}

function buyRobot(robotType: RobotType, robotData: RobotData) {
  const robotCost: number = robotType.costFunction(robotData.numRobots);

  if (getScrap() >= robotCost) {
    modifyScrap(-1 * robotCost);
    robotData.numRobots++;

    updateRobotElements(robotType, robotData);
  }
}

function updateRobotElements(robotType: RobotType, robotData: RobotData) {
  robotData.countElement.textContent = robotType.name + "s: " +
    robotData.numRobots;

  const robotHarvest: number = getRobotHarvest(
    robotType,
    robotData.numRobots,
  );
  robotData.harvestElement.textContent = "Harvesting " +
    robotHarvest.toString() + " scrap every 5 seconds";

  const robotCost: number = robotType.costFunction(robotData.numRobots);
  robotData.costElement.textContent = "Cost: " + robotCost.toString() +
    " Scrap";
}

function getRobotHarvest(robotType: RobotType, numRobots: number): number {
  return robotType.harvestAmount * numRobots;
}
