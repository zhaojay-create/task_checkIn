import { createBrowserClient } from "@supabase/ssr";

//*
// * 获取通用 supabase 客户端（客户端组件专用）
// */

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
