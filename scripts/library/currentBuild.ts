import { Player } from "mojang-minecraft";
import blocks from "../utilities/blocks";

export default function currentBuild(player: Player) {
  blocks.placeCircle6(player, 20);
}

// function fill3dArray(blockType: MinecraftBlockTypes = MinecraftBlockTypes.air, x: number = 10, y: number = x, z: number = y): BlockType[][][] {
//   return new Array(x)
//     .fill(new Array(y)
//       .fill(new Array(z)
//         .fill(blockType)));
// }

// function customArray(): BlockType[][][] {
//   const dia = MinecraftBlockTypes.diamondBlock;
//   const air = MinecraftBlockTypes.air;
//   const dir = MinecraftBlockTypes.dirt;
//   return [
//     [ 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia] 
//     ],
//     [ 
//       [air, dir, air], 
//       [air, dir, air], 
//       [air, dir, air], 
//       [air, dir, air], 
//       [air, dir, air], 
//       [air, dir, air] 
//     ],
//     [ 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia], 
//       [dia, air, dia] 
//     ]
//   ];
// }