import { Player, BlockLocation } from "mojang-minecraft";
import logger from "./logger";

// export enum CardinalDirection {
//   North,
//   East,
//   South,
//   West
// }

export type RelativeBlock = { x: number, z: number };
export type RelativeCords = { x: number, y: number };

export class PlayerUtils {
  
  
  getPlayerDirectionBlockExact(player: Player, offsetSize: number = 20): BlockLocation {
    const location = { x: player.location.x, z: player.location.z };
    const offset = this.getDegreeOffset(player.rotation.y, location);
    return new BlockLocation(offset.x, player.location.y, offset.z);
  }

  getDegreeOffset(degree: number, location: RelativeBlock = { x: 0, z: 0 }, offsetAmount: number = 20): RelativeBlock  {
    const cords = this.getRotationCoordinates(degree);
    const xOffsetAmmount = cords.y * offsetAmount * -1;
    const zOffsetAmmount = cords.x * offsetAmount;
    return { x: location.x + xOffsetAmmount, z: location.z + zOffsetAmmount }
  }

  getDegreeOffset2(degree: number, location: RelativeBlock = { x: 0, z: 0 }, offsetAmount: number = 20): RelativeBlock  {
    const cords = this.getRotationCoordinates(degree);
    const xOffsetAmmount = cords.y * offsetAmount * -1;
    const zOffsetAmmount = cords.x * offsetAmount;
    return { x: location.x + xOffsetAmmount, z: location.z + zOffsetAmmount }
  }

  getRotationCoordinates(degree: number): RelativeCords {
    const degree360 = this.convertTo360Format(degree);
    const radians = this.degreesToRadians(degree360);
    return { x: Math.cos(radians), y: Math.sin(radians) }
  }
  
  // Converts from -180:0 to 180:360 degrees
  convertTo360Format(d: number) {
    return d < 0 ? 360 + d : d;
  }
  
  degreesToRadians(degree: number) {
    return degree * (Math.PI / 180);
  }

  // getPlayerDirectionBlockWithCardinal(player: Player, offset = 20): BlockLocation {
  //   const cardinalDirection = this.getCardinalDirection(player.rotation.y);
  //   logger.say(`x: ${player.rotation.x}, y: ${player.rotation.y}, direction: ${CardinalDirection[cardinalDirection]};`)
  //   switch (cardinalDirection) {
  //     case CardinalDirection.North: return new BlockLocation(player.location.x, player.location.y, player.location.z + Math.abs(offset));
  //     case CardinalDirection.East: return new BlockLocation(player.location.x - Math.abs(offset), player.location.y, player.location.z);
  //     case CardinalDirection.South: return new BlockLocation(player.location.x, player.location.y, player.location.z - Math.abs(offset));
  //     case CardinalDirection.West: return new BlockLocation(player.location.x +  Math.abs(offset), player.location.y, player.location.z);
  //     default: return new BlockLocation(player.location.x, player.location.y, player.location.z);
  //   }
  // }
  
  // getCardinalDirection(y: number): CardinalDirection {
  //   if (y >= -135 && y <= -45) return CardinalDirection.West;
  //   if (y >= -45 && y <= 45) return CardinalDirection.North;
  //   if (y >= 45 && y <= 135) return CardinalDirection.East;
  //   if (y >= 135 || y <= -135) return CardinalDirection.South;
  //   throw new Error("Invalid y axis.")
  // }
  

}

const playerUtils = new PlayerUtils();
export default playerUtils;