import {Router} from 'express'
import {
  createClient,
  deleteClientById,
  getClientById,
  getClientList,
  updateClientById,
} from '../controllers/client.controller'


const router = Router();

router.get('/api/clients', getClientList);
router.post('/api/clients', createClient);
router.get('/api/clients/:id', getClientById);
router.put('/api/clients/:id', updateClientById)
router.delete('/api/clients/:id', deleteClientById);

export default router;