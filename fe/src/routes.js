import Dashboard from "@material-ui/icons/Dashboard";

import SearchBet from "./components/SearchBet/searchBet.js";
import {
    AccountBalanceWallet,
    Explore,
    QuestionAnswer,
    Search,
} from "@material-ui/icons";
import CreateFlowPage from "./components/CreateFlowPage/CreateFlowPage";
import MyBets from "./components/MyBets/myBets";
import Wallet from "./components/Wallet/Wallet"
import SearchFlowPage from "./components/SearchBet/SearchFlowPage";

const dashboardRoutes = [
    {
        path: "/create/step1",
        name: "Create New Bet",
        icon: Dashboard,
        component: CreateFlowPage,
        layout: "/admin",
    },
    {
        path: "/my_bets",
        name: "All My Bets",
        icon: "content_paste",
        component: MyBets,
        layout: "/admin",
    },
    {
        path: "/search",
        name: "Search Bets",
        icon: Search,
        component: SearchFlowPage,
        layout: "/admin",
    },
    {
        path: "/wallet",
        name: "Create New Wallet",
        icon: AccountBalanceWallet,
        component: Wallet,
        layout: "/admin",
    },
    {
        path: "/about_us",
        name: "About Us",
        icon: QuestionAnswer,
        component: SearchBet,
        layout: "/admin",
    },
    {
        path: "/faq",
        name: "FAQ",
        icon: Explore,
        component: SearchBet,
        layout: "/admin",
    },
];

export default dashboardRoutes;
