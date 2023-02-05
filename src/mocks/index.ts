async function initMocks() {
  if (typeof window === 'undefined') {
    const server = await import('./server');
    server.default.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const worker = await import('./browser');
    worker.default.start({ onUnhandledRequest: 'bypass' });
  }
}

export default initMocks;
