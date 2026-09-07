import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://usmoljkvqcuwwypqlrbd.supabase.co",
  "sb_publishable_d1x5A9cNt1dZc_qjnNH7PQ_CIDzMzzl",
);

export type CollifiResourceRow = {
  id: string;
  title: string;
  resource_type: string;
  subject: string;
  examination: string;
  grade: string | null;
  year: number | null;
  medium: string | null;
  resource_url: string;
  status: "draft" | "pending" | "published" | "rejected";
};
