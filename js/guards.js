import { supabase } from "./supabaseClient.js";

export async function requireAuth() {
  const { data } = await supabase.auth.getSession();
  const isLoggedIn = Boolean(data.session);

  if (!isLoggedIn) {
    window.location.href = "login.html";
    return false;
  }

  return true;
}