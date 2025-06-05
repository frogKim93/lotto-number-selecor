export const GetNumbers = (maxNumber: number, columnCount: number) => {
    const numbers: number[][] = [];

    for (let i = 0; i < maxNumber; i++) {
        const rowIndex = Math.floor(i / columnCount);

        if (!numbers[rowIndex]) {
            numbers[rowIndex] = [];
        }

        numbers[rowIndex][i] = i + 1;
    }

    return numbers;
}