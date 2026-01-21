import { supabase } from "./supabaseClient.js";

function setVisibility(isLoggedIn) {
  const guestOnlyElements = document.querySelectorAll("[data-guest-only]");
  const authOnlyElements = document.querySelectorAll("[data-auth-only]");

  guestOnlyElements.forEach((el) => {
    el.style.display = isLoggedIn ? "none" : "";
  });

  authOnlyElements.forEach((el) => {
    el.style.display = isLoggedIn ? "" : "none";
  });
}

async function initNav() {
  const { data } = await supabase.auth.getSession();
  const isLoggedIn = Boolean(data.session);

  setVisibility(isLoggedIn);

  const logoutButton = document.querySelector("[data-logout]");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Could not sign out. Please try again.");
        return;
      }

      window.location.href = "index.html";
    });
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    setVisibility(Boolean(session));
  });
}

initNav();
