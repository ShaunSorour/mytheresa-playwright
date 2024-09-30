import { test, expect } from '@playwright/test';



test('Links', async ({ page, request }) => {
  await page.goto(process.env.URL!);

  const hrefs: string[] = await page.$$eval('a', (links: HTMLAnchorElement[]) => links.map(link => link.href));

  for (const href of hrefs) {
    const response = await request.get(href);

    expect(response.status(), `Link failed: ${href}`).toBe(200);
    console.log(`${href}: ${response.status() === 200 ? '200 OK' : 'Error'}`);
  }
});