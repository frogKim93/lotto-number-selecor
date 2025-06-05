import React, {useRef} from 'react';
import "./App.css";
import {TableSet} from "./component/table/TableSet";
import {Summary} from "./component/Summary";

const DEFAULT_SET_COUNT = 10;

function App() {
    const summaryRef = useRef<{ refresh: () => void }>(null);

    const getTableSetNames = () => {
        const names: string[] = [];

        for (let i = 1; i <= DEFAULT_SET_COUNT; i++) {
            names.push(`세트-${i}`);
        }

        return names;
    }

    return (
        <div className="App">
            {getTableSetNames().map(name => {
                return (
                    <TableSet key={name} title={name} columnCounts={[7, 9, 10]}
                              refreshSummary={() => summaryRef.current!.refresh()}/>
                )
            })}
            <Summary ref={summaryRef} tableNames={getTableSetNames()}/>
        </div>
    );
}

export default App;
