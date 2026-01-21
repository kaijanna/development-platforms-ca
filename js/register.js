import { supabase } from "./supabaseClient.js";

const form = document.querySelector("#registerForm");
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
    const displayName = String(formData.get("display_name"));

    if (!displayName.trim()) {
      setMessage("Please enter a display name.", "error");
      return;
    }

    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message, "error");
      return;
    }

    localStorage.setItem("pendingDisplayName", displayName);

    setMessage("Account created. Check your email to confirm");
  });
}
