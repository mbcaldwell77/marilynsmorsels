"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useSupabaseClient, useSupabaseSession } from "@/components/SupabaseSessionProvider";

export default function LoginPage() {
  const session = useSupabaseSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace("/account");
    }
  }, [router, session]);

  if (session) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.refresh();
    const redirectTo = searchParams.get("redirectTo") || "/account";
    router.replace(redirectTo);
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-morselGold/30 bg-white/90 p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold text-center">Welcome Back</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-morselGold/40 px-3 py-2 focus:border-morselGold focus:outline-none focus:ring"
              autoComplete="email"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-morselGold/40 px-3 py-2 focus:border-morselGold focus:outline-none focus:ring"
              autoComplete="current-password"
              required
            />
          </label>
          {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-morselGold py-2 text-white transition hover:bg-morselGold/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-morselBrown/70">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-morselGold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

