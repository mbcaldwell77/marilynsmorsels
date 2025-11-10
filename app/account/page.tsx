import { redirect } from "next/navigation";
import ProfileForm from "@/components/account/ProfileForm";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export default async function AccountPage() {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/account");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Database["public"]["Tables"]["profiles"]["Row"]>();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to load profile", error);
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      <ProfileForm email={user.email ?? ""} initialProfile={profile ?? null} />
    </div>
  );
}

