export function getLocaleFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('locale') || 'en';
}
