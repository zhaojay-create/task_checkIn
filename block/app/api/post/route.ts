import { getSupabaseServerClient } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = getSupabaseServerClient();
  const body = await req.json();

  const { error } = await supabase.from("block").insert([
    {
      title: body.title,
      content: body.content,
      tags: body.tags,
    },
  ]);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "ok" });
}
