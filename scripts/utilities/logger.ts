import { world } from "mojang-minecraft";

class Logger {
  say(message: string, description: string = "") {
    if (message && description) {
      world.getDimension("overworld").runCommand(`say ${message}: ${description}`);
    }
    else {
      world.getDimension("overworld").runCommand(`say ${message}`);
    }
  }
}
const logger = new Logger();
export default logger;