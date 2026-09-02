export const productName = 'Nimbus';
export const productLine = 'Inventory';
export const workspaceName = 'Poluru Supply Co.';

export const currentUser = {
  name: 'Aditi Poluru',
  email: 'aditi.poluru@poluru-supply.example',
  role: 'Inventory operations lead',
};

export const workspace = {
  name: workspaceName,
  period: 'FY26 Q3 · week 9',
  timezone: 'America / Chicago',
  close: 'Cycle count closes 5 Sep 2026',
};

export const stockHealth = {
  inStock: 76.2,
  low: 14.8,
  stockout: 9.0,
};

export const inboundDock = {
  dock: 'Dock 2',
  minutes: 18,
  carrier: 'Summit Packaging',
  po: 'PO_2207',
  warehouse: 'Chicago Central',
};

export const navItems = [
  { label: 'Overview', href: '#/overview', icon: 'home' },
  { label: 'Inventory', href: '#/inventory', icon: 'folder' },
  { label: 'Purchase orders', href: '#/orders', icon: 'file' },
  { label: 'Warehouses', href: '#/warehouses', icon: 'star' },
  { label: 'Suppliers', href: '#/suppliers', icon: 'external-link' },
  { label: 'Team', href: '#/team', icon: 'user' },
  { label: 'Alerts', href: '#/alerts', icon: 'bell' },
  { label: 'Reports', href: '#/reports', icon: 'download' },
  { label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Items in stock', value: '28,640', hint: 'Across 6 warehouses', trend: 'up', trendValue: '+3.1%' },
  { label: 'Inbound orders', value: '92', hint: '28 arriving today', trend: 'up', trendValue: '+14' },
  { label: 'Stock accuracy', value: '98.4%', hint: 'Cycle count vs. system', trend: 'up', trendValue: '+1.2 pts' },
  { label: 'Low stock alerts', value: '16', hint: '4 need attention today', trend: 'down', trendValue: '-2' },
  { label: 'Fulfillment rate', value: '96.7%', hint: 'Same-day dispatch', trend: 'up', trendValue: '+0.8 pts' },
  { label: 'Open POs', value: '36', hint: '$1.6M committed spend', trend: 'flat', trendValue: 'On plan' },
  { label: 'Avg. lead time', value: '6.2 days', hint: 'Across active suppliers', trend: 'down', trendValue: '-0.4 days' },
  { label: 'Warehouse capacity', value: '78%', hint: 'Peak season buffer', trend: 'up', trendValue: '+5 pts' },
];

export const stockTrend = [21.2, 22.0, 22.6, 23.4, 24.1, 24.9, 25.6, 26.3, 27.0, 27.6, 28.1, 28.6];

export const products = [
  { id: 'sku_001', sku: 'NB-1042', name: 'Cushioned trail runner', category: 'Footwear', warehouse: 'Chicago Central', quantity: 3240, reorder: 800, status: 'In stock', updated: '1 Sep 2026' },
  { id: 'sku_002', sku: 'NB-2071', name: 'Insulated steel bottle 750ml', category: 'Outdoor gear', warehouse: 'Dallas South', quantity: 540, reorder: 600, status: 'Low stock', updated: '1 Sep 2026' },
  { id: 'sku_003', sku: 'NB-3350', name: 'Packable rain shell', category: 'Apparel', warehouse: 'Atlanta East', quantity: 1890, reorder: 500, status: 'In stock', updated: '31 Aug 2026' },
  { id: 'sku_004', sku: 'NB-4108', name: 'Carbon trekking pole pair', category: 'Outdoor gear', warehouse: 'Denver West', quantity: 210, reorder: 300, status: 'Backordered', updated: '30 Aug 2026' },
  { id: 'sku_005', sku: 'NB-5223', name: 'Merino base layer', category: 'Apparel', warehouse: 'Chicago Central', quantity: 2760, reorder: 700, status: 'In stock', updated: '1 Sep 2026' },
  { id: 'sku_006', sku: 'NB-6019', name: '45L expedition backpack', category: 'Bags', warehouse: 'Seattle North', quantity: 430, reorder: 400, status: 'In stock', updated: '29 Aug 2026' },
  { id: 'sku_007', sku: 'NB-7304', name: 'LED headlamp 400 lumen', category: 'Electronics', warehouse: 'Dallas South', quantity: 95, reorder: 350, status: 'Low stock', updated: '1 Sep 2026' },
  { id: 'sku_008', sku: 'NB-8117', name: 'Compression dry bag set', category: 'Bags', warehouse: 'Atlanta East', quantity: 1620, reorder: 450, status: 'In stock', updated: '28 Aug 2026' },
  { id: 'sku_009', sku: 'NB-9024', name: 'Trail gaiter pair', category: 'Footwear', warehouse: 'Phoenix Hub', quantity: 880, reorder: 250, status: 'In stock', updated: '27 Aug 2026' },
  { id: 'sku_010', sku: 'NB-1183', name: 'Quick-dry camp towel', category: 'Outdoor gear', warehouse: 'Denver West', quantity: 1240, reorder: 400, status: 'In stock', updated: '26 Aug 2026' },
  { id: 'sku_011', sku: 'NB-2290', name: 'Solar panel charger 20W', category: 'Electronics', warehouse: 'Seattle North', quantity: 62, reorder: 200, status: 'Low stock', updated: '1 Sep 2026' },
  { id: 'sku_012', sku: 'NB-4471', name: 'Ripstop hammock', category: 'Outdoor gear', warehouse: 'Phoenix Hub', quantity: 0, reorder: 150, status: 'Backordered', updated: '25 Aug 2026' },
];

export const productColumns = [
  { key: 'sku', label: 'SKU', sortable: true },
  { key: 'name', label: 'Item', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'quantity', label: 'On hand' },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated' },
];

export const purchaseOrders = [
  { id: 'po_2201', supplier: 'Highline Textiles', warehouse: 'Chicago Central', items: 12, status: 'In transit', eta: '2 Sep 2026', total: '$48,200' },
  { id: 'po_2202', supplier: 'Cascade Outdoor Co.', warehouse: 'Seattle North', items: 6, status: 'Confirmed', eta: '5 Sep 2026', total: '$21,900' },
  { id: 'po_2203', supplier: 'Ferrotech Components', warehouse: 'Dallas South', items: 4, status: 'Delayed', eta: '9 Sep 2026', total: '$16,750' },
  { id: 'po_2204', supplier: 'Summit Packaging', warehouse: 'Denver West', items: 9, status: 'In transit', eta: '3 Sep 2026', total: '$9,480' },
  { id: 'po_2205', supplier: 'Highline Textiles', warehouse: 'Atlanta East', items: 15, status: 'Draft', eta: '12 Sep 2026', total: '$52,300' },
  { id: 'po_2206', supplier: 'Northbay Leather', warehouse: 'Chicago Central', items: 3, status: 'Confirmed', eta: '4 Sep 2026', total: '$11,020' },
  { id: 'po_2207', supplier: 'Summit Packaging', warehouse: 'Chicago Central', items: 8, status: 'In transit', eta: '1 Sep 2026', total: '$14,600' },
  { id: 'po_2208', supplier: 'Cascade Outdoor Co.', warehouse: 'Phoenix Hub', items: 5, status: 'Confirmed', eta: '6 Sep 2026', total: '$18,440' },
];

export const orderColumns = [
  { key: 'id', label: 'Order', sortable: true },
  { key: 'supplier', label: 'Supplier', sortable: true },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'items', label: 'Line items' },
  { key: 'status', label: 'Status' },
  { key: 'eta', label: 'ETA' },
  { key: 'total', label: 'Total' },
];

