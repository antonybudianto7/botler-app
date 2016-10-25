import Botler, { User, Intent, defaultReducer } from 'botler';

import { sendToUser } from './src/responder';
import { confusedSkill, basicSkill, weatherSkill } from './src/skills';

const bot = new Botler([`${__dirname}/nlp`]);
console.log('loaded');
// bot.turnOnDebug();

//add skills to bot, skills are run all at once, but prioritized first to last
bot.unshiftSkill(confusedSkill)
  .unshiftSkill(basicSkill)
  .unshiftSkill(weatherSkill)
  // .setReducer(weatherReducer);

function weatherReducer(intents: Array<Intent>): Promise<Intent> {
  // if (this && this.debugOn) console.log('intents:', util.inspect(intents, { depth:null }));

  //if we detect a location, prioritize that intent and return it
  const location = intents.filter(intent => intent.topic === 'location');
  if (location.length > 0) {
    return Promise.resolve(location[0]);
  }

  //otherwise just do the normal thing
  return defaultReducer(intents);
}

function receiveFromUser(user: User, text: string): Promise<User> {
  console.log(`-> ${text}`);
  return bot.processText(user, text);
}

// begin example
const emptyUser: User = bot.createEmptyUser({ apiUserID: 'custom_info' });

receiveFromUser(emptyUser, 'weather london')
  .then((user: User) => {
    console.log(JSON.stringify(user, null, 2))
  })
  // .then((user: User) => {
  //   return receiveFromUser(user, 'london');
  // });