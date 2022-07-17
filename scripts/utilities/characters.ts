import { BlockLocation, BlockType } from "mojang-minecraft";
import blocks from "./blocks";

export default class Characters {
  constructor(
   blockType: BlockType,
   size: number = 5
  ) {
    this.blockType = blockType;
    this.size = size;
   }

  blockType: BlockType;
  size: number;

  D(location: BlockLocation) {
    const xEnd = location.x + this.size - 1;
    const yEnd = location.y + this.size - 1;
    this.makeLetter(location, (x, y) => {
      return (x === xEnd || x === xEnd - 1 || x === location.x || y === location.y || y === yEnd)
    })
  }

  E(location: BlockLocation) {
    const xEnd = location.x + this.size - 1;
    const yEnd = location.y + this.size - 1;
    const yMiddle = location.y + Math.floor(this.size / 2);
    this.makeLetter(location, (x, y) => {
      return (x === xEnd || (y === yEnd || y === location.y || y === yMiddle))
    })
  }

  H(location: BlockLocation) {
    const yMiddle = location.y + Math.floor(this.size / 2);
    const xEnd = location.x + this.size - 1;
    this.makeLetter(location, (x, y) => {
      return (x === location.x || x === xEnd|| y === yMiddle)
    })
  }

  L(location: BlockLocation) {
    const xEnd = location.x + this.size - 1;
    this.makeLetter(location, (x, y) => {
      return (x === xEnd || y === location.y)
    })
  }

  M(location: BlockLocation) {
    const xEnd = location.x + this.size - 1;
    const xMiddle = location.x + Math.floor(this.size / 2);
    const yEnd = location.y + this.size - 1;
    this.makeLetter(location, (x, y) => {
      return (x === xEnd || x === xMiddle || x === location.x || y === yEnd)
    })
  }


  O(location: BlockLocation) {
    const xEnd = location.x + this.size - 1;
    const yEnd = location.y + this.size - 1;
    this.makeLetter(location, (x, y) => {
      return (x === xEnd || x === location.x || y === location.y || y === yEnd)
    })
  }

  R(location: BlockLocation) {
    const xMiddle = location.x + Math.floor(this.size / 2);
    const yMiddle = location.y + Math.floor(this.size / 2);
    const yEnd = location.y + this.size - 1;
    const xEnd = location.x + this.size - 1;
    this.makeLetter(location, (x, y) => {
      return (x === xEnd
        || y === yEnd
        || (x === location.x && y >= yMiddle)
        || (x <= xMiddle && y === yMiddle)
        || (x === xMiddle - 1 && y < yMiddle)
        || (x === xMiddle - 2 && y === yMiddle - 2))
    })
  }

  W(location: BlockLocation) {
    const xEnd = location.x + this.size - 1;
    const xMiddle = location.x + Math.floor(this.size / 2);
    this.makeLetter(location, (x, y) => {
      return (x === xEnd || x === xMiddle || x === location.x || y === location.y)
    })
  }

  makeLetter(location: BlockLocation, callbackConditional: (x: number, y: number) => boolean) {
    for (let x = location.x; x < location.x + this.size; x++)
      for (let y = location.y; y < location.y + this.size; y++)
        if(callbackConditional(x, y))
          for (let z = location.z; z < location.z + this.size; z++)
            blocks.place(this.blockType, new BlockLocation(x, y, z));
  }

}