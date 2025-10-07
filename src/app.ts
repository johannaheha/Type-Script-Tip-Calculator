import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function main() {
  const rl = readline.createInterface({ input, output });
  console.log("--- Tip Calculator ---");
  const amountStart = await rl.question("How high is the check?");
  const amount = Number(amountStart.replace(",", "."));
  if (Number.isNaN(amount) || amount <= 0) {
    console.log("Invalid amount!");
    rl.close();
    return;
  }

  const tipString = await rl.question("What percentage of tip will you give?");
  const tipPercentage: number = Number(tipString.replace(",", "."));
  if (Number.isNaN(tipPercentage) || amount < 0) {
    console.log("Invalid tip percentage!");
    rl.close();
    return;
  }

  const splitString = (
    await rl.question("Should the bill be split among multiple people? (y/n)")
  ).toLowerCase();
  const validAnswer = ["y", "yes", "n", "no"].includes(splitString);

  if (!validAnswer) {
    console.log("Invalid answer! Please enter 'y' or 'n'.");
    rl.close();
    return;
  }
  const isDivided = ["y", "yes"].includes(splitString);
  let splitByAmountPeople = 1;

  if (isDivided) {
    const peopleStr = await rl.question(
      "How many people will split the bill?: "
    );
    splitByAmountPeople = parseInt((peopleStr ?? "").trim(), 10);
    if (!Number.isInteger(splitByAmountPeople) || splitByAmountPeople < 2) {
      console.log("Invalid number of people!");
      rl.close();
      return;
    }
  }

  const tipAmount = amount * (tipPercentage / 100);

  const totalBill = amount + tipAmount;

  console.log(`\nCheck Amount: $${amount}`);
  console.log(`Tip Percentage: ${tipPercentage.toFixed(2)}%`);
  console.log(`Tip Amount: $${tipAmount}`);
  console.log(`Total Bill: $${totalBill}`);
  console.log(`Divide among people:${isDivided ? "y" : "n"}`);

  if (isDivided) {
    const eachPersonPays = totalBill / splitByAmountPeople;
    console.log(`Split between how many people: ${splitByAmountPeople}`);
    console.log(`Each person pays: ${eachPersonPays.toFixed(2)}`);
  }

  console.log("-----------------------------");
  rl.close();
}
main();
