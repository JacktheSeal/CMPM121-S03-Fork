# D1 starter

A minimal TypeScript/Vite browser project with Deno checks and GitHub Pages deployment.

## Credits

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.

## Project Handoff

App link: https://lzhu73.github.io/CMPM121-D01/

To run:
Install Deno and run command in project directory:
deno task setup
deno task dev

To play:
Click "Harvest Scrap" to collect scrap.
Buy different robots to increase automatic scrap production.
Buy upgrades to increase scrap earned per click or increase robot scraps harvested.
Robot prices increase as you purchase more of them, and later upgrades cost more.

## Developer Handoff

Code structure:
main.ts — Handles scrap and the game loop
robots.ts — Robot purchases and auto harvesting
upgrades.ts — Upgrade purchases and their effects
styles.css — UI style

Data Driven design:
Robots and upgrades are all stored in object arrays. The same functions handles purchasing and updating for all robot and upgrade types, this allows us to add new items without rewriting functions or adding new variables.

Major Features + Refactors:

- https://github.com/lzhu73/CMPM121-D01/commit/9ce75acdec9720112a5fdd6e28a8d7fcea02ec19
- Changed the old robot code to use a data driven design, which allowed for more types to be easily added.
- https://github.com/lzhu73/CMPM121-D01/commit/eed738798dd10703cb093870bd5c99cb5823f56d
- Added upgrades, refactored harvesting to use a dynamic value instead of always giving one scrap.
