import React, {useRef} from 'react';
import "./App.css";
import {TableSet} from "./component/table/TableSet";
import {Summary} from "./component/Summary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { OneLineTableSet } from './component/table/OneLineTableSet';

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
            <BrowserRouter>
                <Routes>
                    <Route path="/one-line" element={<OneLineTableSet/>}/>
                    <Route path="/*" element={
                        <>
                            {getTableSetNames().map(name => {
                                return (
                                    <TableSet key={name} title={name} columnCounts={[7, 9, 10]}
                                              refreshSummary={() => summaryRef.current!.refresh()}/>
                                )
                            })}
                            <Summary ref={summaryRef} tableNames={getTableSetNames()}/>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
