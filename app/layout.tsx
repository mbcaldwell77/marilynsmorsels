import "@/styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupabaseSessionProvider from "@/components/SupabaseSessionProvider";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Marilyn's Morsels",
  description: "Small-batch cookies baked fresh from Marilyn's home kitchen.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className="bg-morselCream text-morselBrown font-body">
        <SupabaseSessionProvider initialSession={session}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SupabaseSessionProvider>
      </body>
    </html>
  );
}
