import { BlockLocation, MinecraftBlockTypes, Player } from "mojang-minecraft";
import Characters from "../utilities/characters";

const size = 5;
const offset = 2;
const characters = new Characters(MinecraftBlockTypes.dirt, size);

export default function helloWorld(player: Player) {
  const location = player.location;
  const startingBlock = new BlockLocation(location.x + size, location.y, location.z);
  let currentLocation = startingBlock;
  const helloWord = [
    (b: BlockLocation) => characters.H(b),
    (b: BlockLocation) => characters.E(b),
    (b: BlockLocation) => characters.L(b),
    (b: BlockLocation) => characters.L(b),
    (b: BlockLocation) => characters.O(b),
  ]
  const worldWord = [
    (b: BlockLocation) => characters.W(b),
    (b: BlockLocation) => characters.O(b),
    (b: BlockLocation) => characters.R(b),
    (b: BlockLocation) => characters.L(b),
    (b: BlockLocation) => characters.D(b),
  ]
  helloWord.forEach((callback) => {
    callback(currentLocation);
    currentLocation = offsetLetter(currentLocation);
  });
  currentLocation = offsetWord(currentLocation);
  worldWord.forEach((callback) => {
    callback(currentLocation);
    currentLocation = offsetLetter(currentLocation);
  });
}

function offsetLetter(current: BlockLocation) {
  return new BlockLocation(current.x - size - offset, current.y, current.z)
}

function offsetWord(current: BlockLocation) {
  return new BlockLocation(current.x - offset, current.y, current.z);
}
