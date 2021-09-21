import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const createFlowRoutes = [
  {
    path: "admin/step1",
    component: Step1,
  },
  {
    path: "admin/step2",
    component: Step2,
  },
  {
    path: "admin/created",
    component: Step3,
  },
];

export default createFlowRoutes;
