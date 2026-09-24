import '@poluru-labs/enterprise-design-system-wc';

if (typeof CSSStyleSheet !== 'undefined' && typeof CSSStyleSheet.prototype.replaceSync !== 'function') {
  CSSStyleSheet.prototype.replaceSync = function replaceSync() {};
}
