import { BlockLocation, ChatEvent, MinecraftBlockTypes, world } from "mojang-minecraft";
import Characters from "../utilities/characters";

const characters = new Characters(MinecraftBlockTypes.dirt, 5);
const overworld = world.getDimension("overworld");

world.events.chat.subscribe((e: ChatEvent) => {
  if (e.message === "build") {
    try {
      build(e);
    }
    catch (e) {
      overworld.runCommand(`say ${e}`);
    }
  }
})

function build(e: ChatEvent) {
  const player = e.sender;
  const location = player.location;
  const startingBlock = new BlockLocation(location.x + 5, location.y, location.z);
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
  helloWord.forEach((fnc) => {
    fnc(currentLocation);
    currentLocation = offsetLetter(currentLocation);
  });
  currentLocation = offsetWord(currentLocation);
  worldWord.forEach((fnc) => {
    fnc(currentLocation);
    currentLocation = offsetLetter(currentLocation);
  });
}

function offsetLetter(current: BlockLocation) {
  // size (5) + offset (2) = 7
  return new BlockLocation(current.x - 7, current.y, current.z)
}

function offsetWord(current: BlockLocation) {
  return new BlockLocation(current.x - 2, current.y, current.z);
}