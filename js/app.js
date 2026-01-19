import { supabase } from "./supabaseClient.js";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function renderArticles(articles) {
  const container = document.querySelector("#articles");

  if (!container) return;

  if (!articles || articles.length === 0) {
    container.innerHTML = '<p class="text-gray-500">No articles yet.</p>';
    return;
  }

  container.innerHTML = articles
    .map(
      (article) => `
      <article class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <header class="mb-2">
          <h3 class="text-lg font-semibold">${article.title}</h3>
          <p class="text-sm text-gray-500 flex flex-wrap gap-2">
            <span class="inline-block px-2 py-0.5 border rounded-full text-xs">
              ${article.category}
            </span>
            <span>•</span>
            <time datetime="${article.created_at}">
              ${formatDate(article.created_at)}
            </time>
          </p>
        </header>

        <p class="text-gray-700">${article.body}</p>
      </article>
    `,
    )
    .join("");
}

async function fetchArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, body, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    renderArticles([]);
    return;
  }

  renderArticles(data);
}

fetchArticles();
