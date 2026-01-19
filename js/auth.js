import { supabase } from "./supabaseClient.js";

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }

  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("signOut error:", error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}