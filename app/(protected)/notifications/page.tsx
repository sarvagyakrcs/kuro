import { Suspense } from "react";
import { Metadata } from "next";
import NotificationsLoading from "@/modules/notifications/components/notifications-loading";
import NotificationsList from "@/modules/notifications/components/notification-list";
import { StarField } from "@/components/ui/star-field";

export const metadata: Metadata = {
  title: "Notifications",
  description: "View and manage your notifications",
};

export const dynamic = 'force-dynamic'; // Ensure the page is always up-to-date

export default function NotificationsPage() {
  return (
    <div className="relative container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-20 -z-10 opacity-70 pointer-events-none hidden md:block">
        <StarField className="h-[35rem] w-[35rem] -translate-y-[10%] translate-x-[40%]" />
      </div>
      
      <Suspense fallback={<NotificationsLoading />}>
        <NotificationsList />
      </Suspense>
    </div>
  );
}