export const warehouses = [
  { id: 'wh_chi', name: 'Chicago Central', location: 'Illinois', manager: 'Rohan Poluru', capacityUsed: 82, capacityTotal: 100, status: 'On track', skus: 3120 },
  { id: 'wh_dal', name: 'Dallas South', location: 'Texas', manager: 'Meera Poluru', capacityUsed: 91, capacityTotal: 100, status: 'Watch', skus: 2480 },
  { id: 'wh_atl', name: 'Atlanta East', location: 'Georgia', manager: 'Kabir Poluru', capacityUsed: 68, capacityTotal: 100, status: 'On track', skus: 2050 },
  { id: 'wh_den', name: 'Denver West', location: 'Colorado', manager: 'Ishita Poluru', capacityUsed: 74, capacityTotal: 100, status: 'On track', skus: 1740 },
  { id: 'wh_sea', name: 'Seattle North', location: 'Washington', manager: 'Devansh Poluru', capacityUsed: 88, capacityTotal: 100, status: 'Watch', skus: 1980 },
  { id: 'wh_pho', name: 'Phoenix Hub', location: 'Arizona', manager: 'Ananya Poluru', capacityUsed: 55, capacityTotal: 100, status: 'On track', skus: 1260 },
  { id: 'wh_min', name: 'Minneapolis Crossdock', location: 'Minnesota', manager: 'Priya Poluru', capacityUsed: 61, capacityTotal: 100, status: 'On track', skus: 980 },
  { id: 'wh_por', name: 'Portland Fulfillment', location: 'Oregon', manager: 'Arjun Poluru', capacityUsed: 72, capacityTotal: 100, status: 'On track', skus: 1120 },
];

