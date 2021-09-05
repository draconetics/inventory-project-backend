import {Router} from 'express'
import {
    createSale,
    getSaleById,
    getSaleList,
    updateSale,
    deleteSaleById
} from '../controllers/sale.controller';


const router = Router();

router.get('/api/sales', getSaleList);
router.post('/api/sales', createSale);
router.get('/api/sales/:id', getSaleById);
router.put('/api/sales', updateSale);
router.delete('/api/sales/:id', deleteSaleById); 
 


export default router;