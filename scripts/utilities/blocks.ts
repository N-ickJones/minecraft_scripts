import { BlockLocation, BlockType, world } from "mojang-minecraft";

class Blocks {
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
            if(callbackConditional(x, y, z))
            blocks.place(blockType, new BlockLocation(x, y, z));
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
    this.y = y > -1 ? y: x;
    this.z = z > -1 ? z: x;
  }
  
  x: number;
  y: number;
  z: number;
}