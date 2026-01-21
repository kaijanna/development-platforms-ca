import { supabase } from "./supabaseClient.js";
import { showError } from "./ui.js";

let currentCategory = "all";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function truncateText(text, maxLength = 200) {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

function renderArticles(articles) {
  const container = document.querySelector("#articles");

  if (!container) return;

  if (!articles || articles.length === 0) {
    container.innerHTML = '<p class="text-gray-500">No articles yet.</p>';
    return;
  }

  container.innerHTML = articles
    .map((article) => {
      const authorName = article.profiles?.display_name || "Unknown";

      return `
      <article class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <header class="mb-2">
         <a
          href="article.html?id=${article.id}"
          class="text-lg font-semibold hover:underline"
          >
         ${article.title}
           </a>

          <p class="text-sm text-gray-500 flex flex-wrap gap-2 items-center">
            <span class="inline-block px-2 py-0.5 border rounded-full text-xs">
              ${article.category}
            </span>
            <span>·</span>
            <time datetime="${article.created_at}">
              ${formatDate(article.created_at)}
            </time>
            <span>·</span>
            <span>
              Submitted by <strong>${authorName}</strong>
            </span>
          </p>
        </header>

          <p class="text-gray-700">
             ${truncateText(article.body, 200)}
          </p> 
      </article>
    `;
    })
    .join("");
}

async function fetchArticles(category = "all") {
  let query = supabase
    .from("articles")
    .select(
      `
       id,
       title,
       body,
       category,
       created_at,
       profiles (
       display_name
      )
      `,
    )
    .order("created_at", { ascending: false });

  if (category !== "all") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;

  if (error) {
    showError("Could not load articles. Please try again later.");
    return;
  }

  renderArticles(data);
}

async function fetchCategories() {
  const { data, error } = await supabase.from("articles").select("category");

  if (error) {
    showError("Could not load articles. Please try again later.");
    return;
  }

  renderCategories(data);
}

function renderCategories(articles) {
  const container = document.querySelector("#categories");
  if (!container) return;

  const categories = Array.from(
    new Set(
      articles
        .map((a) => a.category)
        .filter(Boolean)
        .map((c) => c.trim().toLowerCase()),
    ),
  ).sort();

  const buttons = ["all", ...categories]
    .map((cat) => {
      return `
        <button
          type="button"
          data-category="${cat}"
          class="px-3 py-1 rounded-full border text-sm hover:bg-gray-100"
        >
          ${cat}
        </button>
      `;
    })
    .join("");

  container.innerHTML = buttons;
  container.querySelectorAll("button[data-category]").forEach((button) => {
    button.addEventListener("click", async () => {
      const category = button.dataset.category;
      currentCategory = category;
      await fetchArticles(category);
    });
  });
}

fetchCategories();
fetchArticles("all");