export const suppliers = [
  { id: 'sup_1', name: 'Highline Textiles', category: 'Apparel', leadTime: '5 days', rating: 4.6, status: 'Preferred' },
  { id: 'sup_2', name: 'Cascade Outdoor Co.', category: 'Outdoor gear', leadTime: '7 days', rating: 4.3, status: 'Preferred' },
  { id: 'sup_3', name: 'Ferrotech Components', category: 'Electronics', leadTime: '11 days', rating: 3.8, status: 'Watch' },
  { id: 'sup_4', name: 'Summit Packaging', category: 'Packaging', leadTime: '3 days', rating: 4.8, status: 'Preferred' },
  { id: 'sup_5', name: 'Northbay Leather', category: 'Bags', leadTime: '9 days', rating: 4.1, status: 'Preferred' },
  { id: 'sup_6', name: 'Alpine Footwear Ltd.', category: 'Footwear', leadTime: '8 days', rating: 4.4, status: 'Preferred' },
  { id: 'sup_7', name: 'BrightPath Solar', category: 'Electronics', leadTime: '10 days', rating: 3.9, status: 'Watch' },
  { id: 'sup_8', name: 'TrailCraft Fabrics', category: 'Apparel', leadTime: '6 days', rating: 4.5, status: 'Preferred' },
];

export const people = [
  { name: 'Aditi Poluru', role: 'Inventory operations lead', squad: 'Central ops', rating: 5, score: 94 },
  { name: 'Rohan Poluru', role: 'Warehouse manager', squad: 'Chicago Central', rating: 5, score: 90 },
  { name: 'Meera Poluru', role: 'Warehouse manager', squad: 'Dallas South', rating: 4, score: 78 },
  { name: 'Kabir Poluru', role: 'Warehouse manager', squad: 'Atlanta East', rating: 5, score: 88 },
  { name: 'Ishita Poluru', role: 'Warehouse manager', squad: 'Denver West', rating: 4, score: 85 },
  { name: 'Devansh Poluru', role: 'Warehouse manager', squad: 'Seattle North', rating: 4, score: 81 },
  { name: 'Ananya Poluru', role: 'Warehouse manager', squad: 'Phoenix Hub', rating: 5, score: 91 },
  { name: 'Farhan Poluru', role: 'Procurement lead', squad: 'Supplier relations', rating: 4, score: 83 },
  { name: 'Simran Poluru', role: 'Demand planner', squad: 'Central ops', rating: 5, score: 89 },
  { name: 'Yusuf Poluru', role: 'Logistics analyst', squad: 'Central ops', rating: 4, score: 80 },
  { name: 'Priya Poluru', role: 'Warehouse manager', squad: 'Minneapolis Crossdock', rating: 4, score: 86 },
  { name: 'Arjun Poluru', role: 'Warehouse manager', squad: 'Portland Fulfillment', rating: 5, score: 87 },
];

