import { supabase } from "./supabaseClient.js";

const form = document.querySelector("#loginForm");
const messageEl = document.querySelector("#message");

function setMessage(text, type = "info") {
  messageEl.textContent = text;
  messageEl.className =
    type === "error" ? "text-sm text-red-600" : "text-sm text-green-700";
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    setMessage("Logging in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message, "error");
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!profile) {
        const pendingDisplayName =
          localStorage.getItem("pendingDisplayName") || email.split("@")[0];

        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: userId, display_name: pendingDisplayName }]);

        if (profileError) {
          setMessage(
            "Logged in, but we could not create your profile name. You can try again later.",
            "error",
          );
        }

        localStorage.removeItem("pendingDisplayName");
      }
    }

    setMessage("Login successful! Redirecting...");
    window.location.href = "index.html";
  });
}
