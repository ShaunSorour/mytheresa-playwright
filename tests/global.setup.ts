import { test as setup } from '@playwright/test';


// example to store user auth
// can run multiple setup functions for mutiple users
// just point to different auth files

const authFile = 'playwright/.auth/user.json';

setup('Authenticate - User 1', async ({ request }) => {
    console.log('EXAMPLE - Setting up authentication...');
    
    await request.post('https://github.com/login', {
        form: {
            'user': 'USERNAME',
            'password': 'PASSWORD'
        }
    });
    await request.storageState({ path: authFile });
});