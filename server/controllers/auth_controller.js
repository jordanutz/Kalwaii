const bcrypt = require('bcryptjs')

module.exports = {
  userRegister: async (req, res) => {

    const db = req.app.get('db')
    const {name, email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)


    const findExistingEmail = await db.auth.check_if_exists([email])


    if (findExistingEmail[0]) {
      console.log
      res.status(400).send('Email is already in use.')
    } else {
      try {
        console.log('hit try')
        let newUser = await db.auth.user_register([name, email, hash])
        newUser = {
          id: newUser[0].id, 
          name: newUser[0].name,
          email: newUser[0].email
        }
        req.session.user = newUser 
        return res.status(200).send(req.session.user)
      } catch (err) {
        console.log(err)
        return res.status(400).send('Account could not be created')
      }
    }
  }, 

  userLogin: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const findExistingUser = await db.auth.user_login([email])

    if (!findExistingUser[0]) {
      return res.status(401).send('User does not exist with this email')
    } 

    const authedUser = bcrypt.compareSync(password, findExistingUser[0].password)

    if (authedUser) {

      req.session.user = [
        { 
          id: findExistingUser[0].id, 
          name: findExistingUser[0].name, 
          email: findExistingUser[0].email
        }
      ]
      
      return res.status(200).send(req.session.user)
      
    } else {
      return res.status(401).send('Incorrect email or password')
    }
  }, 


  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(401)
    }
  }, 
  userLogout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
}