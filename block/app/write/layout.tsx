import React from "react";
import Nav from "@/components/Nav";
import { getSupabaseServerClient } from "@/utils/supabase";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = getSupabaseServerClient();

  const { data: blocks } = await supabase
    .from("block")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Nav posts={blocks || []} />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-12 px-4">
        <div className="mt-8">{children}</div>
      </main>
    </>
  );
}
