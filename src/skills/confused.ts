import { User } from 'botler';
import { sendToUser } from '../responder';

export function confusedSkill(user: User): Promise<User> {
  // console.log(`I'm confused, user intent was ${user.intent.action}`);
  return sendToUser('I\'m confused')
    .then(() => user);
}