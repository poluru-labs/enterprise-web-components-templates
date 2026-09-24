import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import './campus-app.js';
let app;
beforeEach(() => { history.replaceState(null, '', '#/overview'); app=document.createElement('campus-app'); document.body.append(app); });
afterEach(() => { app.remove(); });
describe('CampusOne workspace', () => {
 it('opens the campus menu with its expanded state', () => { app.querySelector('#mega-toggle').click(); expect(app.querySelector('#mega-menu').hidden).toBe(false); expect(app.querySelector('#mega-toggle').getAttribute('aria-expanded')).toBe('true'); });
 it('rejects invalid enrollment and adds a valid student', () => { app.saveStudent(); expect(app.students.length).toBe(8); expect(app.querySelector('#form-error').textContent).toContain('valid email'); app.querySelector('#student-name').value='Tara Poluru';app.querySelector('#student-email').value='tara@example.edu';app.saveStudent();expect(app.students[0].name).toBe('Tara Poluru');expect(app.students[0].course).toBe('Computer Science'); });
 it('combines search and status filters', () => { app.query='computer';app.status='Active';expect(app.filtered().map(s=>s.name)).toEqual(['Aarav Poluru','Vihaan Poluru']);app.status='Pending';expect(app.filtered()).toEqual([]); });
 it('renders every navigation destination with no loading error', () => { for(const route of ['students','courses','enrollment','attendance','faculty','outcomes','calendar','reports','settings','help']) {history.replaceState(null,'',`#/${route}`);app.route();expect(app.querySelector('h1')).not.toBeNull();expect(app.querySelector('#view').textContent).not.toContain('could not load');} });
 it('shows a student profile with program and advisor', () => { app.profile('CO-2026001'); expect(app.querySelector('#detail-modal').open).toBe(true);expect(app.querySelector('#detail-body').textContent).toContain('Arjun Poluru'); });
 it('credits the author and design system in the footer', () => { const footer=app.querySelector('.page-footer'); expect(footer.textContent).toContain('Created by'); expect(footer.querySelector('a[href="https://polurus.com"]')?.textContent).toBe('Subrahmanyam Poluru'); expect(footer.querySelector('a[href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc"]')?.textContent).toBe('@poluru-labs/enterprise-design-system-wc'); });
});
