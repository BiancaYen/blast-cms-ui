const fs = require('fs-extra');

// Copies entire directory, from build to public.
fs.copy('build/', 'public/', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Deployed successfully to the public folder');
    }
});
