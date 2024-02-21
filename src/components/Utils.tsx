import { MAX_POSITION } from "./Constants";

export function getRandom(currentNum: number): number {
    let newNum = Math.floor(Math.random() * MAX_POSITION);
    return newNum != currentNum ? newNum : getRandom(newNum);
}