import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserCircle,
  Map,
  Vault,
  CreditCard,
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
  { label: "Profile", href: ROUTES.profile, icon: UserCircle },
  { label: "Roadmap", href: ROUTES.roadmap, icon: Map },
  { label: "Vault", href: ROUTES.vault, icon: Vault },
  { label: "Payments", href: ROUTES.payments, icon: CreditCard },
  { label: "Settings", href: ROUTES.settings, icon: Settings },
];

export const marketingNav = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Arc Ecosystem", href: "#arc" },
];
