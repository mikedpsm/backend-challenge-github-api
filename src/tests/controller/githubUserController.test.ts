import { describe, expect, it } from '@jest/globals';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
})