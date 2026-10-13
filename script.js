"use strict";

const menuButton = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
const navigation = document.querySelector("#main-nav");
const mobile = window.matchMedia("(max-width: 767px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const navLinks = [...navigation.querySelectorAll("a")];

function setMenu(open, returnFocus = false) {
  header.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  if (returnFocus) menuButton.focus();
}

menuButton.hidden = false;
header.classList.add("nav-enhanced");
menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
navLinks.forEach(link => link.addEventListener("click", () => {
  if (mobile.matches) setMenu(false, true);
}));
header.addEventListener("keydown", event => {
  if (event.key === "Escape" && header.classList.contains("menu-open")) setMenu(false, true);
});
header.addEventListener("focusout", event => {
  if (mobile.matches && event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
});
mobile.addEventListener("change", () => setMenu(false));

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible.length) return;
    navLinks.forEach(link => {
      if (link.hash === `#${visible[0].target.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-10% 0px -55% 0px", threshold: 0 });
  document.querySelectorAll("[data-nav]").forEach(section => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll("[data-reveal]").forEach(element => revealObserver.observe(element));
}

const dialog = document.querySelector("#certificate-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
let certificateTrigger;

// Keep direct image links working in browsers without native dialog support.
if (typeof dialog.showModal === "function") {
  document.querySelectorAll("[data-certificate]").forEach(link => {
    link.setAttribute("aria-haspopup", "dialog");
    link.setAttribute("aria-controls", "certificate-dialog");
    link.addEventListener("click", event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      certificateTrigger = link;
      const certificate = link.closest(".certificate");
      const image = certificate.querySelector("img");
      dialogImage.src = image.getAttribute("src");
      dialogImage.alt = image.alt;
      dialogTitle.textContent = certificate.querySelector("h3").textContent;
      dialog.showModal();
    });
  });
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  let backdropPress = false;
  dialog.addEventListener("pointerdown", event => { backdropPress = event.target === dialog; });
  dialog.addEventListener("click", event => {
    if (backdropPress && event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
    backdropPress = false;
  });
  dialog.addEventListener("close", () => certificateTrigger?.focus({ preventScroll: true }));
}
