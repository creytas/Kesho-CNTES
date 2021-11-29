import { Icon } from "@iconify/react";
import stock from "@iconify/icons-ant-design/stock-outlined";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Accueil",
    path: "/dashboard/app",
    icon: getIcon(`bx:bx-home-smile`),
  },
  {
    title: "Patients",
    path: "/dashboard/patient",
    icon: getIcon(`carbon:pedestrian-child`),
  },
  {
    title: "Stocks",
    path: "/dashboard/stock",
    icon: getIcon(`akar-icons:arrow-up-down`),
  },
  {
    title: "Personnels",
    path: "/dashboard/personnel",
    icon: getIcon(`maki:doctor`),
  },
];

export default sidebarConfig;
