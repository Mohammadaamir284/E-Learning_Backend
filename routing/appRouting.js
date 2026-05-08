'Access-Control-Allow-Origin'
import express from 'express'
import { myAbout, mynewdbs , newUser , UserLogin, course, allUser} from '../Controls/appControl.js'
import { authMiddleware } from '../middleware/index.js'

const router = express.Router() 

router.get('/' , (req , res)=>{
    res.send("hello World")
})

router.get('/about' , myAbout)

router.get('/all' ,  authMiddleware , mynewdbs )
router.get('/course/:id'  , authMiddleware , course )
router.get('/allUser'  ,  allUser)

router.post('/userRegister' , newUser)
router.post('/userLogin' , UserLogin)

export default router