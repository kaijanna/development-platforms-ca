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

    setMessage("Logged in successfully");
    console.log("Logged in user:", data.user);

     window.location.href = "index.html";
  });
}