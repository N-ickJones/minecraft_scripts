import { MinecraftBlockTypes, Player } from "mojang-minecraft";
import blocks, { Param3D } from "../utilities/blocks";
import playerUtils from "../utilities/playerUtils";

export default function makeBuilding(player: Player) {
  const xSize = 20;
  const ySize = 30;
  const zSize = 20;

  var location = playerUtils.getPlayerDirectionBlockExact(player, 30);


  const xStart = location.x;
  const xEnd = location.x + xSize - 1;
  const yStart = location.y;
  const yEnd = location.y + ySize - 1;
  const zStart = location.z;
  const zEnd = location.z + zSize - 1;

  blocks.place3DWithParams(location, MinecraftBlockTypes.dirt, new Param3D(xSize, ySize, zSize), (x, y, z) => {
    return x === xStart || x === xEnd || y === yStart || y === yEnd || y % 5 === 0 || z === zStart || z === zEnd
  })
}