export const alerts = [
  { id: 'a1', title: 'Insulated bottle below reorder point', owner: 'Meera Poluru', location: 'Dallas South', severity: 'Red', since: '1 Sep', note: '540 units on hand against a 600-unit reorder point.' },
  { id: 'a2', title: 'Headlamp stock critically low', owner: 'Meera Poluru', location: 'Dallas South', severity: 'Red', since: '1 Sep', note: '95 units on hand; supplier lead time is 11 days.' },
  { id: 'a3', title: 'Trekking poles backordered', owner: 'Ishita Poluru', location: 'Denver West', severity: 'Amber', since: '30 Aug', note: 'Ferrotech shipment delayed to 9 Sep.' },
  { id: 'a4', title: 'Seattle capacity above 85%', owner: 'Devansh Poluru', location: 'Seattle North', severity: 'Amber', since: '29 Aug', note: 'Overflow pallets moved to Phoenix Hub.' },
  { id: 'a5', title: 'Cycle count variance resolved', owner: 'Aditi Poluru', location: 'Chicago Central', severity: 'Green', since: '24 Aug', note: 'Variance closed after bin relabeling.' },
  { id: 'a6', title: 'Solar charger below reorder point', owner: 'Devansh Poluru', location: 'Seattle North', severity: 'Red', since: '1 Sep', note: '62 units on hand; BrightPath Solar lead time is 10 days.' },
  { id: 'a7', title: 'Ripstop hammock stockout', owner: 'Ananya Poluru', location: 'Phoenix Hub', severity: 'Red', since: '25 Aug', note: 'Zero on hand; PO_2208 confirmed for 6 Sep arrival.' },
  { id: 'a8', title: 'Inbound dock queue building', owner: 'Rohan Poluru', location: 'Chicago Central', severity: 'Amber', since: '1 Sep', note: 'Three trucks queued; Dock 2 clears in ~18 minutes.' },
];

export const reviews = [
  { label: 'Weekly cycle count', description: 'Aditi Poluru · Mondays 08:00', timestamp: '25 Aug', icon: 'clock', status: 'Done' },
  { label: 'Supplier scorecard review', description: 'Farhan Poluru · lead time trend', timestamp: '26 Aug', icon: 'star', status: 'Done' },
  { label: 'Peak-season capacity plan', description: 'Devansh Poluru · Seattle overflow', timestamp: '27 Aug', icon: 'file', status: 'Done' },
  { label: 'Reorder point audit', description: 'Simran Poluru · demand plan refresh', timestamp: '28 Aug', icon: 'check', status: 'Done' },
  { label: 'Logistics ops sync', description: 'Yusuf Poluru · carrier performance', timestamp: '29 Aug', icon: 'user', status: 'Done' },
  { label: 'Inbound dock throughput', description: 'Rohan Poluru · Dock 2 queue', timestamp: '1 Sep', icon: 'download', status: 'Today' },
];

export const reports = [
  { name: 'Weekly stock snapshot', owner: 'Aditi Poluru', updated: '1 Sep 2026', format: 'PDF' },
  { name: 'Reorder point export', owner: 'Simran Poluru', updated: '31 Aug 2026', format: 'CSV' },
  { name: 'Supplier scorecard', owner: 'Farhan Poluru', updated: '30 Aug 2026', format: 'XLSX' },
  { name: 'Warehouse capacity plan', owner: 'Devansh Poluru', updated: '29 Aug 2026', format: 'PDF' },
  { name: 'Inbound dock log', owner: 'Rohan Poluru', updated: '1 Sep 2026', format: 'CSV' },
  { name: 'Low-stock exception list', owner: 'Meera Poluru', updated: '1 Sep 2026', format: 'XLSX' },
];

