export function showError(message) {
  const messageEl = document.querySelector("#message");
  const articlesEl = document.querySelector("#articles");

  if (messageEl) {
    messageEl.textContent = message;
    messageEl.className = "text-sm text-red-600";
    return;
  }

  if (articlesEl) {
    articlesEl.innerHTML = `
      <p class="text-red-600 text-sm">
        ${message}
      </p>
    `;
  }
}