type Currency = "BTC" | "DAG" | "ETH" | "EUR" | "GBP" | "USD";

export interface UserInput {
  amount: number;
  isSplit: boolean;
  splitPeople?: number;
  tipPercentage: number;
  currency?: Currency;
}

function sortAlphabetically(arr: string[]): string[] {
  return arr.sort((a, b) => a.localeCompare(b));
}

console.log(
  sortAlphabetically(["EUR", "USD", "GBP", "ETH", "DAG", "BTC"])
    .map((c) => `"${c}"`)
    .join("|")
);
