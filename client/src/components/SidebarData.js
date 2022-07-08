import EmployeePay from "./EmployeePay";
import Timesheet from "./Timesheet";
import Notification from "./Notification";

export const SidebarData = [
  {
    title: "Employee Payroll",
    icon: "fas fa-money-bill",
    link: "/",
    component: EmployeePay,
  },
  {
    title: "Timesheet",
    icon: "far fa-calendar-alt",
    link: "/timesheet",
    component: Timesheet,
  },
  {
    title: "Notification",
    icon: "far fa-bell",
    link: "/notification",
    component: Notification,
  },
];
