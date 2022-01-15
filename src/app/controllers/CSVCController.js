const KhuVuiChoi = require('../models/khuvuichoi');
const CSVC = require('../models/cosovatchat');
const mongoose = require('mongoose');
const path = require("path");

/*  Method     |     Duong dan                                                   |          Mo ta
__________________________________________________________________________________________________________________________-
     GET       |     /admin/khuvuichoi                                           |      Xem danh ds khu vui choi
     GET       |     /admin/khuvuichoi/new                                       |      Form them khu vui choi
     POST      |     /admin/khuvuichoi                                           |      Tao moi 1 khu vui choi
     GET       |     /admin/khuvuichoi/:id_khuvuichoi                            |      Xem chi tiet 1 khu vui choi
     GET       |     /admin/khuvuichoi/:id_khuvuichoi/edit                       |      Form sua khu vui choi
     POST      |     /admin/khuvuichoi/:id_khuvuichoi                            |      Them CSVC cho khu vui choi
     POST      |     /admin/khuvuichoi/:id_khuvuichoi?action=action              |      Sua, xoa CSVC
     GET       |     /admin/khuvuichoi/:id_khuvuichoi/:id_csvc                   |      Xem chi tiet CSVC
     GET       |     /admin/khuvuichoi/:id_khuvuichoi/:id_csvc/edit              |      Form sua CSVC
     POST      |     /admin/khuvuichoi/:id_khuvuichoi/:id_csvc?action=action     |      Sua, xoa CSVC
*/
class CSVCController {
    // Lay danh sach khu vui choi
    async getKhuVuiChoi(req, res, next) {
            try {
                const KhuVuiChoiList = await KhuVuiChoi.find({}).lean();
                const CSVCList = await CSVC.find({}).populate('khuvuichoi').lean();
                //console.log(KhuVuiChoiList, CSVCList)
                res.render('khu-vui-choi/danh-sach-khu-vui-choi', { KhuVuiChoiList, CSVCList });
            } catch (err) {
                next(err);
            }
        }
        // Hien thi form them khu vui choi
    createKhuVuiChoiForm(req, res) {
            res.render('khu-vui-choi/them-khu-vui-choi');
        }
        // Tao moi 1 khu vui choi
    async createKhuVuiChoi(req, res, next) {
            try {
                const { id } = req.params;
                const khuvuichoi = new KhuVuiChoi(req.body);
                await khuvuichoi.save();
                res.redirect('/admin/khuvuichoi');
            } catch (err) {
                next(err);
            }
        }
        // Xem chi tiet 1 khu vui choi
    async getKhuVuiChoiDetail(req, res, next) {
            try {
                const { id } = req.params;
                const khuvuichoi = await KhuVuiChoi.findById(id).populate('CSVC').lean();
                res.render('khu-vui-choi/chi-tiet-khu-vui-choi', { khuvuichoi });
            } catch (err) {
                next(err);
            }
        }
        // Sua chi tiet 1 khu vui choi
    async updateKhuVuiChoiForm(req, res, next) {
        try {
            const { id } = req.params;
            const khuvuichoi = await KhuVuiChoi.findById(id).lean();
            res.render('khu-vui-choi/sua-khu-vui-choi', { khuvuichoi })
        } catch (err) {
            next(err);
        }
    }
    async updateKhuVuiChoi(req, res, next) {
            try {
                const { id } = req.params;
                await KhuVuiChoi.findByIdAndUpdate(id, req.body);
                res.redirect(`/admin/khuvuichoi/${id}`);
            } catch (err) {
                next(err);
            }
        }
        // Xoa 1 khu vui choi
    async deleteKhuVuiChoi(req, res, next) {
            try {
                const { id } = req.params;
                await KhuVuiChoi.findByIdAndDelete(id, req.body);
                res.redirect('/admin/khuvuichoi');
            } catch (err) {
                next(err);
            }
        }
        // Xem chi tiet CSVC
    async CSVCDetail(req, res, next) {
            try {
                const { id, idCsvc } = req.params; // id cua KhuVuiChoi
                const csvc = await CSVC.findById(idCsvc).lean();
                res.render('csvc/chi-tiet-csvc', { csvc, id });
            } catch (err) {
                next(err);
            }
        }
        // Tao moi CSVC
    createCSVCform(req, res) {
        const { id } = req.params;
        res.render('csvc/them-csvc', { id });
    }
    async createCSVC(req, res, next) {
            try {
                const { id } = req.params; // id cua KhuVuiChoi
                const khuvuichoi = await KhuVuiChoi.findById(id);
                const { name, code, status, img } = req.body;
                const csvc = new CSVC({
                    name: name,
                    code: code,
                    status: status,
                    imageUrl: img
                });
                csvc.khuvuichoi = khuvuichoi;
                khuvuichoi.CSVC.push(csvc); // them CSVC vao danh sach CSVC cua khu vui choi
                await csvc.save();
                await khuvuichoi.save();
                res.redirect(`/admin/khuvuichoi/${id}`);
            } catch (err) {
                next(err);
            }
        }
        // Sua 1 CSVC
    async updateCSVCform(req, res, next) {
        try {
            const {id} = req.params; // id cua KhuVuiChoi
            const khuvuichoi = await KhuVuiChoi.findById(id);
            const {name, code, status, img} = req.body;
            const image = req.files.image;
            // return res.send(req.files.image)
            //res.send(req.body);
            let url = path.resolve(__dirname);
            url = url.replace('\\app\\controllers', '\\public\\img');
            image.mv(path.resolve(url, image.name),  async () => {
                const csvc = new CSVC({
                    name: name,
                    code: code,
                    status: status,
                    imageUrl: '/img/' + image.name
                });
                csvc.khuvuichoi = khuvuichoi;
                khuvuichoi.CSVC.push(csvc); // them CSVC vao danh sach CSVC cua khu vui choi
                await csvc.save();
                await khuvuichoi.save();
                res.redirect(`/admin/khuvuichoi/${id}`);
            });
        } catch (err) {
            next(err)
        }
    }
    async updateCSVC(req, res, next) {
        try {
            const {id, idCsvc} = req.params; // id cua KhuVuiChoi
            await CSVC.findByIdAndUpdate(idCsvc, req.body);
            if (req.files.image) {
                const image = req.files.image;
                let url = path.resolve(__dirname);
                url = url.replace('\\app\\controllers', '\\public\\img');
                image.mv(path.resolve(url, image.name),  async () => {
                    await CSVC.findByIdAndUpdate(idCsvc, {imageUrl: '/img/' + image.name});
                });
            }
            res.redirect(`/admin/khuvuichoi/${id}`);
        } catch (err) {
            next(err);
        }
    }
        // Xoa 1 CSVC
    async deleteCSVC(req, res, next) {
        try {
            const { id, idCsvc } = req.params; // id cua KhuVuiChoi
            await CSVC.findByIdAndDelete(idCsvc, req.body);
            res.redirect(`/admin/khuvuichoi/${id}`);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CSVCController();