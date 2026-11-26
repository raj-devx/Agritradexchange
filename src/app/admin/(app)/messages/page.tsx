import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  AdminPageTitle,
  Card,
  Badge,
  EmptyState,
  formatDate,
} from "@/components/admin/ui";

export const instant = false;

export default async function AdminMessagesPage() {
  await connection();
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageTitle
        title="Messages"
        description="Enquiries submitted through the public contact form."
        count={messages.length}
      />

      {messages.length === 0 ? (
        <EmptyState title="No messages yet" hint="Contact-form enquiries will appear here." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {messages.map((m) => (
            <Card key={m.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{m.name}</p>
                  <p className="text-xs text-ink/50">
                    {m.email}
                    {m.phone ? ` · ${m.phone}` : ""}
                  </p>
                </div>
                {m.audience && <Badge tone="green">{m.audience}</Badge>}
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink/80">{m.message}</p>
              <p className="mt-3 text-xs text-ink/40">{formatDate(m.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
