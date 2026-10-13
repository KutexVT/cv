const assert = require('node:assert/strict');
const { test } = require('node:test');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function boot({ dialogSupported = true, reduced = false, observers = true } = {}) {
  class Element {
    constructor(attrs = {}) { this.attrs = attrs; this.events = {}; this.classes = new Set(); this.focused = false; }
    classList = { add: value => this.classes.add(value), toggle: (value, on) => on ? this.classes.add(value) : this.classes.delete(value), contains: value => this.classes.has(value) };
    setAttribute(name, value) { this.attrs[name] = value; }
    getAttribute(name) { return this.attrs[name]; }
    removeAttribute(name) { delete this.attrs[name]; }
    addEventListener(name, fn) { this.events[name] = fn; }
    emit(name, event = {}) { this.events[name]?.(event); }
    focus() { this.focused = true; }
    contains(target) { return target === this || target === menu || navLinks.includes(target); }
  }
  const menu = new Element({ 'aria-expanded': 'false' });
  const header = new Element();
  const navLinks = ['inicio', 'proyectos', 'contacto'].map(id => Object.assign(new Element(), { hash: '#' + id }));
  const navigation = { querySelectorAll: () => navLinks };
  const close = new Element();
  const dialog = Object.assign(new Element(), { open: false, querySelector: () => close, close() { this.open = false; this.emit('close'); }, getBoundingClientRect: () => ({ left: 10, right: 500, top: 10, bottom: 500 }) });
  if (dialogSupported) dialog.showModal = function () { this.open = true; };
  const image = Object.assign(new Element({ src: 'assets/certificado-btl1.jpeg' }), { alt: 'Certificado BTL1' });
  const dialogImage = new Element();
  const title = new Element();
  const certificate = { querySelector: selector => selector === 'img' ? image : { textContent: 'Blue Team Level 1' } };
  const links = [new Element(), new Element()];
  links.forEach(link => link.closest = () => certificate);
  const sections = ['inicio', 'proyectos', 'contacto'].map(id => ({ id }));
  const project = new Element();
  const elements = { '.menu-toggle': menu, '.site-header': header, '#main-nav': navigation, '#certificate-dialog': dialog, '#dialog-image': dialogImage, '#dialog-title': title };
  const mobile = Object.assign(new Element(), { matches: true });
  const motion = Object.assign(new Element(), { matches: reduced });
  const instances = [];
  class Observer {
    constructor(callback) { this.callback = callback; instances.push(this); }
    observe() {}
    unobserve(target) { this.unobserved = target; }
  }
  const window = { matchMedia: query => query.includes('767') ? mobile : motion };
  const document = { querySelector: selector => elements[selector], querySelectorAll: selector => selector === '[data-nav]' ? sections : selector === '[data-reveal]' ? [project] : links };
  const context = { window, document };
  if (observers) { window.IntersectionObserver = Observer; context.IntersectionObserver = Observer; }
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8'), context);
  return { menu, header, navLinks, close, dialog, links, title, dialogImage, mobile, instances, project, sections };
}

test('mobile menu opens, closes on Escape and restores focus', () => {
  const ui = boot();
  ui.menu.emit('click');
  assert.equal(ui.menu.attrs['aria-expanded'], 'true');
  ui.header.emit('keydown', { key: 'Escape' });
  assert.equal(ui.menu.attrs['aria-expanded'], 'false');
  assert.equal(ui.menu.focused, true);
});

test('navigation, leaving menu and resize close the mobile menu', () => {
  const ui = boot();
  ui.menu.emit('click'); ui.navLinks[1].emit('click');
  assert.equal(ui.menu.attrs['aria-expanded'], 'false');
  ui.menu.emit('click'); ui.header.emit('focusout', { relatedTarget: {} });
  assert.equal(ui.menu.attrs['aria-expanded'], 'false');
  ui.menu.emit('click'); ui.mobile.emit('change');
  assert.equal(ui.menu.attrs['aria-expanded'], 'false');
});

test('certificate opens with its image, title and returns focus on close', () => {
  const ui = boot(); let prevented = false;
  ui.links[1].emit('click', { button: 0, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(ui.dialog.open, true);
  assert.equal(ui.dialogImage.src, 'assets/certificado-btl1.jpeg');
  assert.equal(ui.title.textContent, 'Blue Team Level 1');
  ui.close.emit('click');
  assert.equal(ui.dialog.open, false);
  assert.equal(ui.links[1].focused, true);
});

test('modified clicks and unsupported dialog preserve direct image navigation', () => {
  const ui = boot();
  ui.links[0].emit('click', { button: 0, ctrlKey: true, preventDefault() { assert.fail('Must preserve new-tab navigation'); } });
  assert.equal(ui.dialog.open, false);
  const fallback = boot({ dialogSupported: false, observers: false });
  assert.equal(fallback.links[0].events.click, undefined);
  assert.equal(fallback.links[0].attrs['aria-haspopup'], undefined);
});

test('dialog padding does not dismiss the certificate; backdrop does', () => {
  const ui = boot();
  ui.links[0].emit('click', { button: 0, preventDefault() {} });
  ui.dialog.emit('pointerdown', { target: ui.dialog });
  ui.dialog.emit('click', { target: ui.dialog, clientX: 20, clientY: 20 });
  assert.equal(ui.dialog.open, true);
  ui.dialog.emit('pointerdown', { target: ui.dialog });
  ui.dialog.emit('click', { target: ui.dialog, clientX: 0, clientY: 0 });
  assert.equal(ui.dialog.open, false);
});

test('reduced motion skips project animation and visibility is never hidden', () => {
  const ui = boot({ reduced: true });
  ui.instances[1].callback([{ target: ui.project, isIntersecting: true }]);
  assert.equal(ui.project.classes.has('is-visible'), false);
  assert.equal(ui.instances[1].unobserved, ui.project);
});
