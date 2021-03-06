import { world, ChatEvent, Player } from 'mojang-minecraft';
import currentBuild from './library/currentBuild';
import helloWorld from './library/helloWorld';
import makeBuilding from './library/makeBuilding';
import logger from './utilities/logger';

world.events.chat.subscribe((chatEvent: ChatEvent) => {
  try {
    const playerEvent = getEvent(chatEvent.message);
    if(playerEvent) {
      playerEvent(chatEvent.sender) 
      logger.say('player_event', `executed ${chatEvent.message} action.`);
    } 
  }
  catch(e: any) {
    logger.say(chatEvent.message, e);
  }
})

 function getEvent(message: string): ((player: Player) => void) | undefined {
  switch (message) {
    case "build": return currentBuild;
    case "makeBuilding": return makeBuilding;
    case "helloWorld": return helloWorld;
    default: return undefined;
  }
}