"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Plug,
  BookOpen,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  Plus,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCompanies } from "@/hooks/use-companies";
import { useDashboards } from "@/hooks/use-dashboards";
import { CreateDashboardModal } from "@/components/dashboard/create-dashboard-modal";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboards", icon: LayoutDashboard },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { data: companies } = useCompanies();
  const { data: dashboards } = useDashboards();

  const user = session?.user;
  const { theme, setTheme } = useTheme();

  return (
    <>
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b gap-2">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-sidebar-foreground truncate">EOS</span>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-3">
          <nav className="px-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {!collapsed && companies && companies.length > 0 && (
            <>
              <Separator className="my-3 mx-2" />
              <div className="px-4 mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Companies
                </p>
              </div>
              <nav className="px-2 space-y-1">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground"
                  >
                    <Building2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="truncate">{company.name}</span>
                  </div>
                ))}
              </nav>
            </>
          )}

          {!collapsed && dashboards && dashboards.length > 0 && (
            <>
              <Separator className="my-3 mx-2" />
              <div className="px-4 mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Dashboards
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => setCreateModalOpen(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <nav className="px-2 space-y-1">
                {dashboards.slice(0, 6).map((dashboard) => {
                  const isActive = pathname === `/dashboard/${dashboard.id}`;
                  return (
                    <Link
                      key={dashboard.id}
                      href={`/dashboard/${dashboard.id}`}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <div className="h-2 w-2 rounded-full bg-primary/60 flex-shrink-0" />
                      <span className="truncate">{dashboard.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </>
          )}
        </ScrollArea>

        {/* Footer — user menu */}
        <div className="border-t p-3 flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={user?.image ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {getInitials(user?.name ?? user?.email ?? "U")}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <span className="text-sm text-sidebar-foreground truncate">
                    {user?.name ?? user?.email}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </aside>

      <CreateDashboardModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </>
  );
}
