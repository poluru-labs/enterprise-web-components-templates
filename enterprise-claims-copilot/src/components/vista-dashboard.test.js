import {beforeEach, afterEach, describe, expect, it, vi} from 'vitest';
vi.hoisted(()=>{const store=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),clear:()=>store.clear()}});});
import './vista-dashboard.js';
let app;
beforeEach(()=>{document.body.innerHTML='';window.localStorage.clear();window.location.hash='#/overview';app=document.createElement('vista-dashboard');document.body.append(app);});
afterEach(()=>app.remove());
describe('Vista hospitality workflows',()=>{
 it('renders the hospitality routes and author credits',()=>{
  for(const route of ['overview','properties','reservations','occupancy','housekeeping','issues','revenue','settings','help']){window.location.hash=`#/${route}`;app.render();expect(app.querySelector('#view').textContent).toContain('Created by');expect(app.querySelector('#view').textContent).not.toContain('Clearline');}
  expect(app.querySelector('footer a').href).toBe('https://polurus.com/');
 });
 it('opens and dismisses the mega menu',()=>{app.querySelector('.mega-trigger').click();expect(app.querySelector('#mega').hidden).toBe(false);document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));expect(app.querySelector('#mega').hidden).toBe(true);});
 it('filters properties and searches reservations',()=>{const select=app.querySelector('#property-filter');select.dispatchEvent(new CustomEvent('eds-change',{detail:{value:'palm'}}));expect(app.querySelectorAll('.property-card')).toHaveLength(1);expect(app.querySelector('.property-card').textContent).toContain('Vista Palm House');app.querySelector('#global-search').dispatchEvent(new CustomEvent('eds-input',{detail:{value:'Kavya'}}));expect(app.querySelectorAll('tbody tr')).toHaveLength(1);expect(app.querySelector('tbody').textContent).toContain('Kavya Poluru');});
 it('validates stay dates, creates a reservation, and checks in the guest',()=>{app.querySelector('#guest-name').value='Tara Poluru';app.querySelector('#departure').value='2026-09-22';app.querySelector('#save-booking').click();expect(app.querySelector('#booking-error').textContent).toContain('Check-out must follow');app.querySelector('#departure').value='2026-09-26';app.querySelector('#save-booking').click();const reservation=app.reservations[0];expect(reservation.name).toBe('Tara Poluru');expect(reservation.amount).toBe(789);expect(JSON.parse(window.localStorage.getItem('vista-reservations'))[0].name).toBe('Tara Poluru');app.openReservation(reservation.id);app.querySelector('[data-checkin]').click();expect(reservation.status).toBe('Checked in');});
 it('progresses a cleaning task and resolves an issue',()=>{window.location.hash='#/housekeeping';app.render();app.querySelector('[data-task="2"]').click();expect(app.tasks.find(t=>t.id===2).status).toBe('In progress');window.location.hash='#/issues';app.render();app.querySelector('[data-resolve="1"]').click();expect(app.issues.find(i=>i.id===1).status).toBe('Resolved');expect(JSON.parse(window.localStorage.getItem('vista-issues'))[0].status).toBe('Resolved');});
});
