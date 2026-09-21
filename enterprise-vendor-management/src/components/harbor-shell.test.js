import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './harbor-shell.js';
let shell;
beforeEach(()=>{window.location.hash='#/overview';shell=document.createElement('harbor-shell');document.body.append(shell);});
afterEach(()=>{shell.remove();document.querySelector('eds-toast-host')?.remove();});
describe('Harbor workspace',()=>{
 it('renders the dashboard with real design-system cards',()=>{expect(shell.querySelector('h1').textContent).toBe('Workspace overview');expect(shell.querySelectorAll('#vendor-rows tr').length).toBe(6);expect(shell.querySelectorAll('eds-card').length).toBe(9);});
 it('combines search, lifecycle, and risk filters',()=>{shell.query='Maya';shell.filter='Active';shell.risk='Medium';shell.renderTable();expect(shell.querySelectorAll('#vendor-rows tr').length).toBe(1);expect(shell.querySelector('#vendor-rows').textContent).toContain('Meridian Logistics');shell.query='missing';shell.renderTable();expect(shell.querySelector('eds-empty-state')).toBeTruthy();});
 it('validates new vendors and adds valid onboarding records',()=>{shell.saveVendor();expect(shell.records.length).toBe(6);shell.querySelector('#new-name').value='Cedar Partners';shell.querySelector('#new-email').value='contact@cedar.test';shell.saveVendor();expect(shell.records[0].name).toBe('Cedar Partners');expect(shell.records[0].status).toBe('Onboarding');expect(shell.querySelector('#vendor-rows').textContent).toContain('Cedar Partners');});
 it('escapes user supplied company names in rendered records',()=>{shell.querySelector('#new-name').value='<img src=x onerror=alert(1)>';shell.querySelector('#new-email').value='contact@cedar.test';shell.saveVendor();expect(shell.querySelector('#vendor-rows img')).toBeNull();});
 it('opens details and saves review notes',()=>{shell.details('Meridian Logistics');expect(shell.querySelector('#details').open).toBe(true);shell.querySelector('#vendor-note').value='Renew for one year';shell.querySelector('#save-note').click();expect(shell.records[1].notes).toEqual(['Renew for one year']);});
 it('provides the sticky-header mega menu toggle',()=>{shell.querySelector('#mega-toggle').click();expect(shell.querySelector('#mega-menu').hidden).toBe(false);expect(shell.querySelector('#mega-toggle').getAttribute('aria-expanded')).toBe('true');});
});
