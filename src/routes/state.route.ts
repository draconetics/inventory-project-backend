import {Router} from 'express'
import {
  getStateList,
  getStateById,
  updateStateById,
  createState,
  deleteStateById
} from '../controllers/state.controller'


const router = Router();

router.get('/api/states', getStateList);
router.get('/api/states/:id', getStateById);
router.put('/api/states/:id', updateStateById)
router.post('/api/states', createState);
router.delete('/api/states/:id', deleteStateById);



export default router;