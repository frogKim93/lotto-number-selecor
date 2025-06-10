import {MAX_NUMBER, Table} from "./Table";
import {useEffect, useState} from "react";

interface Props {
    title: string
    columnCounts: number[]
    refreshSummary: () => void
}

export const TableSet = (props: Props) => {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [memo, setMemo] = useState<string>(localStorage.getItem(`${props.title}-memo`) || "");
    const [isEditingMemo, setEditingMemo] = useState<boolean>(false);

    useEffect(() => {
        const savedData = localStorage.getItem(props.title);
        const numbers: number[] = [];

        if (savedData) {
            const savedNumbers: number[] = JSON.parse(savedData) as number[];

            for (let i = 0; i <= MAX_NUMBER; i++) {
                numbers[i] = savedNumbers[i];
            }
        } else {
            for (let i = 0; i <= MAX_NUMBER; i++) {
                numbers[i] = 0;
            }
        }

        setSelectedNumbers(numbers);
    }, []);

    useEffect(() => {
        if (!isEditingMemo && memo) {
            localStorage.setItem(`${props.title}-memo`, memo);
        }
    }, [isEditingMemo]);

    const updateNumber = (value: number, isAdd: boolean) => {
        const updatedNumbers: number[] = [];

        for (let i = 0; i <= MAX_NUMBER; i++) {
            updatedNumbers[i] = selectedNumbers[i];

            if (i === value) {
                updatedNumbers[i] += isAdd ? 1 : -1;
            }
        }

        if (updatedNumbers[value] < 0) {
            updatedNumbers[value] = 0;
        }

        setSelectedNumbers(updatedNumbers);
        localStorage.setItem(props.title, JSON.stringify(updatedNumbers));
        props.refreshSummary();
    }

    const reset = () => {
        const newNumbers = [];
        for (let i = 0; i <= MAX_NUMBER; i++) {
            newNumbers[i] = 0;
        }

        setSelectedNumbers(newNumbers);
        localStorage.removeItem(props.title);
        localStorage.removeItem(`${props.title}-memo`);
        setMemo("");
        props.refreshSummary();
    }

    return (
        <div className="table-set">
            <div className="table-title">
                <span>{props.title}</span>
                <div className="table-memo">
                    {memo && !isEditingMemo && <span>[{memo}]</span>}
                    {isEditingMemo &&
                        <input type="text" defaultValue={memo} onChange={e => setMemo(e.currentTarget.value)}/>}
                    <button onClick={() => setEditingMemo(!isEditingMemo)}>{memo === "" ? '메모 등록' : '메모 수정'}</button>
                </div>
            </div>
            <div className="tables">
                {props.columnCounts.map(count => {
                    return (
                        <Table key={count} selectedNumbers={selectedNumbers} columnCount={count}
                               selectNumber={value => updateNumber(value, true)}
                               unselectNumber={value => updateNumber(value, false)}/>
                    )
                })}
            </div>
            <button onClick={() => reset()}>
                초기화
            </button>
        </div>
    )
}