const bcrypy = require('bcryptjs')
const Usuario = require('../models/UsuarioModel')

const createAdmin = async () => {
  // check for an existing admin user
  const user = await Usuario.findOne({ email: 'admin@localhost' })

  if (!user) {
    // create a new admin user
    await Usuario.create({
      nombre: 'Super Admin',
      correo: 'admin@localhost',
      user: 'superadmin',
      password: await bcrypy.hash('15935789', 10),
      roles: ['SUPERADMIN'],
      apps: ['SUPERAPPS']
    })
    console.log('SUPERADMIN User Created!')
  }
}
module.exports = createAdmin
