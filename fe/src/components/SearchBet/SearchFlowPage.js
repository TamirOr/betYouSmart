import React, {Fragment, useState} from "react";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import SearchBet from "./searchBet";
import Result from "./result";

export const SearchContext = React.createContext({
    paramType: "",
    setParamType: () => {
    },
    val: "",
    setValue: () => {
    },
});

function SearchFlowPage() {
    const [paramType, setParamType] = useState("");
    const [val, setValue] = useState("");

    return (
        <SearchContext.Provider
            value={{
                paramType, setParamType, val, setValue,
            }}
        >
            <Fragment>
                <Router>
                    <Switch>
                        <Route path="/admin/search">
                            <SearchBet/>
                        </Route>
                        <Route path="/admin/result">
                            <Result/>
                        </Route>
                    </Switch>
                </Router>
            </Fragment>
        </SearchContext.Provider>
    );
}

export default SearchFlowPage;
