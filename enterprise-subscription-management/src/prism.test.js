import { beforeAll, describe, expect, it, vi } from 'vitest';
const $ = s => document.querySelector(s);
const change = (element, detail, type='eds-change') => element.dispatchEvent(new CustomEvent(type,{detail,bubbles:true}));
beforeAll(async()=>{
  window.scrollTo=()=>{};
  const storage = new Map();
  vi.stubGlobal('localStorage', { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)) });
  document.body.innerHTML='<div id="app"></div>';
  await import('./prism.js');
});
describe('Prism subscription workflows',()=>{
  it('renders the overview and registered design system components',()=>{
    expect($('h1').textContent).toBe('Subscription overview');
    expect($('eds-card').shadowRoot).toBeTruthy();
    expect(document.querySelectorAll('tbody tr')).toHaveLength(5);
  });
  it('combines search and plan filters',()=>{
    change($('#table-search'),{value:'Maya'},'eds-input');
    expect(document.querySelectorAll('tbody tr')).toHaveLength(1);
    $('#plan-filter').value='Enterprise';$('#apply-filter').click();
    expect($('eds-empty-state')).toBeTruthy();
    $('#reset-filter').click();
    change($('#table-search'),{value:''},'eds-input');
  });
  it('validates and persists a new subscription',()=>{
    $('#save-create').click();
    expect($('#form-error').textContent).toContain('Enter a customer');
    $('#customer-name').value='Sam Poluru';$('#company-name').value='Test Studio';
    $('#new-seats').value=12;$('#new-notes').value='Annual review';
    $('#save-create').click();
    const stored=JSON.parse(localStorage.getItem('prism-subscriptions'));
    expect(stored[0]).toMatchObject({name:'Sam Poluru',seats:12,note:'Annual review',plan:'Growth'});
    expect($('h1').textContent).toBe('Subscriptions');
  });
  it('cancels only after confirmation and supports reactivation',()=>{
    $('[data-customer="Sam Poluru"]').click();
    $('#cancel-subscription').click();
    expect(JSON.parse(localStorage.getItem('prism-subscriptions'))[0].status).toBe('Active');
    $('#confirm-cancel').click();
    expect(JSON.parse(localStorage.getItem('prism-subscriptions'))[0].status).toBe('Canceled');
    $('[data-customer="Sam Poluru"]').click();$('#cancel-subscription').click();
    expect(JSON.parse(localStorage.getItem('prism-subscriptions'))[0].status).toBe('Active');
  });
  it('saves and reloads plan entitlement changes',()=>{
    $('[data-go="Plans & entitlements"]').click();
    $('[data-plan="Growth"]').click();$('#ent-seats').value=150;$('#save-entitlements').click();
    $('[data-plan="Growth"]').click();
    expect($('#ent-seats').value).toBe(150);
  });
});
