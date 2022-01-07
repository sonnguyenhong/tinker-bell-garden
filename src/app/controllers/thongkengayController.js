const Donhangve = require('../models/donhangve')
const Khachhangvip = require('../models/khachhangvip')
const Mathang = require('../models/mathang')
const Donhang = require('../models/donhang')

function getDateFromTimeStamp(str){
    var year = str.slice(11,15);
    var month = str.slice(4,7);
    var day = str.slice(8,10);
    if(month == 'Jan') month = '01';
    if(month == 'Feb') month = '02';
    if(month == 'Mar') month = '03';
    if(month == 'Apr') month = '04';
    if(month == 'May') month = '05';
    if(month == 'June') month = '06';
    if(month == 'July') month = '07';
    if(month == 'Aug') month = '08';
    if(month == 'Sept') month = '09';
    if(month == 'Oct') month = '10';
    if(month == 'Nov') month = '11';
    if(month == 'Dec') month = '12';
    return year+'-'+month+'-'+day;
}
function getDateFromBody(str){
    var year = str.slice(0,4);
    var month = str.slice(5,7);
    var day = str.slice(8,10);
    return {
        day: day,
        month: month,
        year: year,
    }
}
var { mutipleMongooseToObject } = require('../../util/mongoose')
var { mongooseToObject } = require('../../util/mongoose');
var khachhangvip = require('../models/khachhangvip');
class thongkengayController {
     // [POST] /admin/thongkengay
    async getTicketStats(req, res, next){
        console.log(req.body);
        //bán vé
        var totalProfit = 0;
        var totalProductProfit = 0;
        var totalTicketProfit = 0;
        var numberOfVipTicket = 0;
        var numberOfNormalTicket = 0;
        var ticket = [];
        var arr = await Donhangve.find({});
        {
            var selectedDate  = req.body.selectedDay;
            for(let i = 0 ; i < arr.length ; i++){
                if(selectedDate == getDateFromTimeStamp(arr[i].createdAt.toString()) ){
                    totalTicketProfit+= arr[i].price;
                    var phone = (arr[i].phoneNum);
                    var temp =await Khachhangvip.findOne({phoneNumber: phone});
                    var checkVip = false;
                    if(temp) {
                        numberOfVipTicket++;
                        checkVip = true;
                    }
                    else {
                        numberOfNormalTicket++;
                        checkVip = false;
                    }
                    ticket.push(arr[i]);
                }
            }
        }
        //bán hàng
        var mathangs = await Mathang.find({});
       // return res.json(arr2);
        var productsPrice = {};
        var productsProfit = {};
        var productsName  = {};
        var productsIdList = [];
        var productsNumber = {};
        for(var i = 0 ; i < mathangs.length ; i++){
            var id =  mathangs[i]._id;
            var price = mathangs[i].price;
            var name = mathangs[i].name;
            // productsPrice.push({
            //     id: id,
            //     price: price
            // });
            productsIdList.push(id);
            productsPrice[id] = price;
            productsProfit[id] = 0;
            productsNumber[id] = 0;
            productsName[id] = name;
        }
        var donhangs = await Donhang.find({});
        var donHangThongKe = [];
        for(var i = 0 ; i < donhangs.length ; i++){
            var selectedDate  = req.body.selectedDay;
            if(selectedDate == getDateFromTimeStamp(donhangs[i].createdAt.toString())){
                donHangThongKe.push(donhangs[i]);
            }
        }
        for(var i = 0 ; i < donHangThongKe.length ; i++){
            for(var j = 0 ; j < donHangThongKe[i].products.length ; j++){
                var id = donHangThongKe[i].products[j].productId;
                var quantity = donHangThongKe[i].products[j].quantity;
                productsProfit[id] += productsPrice[id]*quantity;
                productsNumber[id] += quantity;
                totalProductProfit+= productsProfit[id];
            }
        }
        
        var thongKeBanHang = [];
        for(const id of productsIdList){
            var temp = {
                name: productsName[id],
                number: productsNumber[id],
                profit: productsProfit[id],
            }
            thongKeBanHang.push(temp);
        }
        



        totalProfit = totalTicketProfit + totalProductProfit;
        //console.log(arr);
        //return res.send('ok');
        ticket = mutipleMongooseToObject(ticket);
        
        return res.render('thongke/stats',{
            totalTicketProfit: totalTicketProfit,
            totalProductProfit: totalProductProfit,
            totalProfit: totalProfit,
            numberOfVipTicket: numberOfVipTicket,
            numberOfNormalTicket: numberOfNormalTicket,
            ticket: ticket,
            product: thongKeBanHang,
        });




        //bán hàng
        var totalProductProfit = 0;
        console.log(totalTicketProfit + 'ok');
    }

     // [GET] /admin/thongkengay
    showTicketStats(req, res, next){
        res.render('thongke/stats');
    }

}

module.exports = new thongkengayController();