import { User } from 'botler';
import { sendToUser } from '../responder';

export function weatherSkill(user: User): Promise<User> {
  const weather = ['sunny', 'rainy', 'cloudy'];

  if (user.intent.topic === 'location') {
    const city = user.intent.action.replace('_', ' ');

    user.state = 'none';
    return sendToUser(`the weather in ${city} will be ${weather[Math.floor(Math.random()*weather.length)]}`)
      .then(() => user);
    /// weatherAPI(city)
    ///  .then(forecast => sendToUser(`forecase is ${forecast}`))
    ///  .then(() => user);
  }

  if (user.intent.topic === 'details' && user.intent.details.value.toString().length === 5) {
    const zip = user.intent.details.value;
    user.state = 'none';
    return sendToUser(`the weather at ${zip} will be ${weather[Math.floor(Math.random()*weather.length)]}`)
      .then(() => user);
  }

  return null;  //return null if skill can't process intent;
}