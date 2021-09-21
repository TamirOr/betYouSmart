import React, { Fragment, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export const FlowContext = React.createContext({});

function CreateFlowPage() {
  const [sport, setSport] = useState("");
  const [league, setLeague] = useState("");
  const [date, setDate] = useState("");
  const [game, setGame] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [budget, setBudget] = useState("");
  const [guess, setGuess] = useState("");
  const [ratio, setRatio] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <FlowContext.Provider
      value={{
        sport,
        setSport,
        league,
        setLeague,
        date,
        setDate,
        game,
        setGame,
        privacy,
        setPrivacy,
        budget,
        setBudget,
        guess,
        setGuess,
        ratio,
        setRatio,
        walletAddress,
        setWalletAddress,
      }}
    >
      <Fragment>
        <Router>
          <Switch>
            <Route path="/admin/create/step1">
              <Step1 />
            </Route>
            <Route path="/admin/create/step2">
              <Step2 />
            </Route>
            <Route path="/admin/create/created">
              <Step3 />
            </Route>
          </Switch>
        </Router>
      </Fragment>
    </FlowContext.Provider>
  );
}

export default CreateFlowPage;
