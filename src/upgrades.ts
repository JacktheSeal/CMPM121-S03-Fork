import { getScrap, modifyClickHarvestAmount, modifyScrap } from "./main.ts";
import {
  getRobotPluralName,
  multiplyRobotHarvestMultiplier,
} from "./robots.ts";

interface UpgradeType {
  name: string;
  description: string;
  cost: number;
  effects: UpgradeEffect[];
}

interface UpgradeEffect {
  type: "addToClickHarvest" | "multiplyRobotHarvestMultiplier"; // use "|" to add more types
  value: number;
  // Unused for addToClickHarvest
  index: number;
}

interface UpgradeData {
  bought: boolean;
  elementContainer: HTMLElement;
  buyButton: HTMLButtonElement;
}

// Data Driven Config
const upgradeTypes: UpgradeType[] = [
  {
    name: "Moon Research Station",
    description: "Gather throwaway scrap from researchers on a remote moon.",
    cost: 40,
    effects: [
      { type: "addToClickHarvest", value: 1, index: 0 },
    ],
  },
  {
    name: "Giant Furnace",
    description: "Melt down scrap at a speedier rate.",
    cost: 125,
    effects: [
      { type: "addToClickHarvest", value: 4, index: 0 },
    ],
  },
  {
    name: "De-rusting",
    description: "Clean up the rust on your scrap robots.",
    cost: 200,
    effects: [
      { type: "multiplyRobotHarvestMultiplier", value: 2, index: 0 },
    ],
  },
  {
    name: "Space Highways",
    description: "Collect trash space citizens throw out of their hovercars.",
    cost: 300,
    effects: [
      { type: "addToClickHarvest", value: 4, index: 0 },
    ],
  },
  {
    name: "Joint Greasing",
    description: "Make your steel robots move with most elegance.",
    cost: 500,
    effects: [
      { type: "multiplyRobotHarvestMultiplier", value: 2, index: 1 },
    ],
  },
  {
    name: "Shiny Polish",
    description: "Improve the morale of your titanium robots tenfold!",
    cost: 1000,
    effects: [
      { type: "multiplyRobotHarvestMultiplier", value: 2, index: 2 },
    ],
  },
];

// Dynamic Variables
const upgradeData: UpgradeData[] = [];

// HTML Variables
const upgradeColumn = document.getElementById("upgradeColumn")!;

export function setupUpgrades() {
  for (const upgradeType of upgradeTypes) {
    const divElement = document.createElement("div");
    divElement.className = "storeContainer";

    const titleElement = document.createElement("h2");
    titleElement.textContent = upgradeType.name;
    divElement.append(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = upgradeType.description;
    divElement.append(descriptionElement);

    const effectsElement = document.createElement("p");
    let effectsText: string = "Effects: \n";
    for (const effect of upgradeType.effects) {
      if (effect.type === "addToClickHarvest") {
        effectsText += "Increases click harvest by " + effect.value.toString() +
          ".\n";
      } else if (effect.type === "multiplyRobotHarvestMultiplier") {
        effectsText += "Multiplies harvest of " +
          getRobotPluralName(effect.index) +
          " by " + effect.value.toString() +
          ".\n";
      }
    }
    effectsElement.textContent = effectsText;
    divElement.append(effectsElement);

    const costElement = document.createElement("p");
    costElement.textContent = "Cost: " + upgradeType.cost.toString() + " Scrap";
    divElement.append(costElement);

    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy " + upgradeType.name;
    divElement.append(buyButton);

    const finalUpgradeData: UpgradeData = {
      bought: false,
      elementContainer: divElement,
      buyButton: buyButton,
    };
    upgradeData.push(finalUpgradeData);
    buyButton.addEventListener(
      "click",
      () => buyUpgrade(upgradeType, finalUpgradeData),
    );

    upgradeColumn.append(divElement);
  }
  updateAllUpgradeElements();
}

export function updateAllUpgradeElements() {
  let numBought: number = 0;
  for (const [index, upgradeType] of upgradeTypes.entries()) {
    if (upgradeData[index].bought) {
      numBought++;
      upgradeData[index].elementContainer.remove();
      continue;
    }

    if (index - numBought >= 3) {
      upgradeData[index].elementContainer.style.display = "none";
      continue;
    }

    upgradeData[index].elementContainer.style.display = "";
    upgradeData[index].buyButton.disabled = getScrap() < upgradeType.cost;
  }
}

function buyUpgrade(upgradeType: UpgradeType, upgradeData: UpgradeData) {
  if (getScrap() < upgradeType.cost) {
    return;
  }

  modifyScrap(-1 * upgradeType.cost);

  for (const effect of upgradeType.effects) {
    if (effect.type === "addToClickHarvest") {
      modifyClickHarvestAmount(effect.value);
    } else if (effect.type === "multiplyRobotHarvestMultiplier") {
      multiplyRobotHarvestMultiplier(effect.index, effect.value);
    }
  }

  upgradeData.bought = true;
  updateAllUpgradeElements();
}
