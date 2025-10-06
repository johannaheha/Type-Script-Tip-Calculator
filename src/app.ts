import type { UserInput } from "./types";

import readline from "readline";
import { stdin as input, stdout as output } from "process";

async function ask(question: string): Promise<string> {
  const rl = readline.createInterface({ input, output });
  return new Promise((resolve) =>
    rl.question(question, (answer: any) => {
      rl.close();
      resolve(answer);
    })
  );
}

async function collectUserInput(): Promise<UserInput> {
  const amount = Number(await ask("How high is the check?"));
  const tipPercentage = Number(
    await ask("What percentage tip would you like to give?")
  );
  const isSplit =
    "Yes" == (await ask("Should the bill be split among multiple people? "));
  if (isSplit) {
    const splitPeople = Number(
      await ask("How many people will split the bill?")
    );
    return { amount, isSplit, splitPeople, tipPercentage };
  } else {
    return { amount, isSplit, tipPercentage };
  }
}

// let input: UserInput = {
//   amount: 100,
//   isSplit: true,
//   splitPeople: 4,
//   tipPercentage: 15,
//   currency: "EUR",
// };

// function processBill(input: UserInput) {
//   let total = input.amount + (input.amount * input.tipPercentage) / 100;
// }

(async () => {
  const UserInput = await collectUserInput();
  console.log(UserInput);
})();
