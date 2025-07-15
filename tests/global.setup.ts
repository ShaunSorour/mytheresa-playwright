import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
    console.log('EXAMPLE - Setting up authentication...');
    
    await request.post('https://github.com/login', {
        form: {
            'user': 'USERNAME',
            'password': 'PASSWORD'
        }
    });
    await request.storageState({ path: authFile });
});