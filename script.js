"use strict";

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealElements = document.querySelectorAll("[data-reveal]");
let revealObserver;

function configureMotion() {
  revealObserver?.disconnect();
  document.documentElement.classList.toggle("motion-ready", !motionPreference.matches);
  if (motionPreference.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => element.classList.add("is-visible"));
    document.querySelectorAll(".halo").forEach(halo => halo.style.removeProperty("transform"));
    return;
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -20px 0px" });
  revealElements.forEach(element => {
    if (!element.classList.contains("is-visible")) revealObserver.observe(element);
  });
}

configureMotion();
motionPreference.addEventListener("change", configureMotion);

const sections = [...document.querySelectorAll("[data-nav]")];
const navLinks = [...document.querySelectorAll("nav a")];
const halos = [...document.querySelectorAll(".halo")];
let framePending = false;

function updateScrollState() {
  framePending = false;
  const guide = Math.min(window.innerHeight * 0.35, 250);
  let active = sections[0];
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= guide) active = section;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) active = sections.at(-1);
  navLinks.forEach(link => {
    if (link.hash === `#${active.id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  if (!motionPreference.matches) {
    const displacement = Math.min(window.scrollY * 0.012, 55);
    halos.forEach((halo, index) => {
      halo.style.transform = `translate3d(0, ${displacement * (index % 2 ? -1 : 1)}px, 0)`;
    });
  }
}

function requestScrollUpdate() {
  if (!framePending) {
    framePending = true;
    window.requestAnimationFrame(updateScrollState);
  }
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollState();

const dialog = document.querySelector("#certificate-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const closeButton = dialog.querySelector(".dialog-close");
let closeTimer;
let certificateTrigger;

document.querySelectorAll("[data-certificate]").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    certificateTrigger = button;
    clearTimeout(closeTimer);
    dialog.classList.remove("is-closing");
    dialogImage.src = image.getAttribute("src");
    dialogImage.alt = image.alt;
    dialogTitle.textContent = button.closest("article").querySelector("h4").textContent;
    dialog.showModal();
  });
});

function closeCertificate() {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;
  if (motionPreference.matches) {
    dialog.close();
    return;
  }
  dialog.classList.add("is-closing");
  closeTimer = window.setTimeout(() => dialog.close(), 170);
}

closeButton.addEventListener("click", closeCertificate);
dialog.addEventListener("cancel", event => {
  event.preventDefault();
  closeCertificate();
});
let backdropPress = false;
dialog.addEventListener("pointerdown", event => { backdropPress = event.target === dialog; });
dialog.addEventListener("click", event => {
  if (backdropPress && event.target === dialog) closeCertificate();
  backdropPress = false;
});
dialog.addEventListener("close", () => {
  clearTimeout(closeTimer);
  dialog.classList.remove("is-closing");
  certificateTrigger?.focus({ preventScroll: true });
});
