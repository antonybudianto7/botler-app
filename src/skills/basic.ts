import { User } from 'botler';
import { sendToUser } from '../responder';

export function basicSkill(user: User): Promise<User> {
  // decide how to respond based on the users intent
  switch(user.intent.action) {
    case 'hello': // user said hello
      user.state = 'hello';
      return sendToUser('Hi there! Would you like to know the weather?')
        .then(() => user);

    case 'help':  // user asked for help
      user.state = 'help';
      return sendToUser('Hi there! just tell me what city you want to know the weather in...')
        .then(() => user);

    case 'weather': // user asked about the weather but didn't provide a location
      user.state = 'location';
      return sendToUser('What city do you want to know the weather in?')
        .then(() => user);

    case 'yes': // user said yes, check the state of the coversation to figure out what they said yes to
      if (user.state === 'hello') { // user responded yes to 'would you like to know the weather?'
        user.state = 'city';
        return sendToUser('Great, what city?')
          .then(() => user);
      }
      return null; //return null if skill can't process intent;

    case 'no':
      if (user.state === 'hello') { // user responded no to 'would you like to know the weather?'
        user.state = 'none';
        return sendToUser('Why not?')
          .then(() => user);
      }
      return null; //return null if skill can't process intent;

    default:
      return null; //return null if skill can't process intent;
  }
}