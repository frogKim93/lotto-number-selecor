import {useState} from "react";
import {GetNumbers} from "../../utils/TableCalculator";

interface Props {
    columnCount: number
    selectedNumbers: number[]
    selectNumber: (value: number) => void
    unselectNumber: (value: number) => void
}

export const MAX_NUMBER: number = 45;

export const Table = (props: Props) => {
    const [numbers] = useState<number[][]>(GetNumbers(MAX_NUMBER, props.columnCount));

    return (
        <table className="number-table">
            <tbody>
            {numbers.map((line, index) => {
                return (
                    <tr key={index}>
                        {line.map(number => {
                            return (
                                <td onClick={() => props.selectNumber(number)} onContextMenu={e => {
                                    e.preventDefault();
                                    props.unselectNumber(number);
                                }} key={number} className={`${props.selectedNumbers[number] > 0 && "select"}`}>
                                    {number}
                                    {props.selectedNumbers[number] > 1 && (
                                        <div className="multi-select">
                                            {props.selectedNumbers[number]}
                                        </div>
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}