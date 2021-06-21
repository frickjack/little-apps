import { ifInteractive, interactive } from '@littleware/little-elements/commonjs/bin/testHelper.js';

describe('the apps.frickjack.com site', () => {
  describe('the homepage', () => {
    // eslint-disable-next-line
    (beforeEach as Function)(
      ...ifInteractive(async () => {
        const result = await interactive(
          `
                    * Load the homepage.
                    `,
        );
        expect(result.didPass).toBe(true);
      }, 3600000) as any,
    );

    it('loads ok', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Make sure it renders correctly.
                * Check that all the assets load.
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('has links that all work', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Make sure all the links work.
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('has an up to date resume', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Check that the linked resume is up to date.
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
  });
  it('has an up to date resume', ...ifInteractive(async () => {
    const result = await interactive(
      `
            * Check that the linked resume is up to date.
            `,
    );
    expect(result.didPass).toBe(true);
  }, 3600000) as any,
  );
  it('the tests in the tests app all pass', ...ifInteractive(async () => {
    const result = await interactive(
      `
            * Load the red tests app.
            * Verify that all the linked test suites pass.
            `,
    );
    expect(result.didPass).toBe(true);
  }, 3600000) as any,
  );

  describe('the jwt app', () => {
    // eslint-disable-next-line
    (beforeEach as Function)(
      ...ifInteractive(async () => {
        const result = await interactive(
          `
                    * Load the jwt app at /jwt/index.html
                    `,
        );
        expect(result.didPass).toBe(true);
      }, 3600000) as any,
    );

    it('loads ok', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Make sure it renders correctly.
                * Check that all the assets load.
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('links back home', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Make sure the home link works
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('decodes jwt', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * past this test token
                eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZlbmNlX2tleV8yMDE4LTA2LTExVDIwOjEyOjQzWiJ9.eyJwdXIiOiJhY2Nlc3MiLCJhdWQiOlsib3BlbmlkIiwidXNlciIsImNyZWRlbnRpYWxzIiwiZGF0YSIsImFkbWluIiwiZ29vZ2xlX2NyZWRlbnRpYWxzIiwiZ29vZ2xlX3NlcnZpY2VfYWNjb3VudCIsImdvb2dsZV9saW5rIl0sInN1YiI6IjgzIiwiaXNzIjoiaHR0cHM6Ly9yZXViZW4ucGxhbngtcGxhLm5ldC91c2VyIiwiaWF0IjoxNTcyNjg1NjI5LCJleHAiOjE1NzI2ODY4MjksImp0aSI6ImQ3MmNmZDI0LTdlYzgtNDhhMS1hYmU5LWU0ZTAzNGZlMzIyYSIsImNvbnRleHQiOnsidXNlciI6eyJuYW1lIjoicmV1YmVuQGZyaWNramFjay5jb20iLCJpc19hZG1pbiI6ZmFsc2UsImdvb2dsZSI6eyJwcm94eV9ncm91cCI6bnVsbH0sInByb2plY3RzIjp7fX19LCJhenAiOiIifQ.cy5Uynu6pR6_5YSXiMh-F6cCe92hpAt0eEEv9DYwHf6qeaKJiEyWkb2jBmIvWiB7NxlfBfEJrT1NaIYklstTHsFfJToqciSQyO9OX30WsXNShwkCbeIG9tvFzFhBip1xth-TN2YoX8toeruY2DRegrGRrAKo4BFW4L_YOqTFJz9O7ECd70zhxTAJQ9aj_itGYJZqlcj9eJjHxIVf9NHn7Ca-qxeuzYJJ_IiRfUfFKATBLsDmb9e3hMtIu15UhDc7Zpaq5u5s2saMrr_QGb_fId9kOZdjG4iAdhKr52WkLurx-AJMQBq-l0Jz79eYdiye1dPV3gJ_AlArUoMnsO3-ZA
                * make sure the parsing works
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
  });
  describe('the 511 app', () => {
    // eslint-disable-next-line
    (beforeEach as Function)(
      ...ifInteractive(async () => {
        const result = await interactive(
          `
                    * Load the 511 app at /511/index.html
                    `,
        );
        expect(result.didPass).toBe(true);
      }, 3600000) as any,
    );

    it('loads ok', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Make sure it renders correctly.
                * Check that all the assets load.
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('links back home', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * Make sure the home link works
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('tracks contractions', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * track a few contractions
                * make sure the clock graphic updates
                * make sure the stats tables update
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
    it('clears history', ...ifInteractive(async () => {
      const result = await interactive(
        `
                * track a few contractions
                * click the clear history button
                * make sure it prompts for confirmation
                * make sure it continues if not confirmed
                * make sure it updates if confirmed
                * make sure the clock graphic updates
                * make sure the stats tables update
                `,
      );
      expect(result.didPass).toBe(true);
    }, 3600000) as any,
    );
  });
});
