import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {MAX_NUMBER} from "./table/Table";

interface Props {
    tableNames: string[]
}

export const Summary = forwardRef((props: Props, ref) => {
    const [numbers, setNumbers] = useState<number[]>([]);

    useEffect(() => {
        refresh();
    }, []);

    useImperativeHandle(ref, () => ({
        refresh,
    }));

    const refresh = () => {
        const newNumbers: number[] = [];

        for (let i = 0; i <= MAX_NUMBER; i++) {
            newNumbers[i] = 0;
        }

        props.tableNames.forEach(title => {
            const foundData = localStorage.getItem(title);

            if (foundData) {
                const foundNumbers = JSON.parse(foundData) as number[];

                for (let i = 0; i < foundNumbers.length; i++) {
                    newNumbers[i] += foundNumbers[i];
                }
            }
        });

        setNumbers(newNumbers);
    }

    const getBallColor = (index: number) => {
        if (index < 10) {
            return "yellow";
        } else if (index < 20) {
            return "blue";
        } else if (index < 30) {
            return "red";
        } else if (index < 40) {
            return "black";
        } else {
            return "green";
        }
    }

    const resetAll = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="summary">
            <div className="number-balls">
                {numbers.map((number, index) => {
                    if (number > 0) {
                        return (
                            <div className={`number-ball ${getBallColor(index)}`}>
                                {index}번
                                <div className="ball-count">
                                    {number}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <button onClick={() => resetAll()}>
                전체 초기화
            </button>
        </div>
    )
});