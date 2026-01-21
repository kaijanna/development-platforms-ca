import { supabase } from "./supabaseClient.js";

const container = document.querySelector("#article-container");

const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

if (!articleId) {
  container.innerHTML = "<p>Article not found.</p>";
}

async function getCurrentUserId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id || null;
}

async function loadArticle() {
  const { data: article, error } = await supabase
    .from("articles")
    .select(
      `
      id,
      title,
      body,
      category,
      created_at,
      author_id,
      profiles (
        display_name
      )
    `,
    )
    .eq("id", articleId)
    .single();

  if (error) {
    console.error("Load article error:", error);
    container.innerHTML = "<p>Could not load article.</p>";
    return;
  }

  const currentUserId = await getCurrentUserId();
  renderArticle(article, currentUserId);
}

function renderArticle(article, currentUserId) {
  const authorName = article.profiles?.display_name || "Unknown";
  const isOwner = currentUserId && article.author_id === currentUserId;

  container.innerHTML = `
    <article class="bg-white rounded-xl p-6 shadow">
      <header class="mb-4">
        <h1 class="text-2xl font-bold mb-2">
          ${article.title}
        </h1>

        <p class="text-sm text-gray-500">
          ${article.category} ·
          ${new Date(article.created_at).toLocaleDateString()} ·
          Submitted by <strong>${authorName}</strong>
        </p>
      </header>

      <div class="text-gray-800 leading-relaxed whitespace-pre-line">
        ${article.body}
      </div>

      ${
        isOwner
          ? `
            <div class="mt-6">
              <button
                id="deleteArticleButton"
                class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                type="button"
              >
                Delete article
              </button>

              <p id="deleteMessage" class="text-sm mt-2"></p>
            </div>
          `
          : ""
      }
    </article>
  `;

  if (isOwner) {
    const deleteButton = document.querySelector("#deleteArticleButton");
    deleteButton.addEventListener("click", async () => {
      const confirmed = window.confirm("Delete this article permanently?");
      if (!confirmed) return;

      await deleteArticle(article.id);
    });
  }
}

async function deleteArticle(id) {
  const messageEl = document.querySelector("#deleteMessage");
  if (messageEl) messageEl.textContent = "Deleting...";

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    if (messageEl) messageEl.textContent = error.message;
    return;
  }

  window.location.href = "index.html";
}

loadArticle();
