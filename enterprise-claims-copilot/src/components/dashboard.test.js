import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => {
 const storage = new Map();
 Object.defineProperty(window, 'localStorage', { configurable: true, value: {getItem: key => storage.get(key) ?? null, setItem: (key,value) => storage.set(key,String(value)), removeItem: key => storage.delete(key), clear: () => storage.clear()} });
});
import './dashboard.js';
let app;
beforeEach(() => {
 document.body.innerHTML = '';
 window.location.hash = '#/overview';
 app = document.createElement('signal-dashboard');
 document.body.append(app);
});
describe('dashboard interactions', () => {
 it('opens the mega menu and dismisses it with Escape', () => {
  app.querySelector('.mega-trigger').click();
  expect(app.querySelector('#mega').hidden).toBe(false);
  document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape'}));
  expect(app.querySelector('#mega').hidden).toBe(true);
 });
 it('filters scorecards by status and searches owners', () => {
  app.querySelector('[data-filter="At risk"]').click();
  expect(app.querySelectorAll('tbody tr')).toHaveLength(1);
  expect(app.querySelector('tbody').textContent).toContain('Rohan Poluru');
  app.querySelector('[data-filter="All scorecards"]').click();
  app.querySelector('#search').dispatchEvent(new CustomEvent('eds-input',{detail:{value:'Arjun'}}));
  expect(app.querySelectorAll('tbody tr')).toHaveLength(1);
  expect(app.querySelector('tbody').textContent).toContain('Finance');
 });
 it('requires a name and persists a created scorecard', async () => {
  app.querySelector('#search').dispatchEvent(new CustomEvent('eds-input',{detail:{value:''}}));
  app.querySelector('#save-create').click();
  expect(app.querySelector('#form-error').textContent).toContain('Enter a scorecard name');
  app.querySelector('#card-name').value='Regional performance';
  app.querySelector('#save-create').click();
  expect(JSON.parse(window.localStorage.getItem('signal-cards')).at(-1).name).toBe('Regional performance');
  expect(app.querySelector('#create').open).toBe(false);
 });
 it('renders every sidebar destination', () => {
  for(const id of ['overview','scorecards','goals','trends','teams','reports','alerts','settings','help']){
   location.hash=`#/${id}`;app.render();
   expect(app.querySelector('#view').textContent.trim().length).toBeGreaterThan(100);
  }
 });
});
