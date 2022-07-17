import { BlockLocation, BlockType, world } from "mojang-minecraft";

class Blocks {
  place(type: BlockType, location: BlockLocation) {
    world.getDimension("overworld").getBlock(location).setType(type);
  }
}

const blocks = new Blocks();
export default blocks;