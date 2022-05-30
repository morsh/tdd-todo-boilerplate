export function createXHRmock() {
  const open = jest.fn();
  let onload: any;
  let onerror: any;
  const originalXMLHttpRequest = window.XMLHttpRequest;

  const restore = () => {
    (window as any).XMLHttpRequest = originalXMLHttpRequest;
  };

  const send = jest.fn().mockImplementation(function() {
    onload = this.onload.bind(this);
    onerror = this.onerror.bind(this);
  });

  const xhrMockClass = function () {
    return {
      open,
      send
    };
  };

  (window as any).XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

  return { open, send, onload, onerror, restore };
}
