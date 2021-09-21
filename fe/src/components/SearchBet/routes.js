import SearchBet from "./searchBet";
import Result from "./result";


const searchFlowRoutes = [
    {
        path: "admin/search",
        component: SearchBet,
    },
    {
        path: "admin/result",
        component: Result,
    },
    {},
];

export default searchFlowRoutes;
