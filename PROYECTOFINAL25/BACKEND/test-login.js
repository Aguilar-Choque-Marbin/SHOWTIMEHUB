const bcrypt = require('bcrypt');
const pool = require('./src/configuracion/baseDatos');

async function testLogin() {
  try {
    const email = 'maria.lopez@gmail.com';
    const password = 'password123';
    
    // Buscar usuario
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = resultado.rows[0];
    
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return;
    }
    
    console.log('✅ Usuario encontrado:');
    console.log('   ID:', usuario.id);
    console.log('   Email:', usuario.email);
    console.log('   Tipo:', usuario.tipo_usuario);
    console.log('   Hash en BD:', usuario.password_hash.substring(0, 30) + '...');
    
    // Probar contraseña
    const esValida = await bcrypt.compare(password, usuario.password_hash);
    console.log('\n🔐 Verificación de contraseña:', esValida ? '✅ VÁLIDA' : '❌ INVÁLIDA');
    
    if (!esValida) {
      // Generar hash correcto para comparar
      const hashCorrecto = await bcrypt.hash(password, 10);
      console.log('\n📝 Hash que debería estar en BD:', hashCorrecto);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
