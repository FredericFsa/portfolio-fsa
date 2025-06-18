const bcrypt = require('bcrypt');

bcrypt.hash("SuperFred2025", 10).then(hash => {
    console.log("Hash :", hash);
});
