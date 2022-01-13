const express = require('express');
const router = express.Router();
const CSVCController = require('../app/controllers/CSVCController');
const {route} = require("express/lib/router");

// /admin/khuvuichoi

                                /*      GET         */
router.get('/new', CSVCController.createKhuVuiChoiForm);
router.get('/:id/new', CSVCController.createCSVCform);
router.get('/:id/:idCsvc/delete', CSVCController.deleteCSVC);
router.get('/:id/:idCsvc/edit', CSVCController.updateCSVCform);
router.get('/:id/delete', CSVCController.deleteKhuVuiChoi);
router.get('/:id/edit', CSVCController.updateKhuVuiChoiForm);
router.get('/:id/:idCsvc', CSVCController.CSVCDetail);
router.get('/:id', CSVCController.getKhuVuiChoiDetail);
router.get('/', CSVCController.getKhuVuiChoi);

                                /*         POST     */
router.post('/:id/edit', CSVCController.updateKhuVuiChoi);
router.post('/:id/new', CSVCController.createCSVC);
router.post('/:id/:idCsvc/edit', CSVCController.updateCSVC);
router.post('/', CSVCController.createKhuVuiChoi);

module.exports = router;
