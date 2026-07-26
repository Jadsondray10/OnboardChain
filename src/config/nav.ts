import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Wallet,
  UserCircle,
  Compass,
  Settings,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNav: NavItem[] = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Wallet", href: ROUTES.wallet, icon: Wallet },
  { label: "Profile", href: ROUTES.profile, icon: UserCircle },
  { label: "Opportunities", href: ROUTES.opportunities, icon: Compass },
  { label: "Settings", href: ROUTES.settings, icon: Settings },
];

export const marketingNav = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Arc Ecosystem", href: "#arc" },
];
