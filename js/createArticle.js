import { supabase } from "./supabaseClient.js";
import { requireAuth } from "./guards.js";

const form = document.querySelector("#createArticleForm");
const messageEl = document.querySelector("#message");

function setMessage(text, type = "info") {
  messageEl.textContent = text;
  messageEl.className =
    type === "error" ? "text-sm text-red-600" : "text-sm text-green-700";
}

async function init() {
  const ok = await requireAuth();
  if (!ok) return;

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = String(formData.get("title"));
    const category = String(formData.get("category"));
    const body = String(formData.get("body"));

    setMessage("Publishing...");

    const { error } = await supabase.from("articles").insert([
      { title, category, body },
    ]);

    if (error) {
      setMessage(error.message, "error");
      return;
    }

    setMessage("Article published");
    form.reset();

    window.location.href = "index.html";
  });
}

init();