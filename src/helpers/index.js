export const randomNumberGenerate = (minMax) => {
    let rand = minMax[0] + Math.random() * (minMax[1] + 1 - minMax[0]);
    return Math.floor(rand);
}