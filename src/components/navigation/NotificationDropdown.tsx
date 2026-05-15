// src/components/navigation/NotificationDropdown.tsx
"use client";

import { Bell } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationDropdown() {
  // Mock data for now
  const notifications = [
    { id: 1, title: "Price Update", description: "Steel prices increased by 5% in Colombo district.", time: "2h ago", unread: true },
    { id: 2, title: "New Supplier", description: "Holcim Lanka is now a verified supplier.", time: "5h ago", unread: true },
    { id: 3, title: "RFQ Response", description: "You have a new quote for heavy machinery.", time: "1d ago", unread: false },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative w-10 h-10 flex items-center justify-center bg-surface-variant/30 hover:bg-surface-variant/50 rounded-full transition-all group outline-none">
          <Bell className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-container border-2 border-white rounded-full"></span>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-[360px] p-0 rounded-sm border-surface-variant shadow-[0_20px_70px_rgba(0,0,0,0.15)] overflow-hidden bg-white z-[100] mt-2"
      >
        <DropdownMenuLabel className="px-5 py-5 bg-white border-b border-surface-variant/50">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-secondary">Notifications</span>
            <button className="text-[9px] font-black text-primary-container uppercase tracking-widest cursor-pointer hover:underline">
              Mark all as read
            </button>
          </div>
        </DropdownMenuLabel>
        
        <ScrollArea className="h-[400px] bg-white">
          <div className="flex flex-col">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <DropdownMenuItem 
                  key={notif.id} 
                  className="flex flex-col items-start gap-1 p-6 border-b border-surface-variant/30 cursor-pointer bg-white focus:bg-surface transition-colors rounded-none last:border-none relative"
                >
                  <div className="flex items-center gap-2 w-full">
                    {notif.unread && <span className="w-1.5 h-1.5 bg-primary-container rounded-full" />}
                    <span className="text-[11px] font-black uppercase tracking-widest text-secondary">{notif.title}</span>
                    <span className="ml-auto text-[9px] font-bold text-secondary/30 uppercase">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-secondary/60 leading-relaxed">
                    {notif.description}
                  </p>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center px-10">
                <Bell className="w-10 h-10 text-secondary/10 mb-4" />
                <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">No new updates</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <DropdownMenuSeparator className="m-0 bg-surface-variant" />
        
        <div className="p-4 bg-white border-t border-surface-variant/50 text-center">
          <button className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 hover:text-secondary transition-colors">
            View All Activity
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
