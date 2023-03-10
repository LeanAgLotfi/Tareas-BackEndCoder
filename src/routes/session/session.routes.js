const { Router } = require('express');

//PASSPORT STRATEGIS
const { SessionsController } = require('../../controllers/sessions.controllers');
const  passportCustom  = require('../../middleware/passport-custom');
//const passportGit = require('../../middleware/Oldpassport.middleware');
//const { authorization } = require('../../middleware/authorization');
//const { USER_ROLES } = require('../../constants/user.constants');


//const passport = require('../../utils/passport.config')

const router = Router()

//LOGIN--
router.post('/login', 
  SessionsController.login
)

router.get('/failLogin', (req,res)=>{
  res.send({error: 'Failed Login'})
})

//REGISTER--

router.post('/register',
  SessionsController.register
)

router.get('/failRegister', (req,res)=>{
  res.send({error: 'Failed Login'})
})

//GIT STRATEGY
router.get(
  '/github',
  passportCustom('github', { scope: ['user:email'] })
);
//GIT STRATEGY
router.get(
  '/github/callback',
  passportCustom('github', { failureRedirect: '/github-error' }),
  SessionsController.loginGithub
);

router.get('/logout', SessionsController.logout)

//CURRENT
router.get(
  '/current',
  passportCustom('jwt'),
  SessionsController.currentSession
);


module.exports = router;
