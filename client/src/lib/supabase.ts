import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mtfqktpfcwoigmpmdkwh.supabase.co",
  "sb_publishable_fbAiXHcYmh4t2Scj3Fsqew_LnSw2tZK",
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
