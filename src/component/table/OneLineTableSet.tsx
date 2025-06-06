import {MAX_NUMBER, Table} from "./Table";
import {useEffect, useState} from "react";

const LINE_COUNT = 10;

export const OneLineTableSet = () => {
    const [numberList, setNumberList] = useState<number[][]>([]);

    useEffect(() => {
        const savedData = localStorage.getItem("one-line");
        const numbers: number[][] = [];

        if (savedData) {
            const savedNumbers: number[][] = JSON.parse(savedData) as number[][];

            for (let i = 0; i <= LINE_COUNT; i++) {
                numbers[i] = savedNumbers[i];
            }
        } else {
            for (let i = 0; i <= LINE_COUNT; i++) {
                numbers[i] = [];

                for (let j = 0; j <= MAX_NUMBER; j++) {
                    numbers[i][j] = 0;
                }
            }
        }

        setNumberList(numbers);
    }, []);

    const selectNumber = (index: number, value: number) => {
        setNumberList(numberList.map((numbers, listIndex) => {
            if (listIndex === index) {
                numbers[value]++;
            }

            return numbers;
        }));
    }

    const reset = () => {
        window.location.reload();
    }

    return (
        <div>
            {numberList.map((numbers, index) => {
                return (
                    <Table key={index} columnCount={45} selectedNumbers={numbers}
                           selectNumber={v => selectNumber(index, v)} unselectNumber={() => {
                    }}/>
                )
            })}

            <button onClick={() => reset()}>전체 초기화</button>
        </div>
    )
}