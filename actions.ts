'use server'

export async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  // throw Error
  return message;
}