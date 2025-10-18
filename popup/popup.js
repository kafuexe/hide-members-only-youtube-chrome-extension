document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");

  // Load saved state
  chrome.storage.sync.get(["membersBlockEnabled"], (result) => {
    toggle.checked = result.membersBlockEnabled ?? true;
  });

  // Save new state
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ membersBlockEnabled: toggle.checked });
  });
});
