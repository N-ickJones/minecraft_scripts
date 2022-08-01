import { BlockLocation, BlockType, MinecraftBlockTypes, Player, world } from "mojang-minecraft";
import playerUtils from "./playerUtils";

type BlockObject = {
  blockType: BlockType;
  x: number;
  y: number;
  z: number;
}

export type AsyncBlockCheck = ((block: BlockObject) => Promise<boolean>);

class Blocks {
  place3DArray(location: BlockLocation, array: BlockType[][][]) {
    for (let x = 0; x < array.length; x++)
      for (let y = 0; y < array[x].length; y++)
        for (let z = 0; z < array[x][y].length; z++)
          blocks.place(array[x][y][z] ?? MinecraftBlockTypes.air, new BlockLocation(x + location.x, y + location.y, z + location.z));
  }

  placeConditional3DArray(location: BlockLocation, array: BlockType[][][]) {
    for (let x = 0; x < array.length; x++)
      for (let y = 0; y < array[x].length; y++)
        for (let z = 0; z < array[x][y].length; z++)
          blocks.place(array[x][y][z] ?? MinecraftBlockTypes.air, new BlockLocation(x + location.x, y + location.y, z + location.z));
  }

  place(type: BlockType, location: BlockLocation) {
    world.getDimension("overworld").getBlock(location).setType(type);
  }

  place3D(location: BlockLocation, blockType: BlockType, size: number, callbackConditional: (x: number, y: number, z: number) => boolean) {
    this.place3DWithParams(location, blockType, new Param3D(size), callbackConditional);
  }

  place3DWithParams(location: BlockLocation, blockType: BlockType, size: Param3D, callbackConditional: (x: number, y: number, z: number) => boolean) {
    for (let x = location.x; x < location.x + size.x; x++)
      for (let y = location.y; y < location.y + size.y; y++)
        for (let z = location.z; z < location.z + size.z; z++)
          if (callbackConditional(x, y, z))
            blocks.place(blockType, new BlockLocation(x, y, z));
  }

  place4D(location: BlockLocation, array: BlockType[][][], asyncBlockChecks: AsyncBlockCheck[]) {
    for (let x = 0; x < array.length; x++)
      for (let y = 0; y < array[x].length; y++)
        for (let z = 0; z < array[x][y].length; z++) {
          const blockType = array[x][y][z] ?? MinecraftBlockTypes.air;
          const block: BlockObject = { blockType, x, y, z, };
          if (asyncBlockChecks.every(x => x(block).then(truth => truth))) {
            blocks.place(blockType, new BlockLocation(x + location.x, y + location.y, z + location.z))
          }
        }
  }

  placeCircle(player: Player, size: number = 20) {
    for(let i = 0; i < 360; i++) {
      const offset = playerUtils.getDegreeOffset(i, player.location, size);
      blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset.x, player.location.y, offset.z))
    }
  }

  //some inconsistancy 
  placeCircle2(player: Player, size: number = 20, levels: number = 10) {
      for(let i = 0; i < 360; i++) {
        const offset = playerUtils.getDegreeOffset(i, player.location, size);
        const relativeBlock = new BlockLocation(offset.x, player.location.y, offset.z);
        blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset.x, player.location.y, offset.z));
        for(let j = 0; j < 360; j++) {
          const offset2 = playerUtils.getDegreeOffset(j, relativeBlock, size);
          blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset2.x, player.location.y, offset2.z))
        }
      }
  }

  placeCircle3(player: Player, size: number = 20, levels: number = 10) {
    for(let i = 0; i < 360; i++) {
      const offset = playerUtils.getDegreeOffset(i, player.location, size);
      const relativeBlock = new BlockLocation(offset.x, player.location.y, offset.z);
      blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset.x, player.location.y, offset.z));
      for(let j = 0; j < 360; j++) {
        const offset2 = playerUtils.getDegreeOffset(j, relativeBlock, size);
        blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset2.x, player.location.y + j, offset2.z))
      }
    }
  
}

  placeCircle4(player: Player, size: number = 20, levels: number = 10) {
      for(let i = 0; i < 360; i++) {
        const offset = playerUtils.getDegreeOffset(i, player.location, size);
        const relativeBlock = new BlockLocation(offset.x, player.location.y, offset.z);
        blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset.x, player.location.y, offset.z));
        for(let j = 0; j < 360; j++) {
          const offset2 = playerUtils.getDegreeOffset(j, relativeBlock, size);
          blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset2.x, player.location.y + (j % levels), offset2.z))
        }
      }
  }

  placeCircle5(player: Player, size: number = 20, levels: number = 100) {
    for(let i = 0; i < 360; i++) {
      const offset = playerUtils.getDegreeOffset(i, player.location, size);
      const relativeBlock = new BlockLocation(offset.x, player.location.y, offset.z);
      blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset.x, player.location.y, offset.z));
      for(let j = 0; j < 360; j++) {
        const offset2 = playerUtils.getDegreeOffset(j, relativeBlock, size);
        blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset2.x, player.location.y + (j % levels), offset2.z))
      }
    }
  }

  placeCircle6(player: Player, size: number = 20) {
    for(let i = 0; i < 360; i++) {
      const offset = playerUtils.getDegreeOffset(i, player.location, size);
      const relativeBlock = new BlockLocation(offset.x, player.location.y, offset.z);
      blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset.x, player.location.y, offset.z));
      var height = player.location.y + Math.random() * 100;
      for(let j = 0; j < 360; j++) {
        const offset2 = playerUtils.getDegreeOffset(j, { x: relativeBlock.x + size, z: relativeBlock.z + size }, size);
        blocks.place(MinecraftBlockTypes.dirt, new BlockLocation(offset2.x, height, offset2.z))
      }
    }
  }


}

const blocks = new Blocks();
export default blocks;


// Move out of here
export class Param3D {
  constructor(x: number, y: number = -1, z: number = -1) {
    if (x <= -1) {
      throw new Error("x cannot be negative.")
    }

    this.x = x;
    this.y = y > -1 ? y : x;
    this.z = z > -1 ? z : x;
  }

  x: number;
  y: number;
  z: number;
}