export const inboxItems = [
  { label: 'Three SKUs below reorder point', description: 'Meera Poluru · Dallas South', icon: 'alert-triangle' },
  { label: 'Cycle count due Monday', description: 'Aditi Poluru · 08:00', icon: 'clock' },
  { label: 'Summit Packaging PO arriving', description: 'Rohan Poluru · Dock 2', icon: 'check' },
  { label: 'Ripstop hammock stockout', description: 'Ananya Poluru · Phoenix Hub', icon: 'alert-triangle' },
];

export const createSteps = [
  { label: 'Item', description: 'Name and owner' },
  { label: 'Threshold', description: 'Reorder point' },
  { label: 'Confirm', description: 'Staff PIN' },
];

export const warehouseTree = [
  {
    id: 'central',
    label: 'Central region',
    children: [
      { id: 'chi', label: 'Chicago Central', href: '#/warehouses' },
      { id: 'den', label: 'Denver West', href: '#/warehouses' },
      { id: 'min', label: 'Minneapolis Crossdock', href: '#/warehouses' },
    ],
  },
  {
    id: 'coastal',
    label: 'Coastal region',
    children: [
      { id: 'sea', label: 'Seattle North', href: '#/warehouses' },
      { id: 'pho', label: 'Phoenix Hub', href: '#/warehouses' },
      { id: 'por', label: 'Portland Fulfillment', href: '#/warehouses' },
    ],
  },
  {
    id: 'south',
    label: 'Southern region',
    children: [
      { id: 'dal', label: 'Dallas South', href: '#/warehouses' },
      { id: 'atl', label: 'Atlanta East', href: '#/warehouses' },
    ],
  },
];

export const productHistoryColumns = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'change', label: 'Change' },
  { key: 'balance', label: 'Balance' },
  { key: 'reason', label: 'Reason' },
];

export const productHistoryRows = [
  { date: '1 Sep 2026', change: '-120', balance: '3,240', reason: 'Outbound fulfillment' },
  { date: '29 Aug 2026', change: '+600', balance: '3,360', reason: 'Purchase order received' },
  { date: '27 Aug 2026', change: '-85', balance: '2,760', reason: 'Outbound fulfillment' },
  { date: '24 Aug 2026', change: '-40', balance: '2,845', reason: 'Cycle count adjustment' },
  { date: '20 Aug 2026', change: '+400', balance: '2,885', reason: 'Inbound receipt' },
];

export const apiSnippet = `GET /v1/inventory/sku_002
Authorization: Bearer nim_live_****

{
  "sku": "NB-2071",
  "name": "Insulated steel bottle 750ml",
  "quantity": 540,
  "reorderPoint": 600,
  "warehouse": "Dallas South"
}`;

export const commandItems = [
  { label: 'Overview', description: 'Inventory pulse', href: '#/overview', icon: 'home' },
  { label: 'Inventory', description: 'All SKUs', href: '#/inventory', icon: 'folder' },
  { label: 'Purchase orders', description: 'Open POs', href: '#/orders', icon: 'file' },
  { label: 'Warehouses', description: 'Capacity and managers', href: '#/warehouses', icon: 'star' },
  { label: 'Alerts', description: 'Reorder thresholds', href: '#/alerts', icon: 'bell' },
  { label: 'Search', description: 'Find SKUs and orders', href: '#/search', icon: 'search' },
  { label: 'Settings', description: 'Workspace', href: '#/settings', icon: 'settings' },
];

export function buildSearchCatalog() {
  return { products, purchaseOrders, warehouses, alerts, suppliers, people };
}
