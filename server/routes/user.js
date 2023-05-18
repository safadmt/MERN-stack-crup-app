import express from 'express';
import multer from 'multer';
import {registerUser,getOneUser, getUsers, updateUser, deleteUser} from '../controller/userController.js';
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images');
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage:storage});

router.get("/", getUsers );
router.post('/register' , upload.single('image'), registerUser);
router.get("/:id", getOneUser);
router.put("/:id",upload.single('image'), updateUser);
router.delete('/:id' ,deleteUser);

export default router;