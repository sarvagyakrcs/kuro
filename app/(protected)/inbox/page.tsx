import { Suspense } from "react";
import { Metadata } from "next";
import NotificationsLoading from "@/modules/notifications/components/notifications-loading";
import NotificationsList from "@/modules/notifications/components/notification-list";
import { InboxIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Notifications",
  description: "View and manage your notifications",
};

export const dynamic = 'force-dynamic'; // Ensure the page is always up-to-date

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 pb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
            <InboxIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with your latest notifications
            </p>
          </div>
        </div>
        <Suspense fallback={<NotificationsLoading />}>
          <NotificationsList />
        </Suspense>
      </div>
    </div>
  );
}
