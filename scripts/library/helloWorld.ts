import { BlockLocation, MinecraftBlockTypes, Player } from "mojang-minecraft";
import Characters from "../utilities/characters";
import playerUtils from "../utilities/playerUtils";

const size = 5;
const offset = 2;
const characters = new Characters(MinecraftBlockTypes.dirt, size);

export default function helloWorld(player: Player) {
  let location = playerUtils.getPlayerDirectionBlockExact(player);
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
    callback(location);
    location = offsetLetter(location);
  });
  location = offsetWord(location);
  worldWord.forEach((callback) => {
    callback(location);
    location = offsetLetter(location);
  });
}

function offsetLetter(current: BlockLocation) {
  return new BlockLocation(current.x - size - offset, current.y, current.z)
}

function offsetWord(current: BlockLocation) {
  return new BlockLocation(current.x - offset, current.y, current.z);
}
