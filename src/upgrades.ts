import { getScrap, modifyClickHarvestAmount, modifyScrap } from "./main.ts";

interface UpgradeType {
  name: string;
  description: string;
  cost: number;
  effects: UpgradeEffect[];
}

interface UpgradeEffect {
  type: "addToClickHarvest"; // use "|" to add more types
  value: number;
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
    cost: 30,
    effects: [
      { type: "addToClickHarvest", value: 1 },
      { type: "addToClickHarvest", value: 1 },
    ],
  },
  {
    name: "Giant Furnace",
    description: "Melt down scrap at a speedier rate.",
    cost: 100,
    effects: [{ type: "addToClickHarvest", value: 4 }],
  },
  {
    name: "Space Highways",
    description: "Collect trash space citizens throw out of their hovercars.",
    cost: 200,
    effects: [{ type: "addToClickHarvest", value: 4 }],
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
    updateUpgradeElements(upgradeType, finalUpgradeData);
  }
}

export function updateAllUpgradeElements() {
  for (const [index, upgradeType] of upgradeTypes.entries()) {
    updateUpgradeElements(upgradeType, upgradeData[index]);
  }
}

function updateUpgradeElements(
  upgradeType: UpgradeType,
  upgradeData: UpgradeData,
) {
  if (upgradeData.bought) {
    upgradeData.elementContainer.remove();
    return;
  }

  upgradeData.buyButton.disabled = getScrap() < upgradeType.cost;
}

function buyUpgrade(upgradeType: UpgradeType, upgradeData: UpgradeData) {
  if (getScrap() < upgradeType.cost) {
    return;
  }

  modifyScrap(-1 * upgradeType.cost);

  for (const effect of upgradeType.effects) {
    if (effect.type === "addToClickHarvest") {
      modifyClickHarvestAmount(effect.value);
    }
  }

  upgradeData.bought = true;
  updateUpgradeElements(upgradeType, upgradeData);
}
