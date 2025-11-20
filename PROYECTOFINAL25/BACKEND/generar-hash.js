const bcrypt = require('bcrypt');

async function generarHash() {
  const password = 'password123';
  const hash = await bcrypt.hash(password, 10);
  console.log('\n==============================================');
  console.log('HASH GENERADO PARA: password123');
  console.log('==============================================');
  console.log(hash);
  console.log('==============================================\n');
}

generarHash();
