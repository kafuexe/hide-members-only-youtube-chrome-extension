const tags = [
  "YTD-RICH-ITEM-RENDERER",
  "YTD-VIDEO-RENDERER",
  "YTD-COMPACT-VIDEO-RENDERER",
  "YT-LOCKUP-VIEW-MODEL",
];

function removeMembersOnly() {
  const cards = document.querySelectorAll(
    "ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model"
  );

  for (const el of cards) {
    // Ensure el is an Element and has innerText
    if (!(el instanceof Element)) continue;
    const text = el.innerText || "";
    if (text.includes("Members only")) {
      let node = el;
      while (node) {
        if (tags.includes(node.nodeName)) {
          console.log("[YouTube Members only Blocker] Removed:", node.nodeName);
          node.remove();
          break;
        }
        node = node.parentNode;
      }
    }
  }
}

function enableBlocking() {
  removeMembersOnly();
  const observer = new MutationObserver(removeMembersOnly);
  observer.observe(document.body, { childList: true, subtree: true });
  console.log("[YouTube Members only Blocker] MutationObserver started");
}

// Initial run based on toggle
chrome.storage.sync.get(["membersBlockEnabled"], (result) => {
  if (result.membersBlockEnabled) {
    enableBlocking();
    console.log("[YouTube Members Only Blocker] Blocking enabled");
  } else {
    console.log("[YouTube Members Only Blocker] Blocking disabled");
  }
});

// Real-time toggle listener
chrome.storage.onChanged.addListener((changes) => {
  if (changes.membersBlockEnabled) {
    const newValue = changes.membersBlockEnabled.newValue;
    if (newValue) {
      console.log("[YouTube Members Only Blocker] Blocking enabled");
      setTimeout(enableBlocking, 0);
    } else {
      console.log("[YouTube Members Only Blocker] Blocking disabled");
      location.reload();
    }
  }
});
