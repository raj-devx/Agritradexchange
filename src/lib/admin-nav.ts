import {
  LayoutDashboard,
  Sprout,
  Building2,
  ClipboardList,
  MessageSquare,
  Workflow,
  Tag,
  PackageCheck,
  Warehouse,
  Truck,
  Wallet,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = { href: string; label: string; icon: LucideIcon };

// Modules backed by real data in V1.
export const ADMIN_NAV_LIVE: AdminNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/farmers", label: "Farmers & Supply", icon: Sprout },
  { href: "/admin/buyers", label: "Buyers", icon: Building2 },
  { href: "/admin/requirements", label: "Demand", icon: ClipboardList },
  { href: "/admin/matching", label: "Matching Engine", icon: Workflow },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

// Remaining modules from the blueprint — scaffolded, built out in V2.
export const ADMIN_NAV_PLANNED: AdminNavItem[] = [
  { href: "/admin/price", label: "Price Management", icon: Tag },
  { href: "/admin/procurement", label: "Procurement Orders", icon: PackageCheck },
  { href: "/admin/collection", label: "Collection Centres", icon: Warehouse },
  { href: "/admin/logistics", label: "Logistics", icon: Truck },
  { href: "/admin/finance", label: "Finance", icon: Wallet },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export const ADMIN_NAV_ALL = [...ADMIN_NAV_LIVE, ...ADMIN_NAV_PLANNED];
