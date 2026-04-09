"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Inbox,
  User,
  ChartBarStacked,
  Ticket,
  Settings,
  MessageCircle,
  Store,
  Hammer,
  ChevronDown,
  Wallet,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const menuGroups = [
  {
    group: "Dashboard",
    items: [
      { title: "Control", url: "/control", icon: Home },
      { title: "System", url: "/system", icon: Settings },
    ],
  },
  {
    group: "Management",
    icon: Inbox,
    isCollapsible: true,
    items: [
      { title: "Add Products", url: "/add-products", icon: Inbox },
      { title: "Add Category", url: "/add-category", icon: ChartBarStacked },
      { title: "Add Coupon", url: "/add-coupon", icon: Ticket },
      { title: "Check Transaction", url: "/check-transaction", icon: Wallet },
    ],
  },
  {
    group: "Navigation",
    icon: Inbox,
    isCollapsible: true,
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Products", url: "/products", icon: ChartBarStacked },
      { title: "Category", url: "/category", icon: Ticket },
      { title: "Coupon", url: "/coupon", icon: Wallet },
    ],
  },
  {
    group: "User & Tools",
    icon: User,
    isCollapsible: true,
    items: [
      { title: "Admin Tools", url: "/admin-tool", icon: Hammer },
      { title: "Chat", url: "/customer-service", icon: MessageCircle },
    ],
  },
];
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/control">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Store className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">Voca Store</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <SidebarGroup key={group.group}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.isCollapsible ? (
                    <Collapsible className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={group.group}>
                            {GroupIcon && <GroupIcon className="size-5" />}

                            <span>{group.group}</span>
                            <ChevronDown
                              className="ml-auto h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible:rotate-180"
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                          <SidebarMenuSub>
                            {group.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                                  <Link href={item.url}>{item.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}