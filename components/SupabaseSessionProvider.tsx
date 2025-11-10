"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  children: ReactNode;
  initialSession: Session | null;
};

type SupabaseContextValue = {
  client: SupabaseBrowserClient;
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export default function SupabaseSessionProvider({ children, initialSession }: Props) {
  const [supabaseClient] = useState<SupabaseBrowserClient>(() => createSupabaseBrowserClient());
  const [session, setSession] = useState<Session | null>(initialSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseClient]);

  const value = useMemo<SupabaseContextValue>(
    () => ({
      client: supabaseClient,
      session,
    }),
    [session, supabaseClient],
  );

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

const useSupabaseContext = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("Supabase hooks must be used within SupabaseSessionProvider");
  }
  return context;
};

export const useSupabaseClient = (): SupabaseBrowserClient => useSupabaseContext().client;

export const useSupabaseSession = (): Session | null => useSupabaseContext().session;
