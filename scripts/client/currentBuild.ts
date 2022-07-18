import { BlockLocation, MinecraftBlockTypes, Player } from "mojang-minecraft";
import blocks, { Param3D } from "../utilities/blocks";

export default function currentBuild(player: Player) {
  const location = player.location;
  const startingBlock = new BlockLocation(location.x + 5, location.y, location.z);
  let currentLocation = startingBlock;
  makeBuilding(currentLocation);
}

function makeBuilding(location: BlockLocation) {
  const xSize = 20;
  const ySize = 100;
  const zSize = 20;

  const xStart = location.x;
  const xEnd = location.x + xSize - 1;
  const yStart = location.y;
  const yEnd = location.y + ySize - 1;
  const zStart = location.z;
  const zEnd = location.z + zSize - 1;

  blocks.place3DWithParams(location, MinecraftBlockTypes.dirt, new Param3D(xSize, ySize, zSize), (x, y, z) => {
    return x === xStart || x === xEnd || y === yStart || y === yEnd || y % 5 === 0 || z === zStart// || z === zEnd
  })
}