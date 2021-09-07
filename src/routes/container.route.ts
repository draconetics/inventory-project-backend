import {Router} from 'express'
import {
  getContainerList,
  getContainerById,
  updateContainerById,
  createContainer,
  deleteContainerById,
  getAvailableProductById
} from '../controllers/container.controller'


const router = Router();

router.get('/api/containers', getContainerList);
router.get('/api/containers/:id', getContainerById);
router.get('/api/containers/product/:id', getAvailableProductById);
router.put('/api/containers/:id', updateContainerById)
router.post('/api/containers', createContainer);
router.delete('/api/containers/:id', deleteContainerById);



export default router;