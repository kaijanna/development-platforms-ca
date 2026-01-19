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

    setMessage("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message, "error");
      return;
    }

    setMessage("Check your email to confirm your account");
    console.log("signUp data:", data);
  });
}