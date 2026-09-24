import { beforeEach, describe, expect, it } from 'vitest';
import './covera.js';
describe('Covera revenue cycle workflows',()=>{
 let app;
 beforeEach(()=>{document.body.innerHTML='';history.replaceState(null,'','#/Overview');app=document.createElement('covera-app');document.body.append(app);});
 it('starts full width and toggles the sidebar',()=>{expect(app.querySelector('.sidebar').hidden).toBe(true);app.querySelector('#nav-toggle').dispatchEvent(new CustomEvent('eds-click'));expect(app.querySelector('.sidebar').hidden).toBe(false);});
 it('filters the denial worklist and searches account IDs',()=>{app.navigate('Denials');expect(app.filtered()).toHaveLength(2);app.query='PT-10484';app.renderRows();expect(app.querySelector('#account-rows').textContent).toContain('Rohan Poluru');expect(app.filtered()).toHaveLength(1);});
 it('rejects overpayments then updates a valid payment balance',()=>{app.openPayment('PT-10482');app.querySelector('#payment-amount').value=2000;app.savePayment();expect(app.accounts[0].amount).toBe(1240);expect(app.querySelector('#payment-error').textContent).toContain('no more');app.querySelector('#payment-amount').value=240;app.savePayment();expect(app.accounts[0].amount).toBe(1000);expect(app.accounts[0].status).toBe('Payment plan');});
 it('moves a denied claim into appeal review',()=>{app.navigate('Denials');app.openAccount('PT-10484');app.querySelector('#appeal').dispatchEvent(new CustomEvent('eds-click'));expect(app.accounts.find(a=>a.id==='PT-10484').status).toBe('In review');expect(app.filtered()).toHaveLength(2);});
 it('renders later account pages',()=>{app.querySelector('#pagination').dispatchEvent(new CustomEvent('eds-change',{detail:{page:2}}));expect(app.querySelector('#account-rows').textContent).toContain('Neha Poluru');expect(app.querySelector('#table-summary').textContent).toBe('Showing 6–8 of 8 accounts');});
 it('credits the author and design system in the footer',()=>{
  const footer=app.querySelector('.page-footer');
  expect(footer.textContent).toContain('Created by');
  expect(footer.querySelector('a[href="https://polurus.com"]')?.textContent).toBe('Subrahmanyam Poluru');
  expect(footer.querySelector('a[href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc"]')?.textContent).toBe('@poluru-labs/enterprise-design-system-wc');
 });
});
