export function sendToUser(text: string): Promise<void> {
  console.log(`<- ${text}`);
  return Promise.resolve();
}
