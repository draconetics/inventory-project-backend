import {Router} from 'express'
import {
  getBrandList,
  getBrandById,
  updateBrandById,
  createBrand,
  deleteBrandById
} from '../controllers/brand.controller'


const router = Router();

router.get('/api/brands', getBrandList);
router.get('/api/brands/:id', getBrandById);
router.put('/api/brands/:id', updateBrandById)
router.post('/api/brands', createBrand);
router.delete('/api/brands/:id', deleteBrandById);



export default router;