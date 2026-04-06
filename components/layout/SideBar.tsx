import { Home, Inbox, User, ChartBarStacked, Ticket } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserItem } from "./UserItem"

const items = [
  { title: "Control", url: "/control", icon: Home },
  { title: "Add Products", url: "/add-products", icon: Inbox },
  { title: "Check Products", url: "/check-products", icon: User },
  { title: "Add Category", url: "/add-category", icon: ChartBarStacked },
  { title: "Add Coupon", url: "/add-coupon", icon: Ticket },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon"> {/* Opsi "icon" akan menyisakan icon saat ditutup */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Voca Store</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <UserItem /> {/* UserItem sekarang otomatis di paling bawah */}
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
    </Sidebar>
  )
}