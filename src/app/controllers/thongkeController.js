const Donhangve = require('../models/donhangve')
const Khachhangvip = require('../models/khachhangvip')
const Mathang = require('../models/mathang')
const Donhang = require('../models/donhang')

function getDayFromTimeStamp(str) {

    return str.slice(8, 10);
}

function getDateFromTimeStamp(str) {
    var year = str.slice(11, 15);
    var month = str.slice(4, 7);
    var day = str.slice(8, 10);
    if (month == 'Jan') month = '01';
    if (month == 'Feb') month = '02';
    if (month == 'Mar') month = '03';
    if (month == 'Apr') month = '04';
    if (month == 'May') month = '05';
    if (month == 'June') month = '06';
    if (month == 'July') month = '07';
    if (month == 'Aug') month = '08';
    if (month == 'Sept') month = '09';
    if (month == 'Oct') month = '10';
    if (month == 'Nov') month = '11';
    if (month == 'Dec') month = '12';
    return year + '-' + month + '-' + day;
}

function getMonthFromTimeStamp(str) {
    var year = str.slice(11, 15);
    var month = str.slice(4, 7);
    if (month == 'Jan') month = '01';
    if (month == 'Feb') month = '02';
    if (month == 'Mar') month = '03';
    if (month == 'Apr') month = '04';
    if (month == 'May') month = '05';
    if (month == 'June') month = '06';
    if (month == 'July') month = '07';
    if (month == 'Aug') month = '08';
    if (month == 'Sept') month = '09';
    if (month == 'Oct') month = '10';
    if (month == 'Nov') month = '11';
    if (month == 'Dec') month = '12';
    return year + '-' + month;
}
var { mutipleMongooseToObject } = require('../../util/mongoose')
var { mongooseToObject } = require('../../util/mongoose');
var khachhangvip = require('../models/khachhangvip');
const donhangve = require('../models/donhangve');
class thongkeController {
    // [POST] /admin/thongkengay
    async getDayStats(req, res, next) {
        //console.log(req.body);
        //bán vé
        var totalProfit = 0;
        var totalProductProfit = 0;
        var totalTicketProfit = 0;
        var numberOfVipTicket = 0;
        var numberOfNormalTicket = 0;
        var ticket = [];
        var arr = await Donhangve.find({}); {
            var selectedDate = req.body.selectedDay;
            for (let i = 0; i < arr.length; i++) {
                if (selectedDate == getDateFromTimeStamp(arr[i].createdAt.toString())) {
                    totalTicketProfit += arr[i].price;
                    var phone = (arr[i].phoneNum);
                    var temp = await Khachhangvip.findOne({ phoneNumber: phone });
                    var checkVip = false;
                    if (temp) {
                        numberOfVipTicket++;
                        checkVip = true;
                    } else {
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
        var productsName = {};
        var productsIdList = [];
        var productsNumber = {};
        for (var i = 0; i < mathangs.length; i++) {
            var id = mathangs[i]._id;
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
        for (var i = 0; i < donhangs.length; i++) {
            var selectedDate = req.body.selectedDay;
            if (selectedDate == getDateFromTimeStamp(donhangs[i].createdAt.toString())) {
                donHangThongKe.push(donhangs[i]);
            }
        }
        for (var i = 0; i < donHangThongKe.length; i++) {
            for (var j = 0; j < donHangThongKe[i].products.length; j++) {
                var id = donHangThongKe[i].products[j].productId;
                var quantity = donHangThongKe[i].products[j].quantity;
                productsProfit[id] += productsPrice[id] * quantity;
                productsNumber[id] += quantity;
                totalProductProfit += productsProfit[id];
            }
        }

        var thongKeBanHang = [];
        for (const id of productsIdList) {
            if(productsProfit[id] > 0){
                var temp = {
                    name: productsName[id],
                    number: productsNumber[id],
                    profit: productsProfit[id].toFixed(0),
                }
                thongKeBanHang.push(temp);
            }
        }



        totalProfit = totalTicketProfit + totalProductProfit;
        //console.log(arr);
        //return res.send('ok');
        ticket = mutipleMongooseToObject(ticket);

        return res.render('thongke/thongkengay', {
            totalTicketProfit: totalTicketProfit.toFixed(0),
            totalProductProfit: totalProductProfit.toFixed(0),
            totalProfit: totalProfit.toFixed(0),
            numberOfVipTicket: numberOfVipTicket,
            numberOfNormalTicket: numberOfNormalTicket,
            ticket: ticket,
            product: thongKeBanHang,
        });




        //bán hàng
    }

    // [GET] /admin/thongke/thongkengay
    showDayStats(req, res, next) {
        res.render('thongke/thongkengay');
    }

    // [GET] /admin/thongke/thongkethang
    showMonthStats(req, res, next) {
        res.render('thongke/thongkethang');
    }

    async getMonthStats(req, res, next) {
        //console.log(req.body);
        var khachhangvips = await Khachhangvip.find({});
        var vipList = {};
        for (let i = 0; i < khachhangvips.length; i++) {
            vipList[khachhangvips[i].phoneNumber] = true;
        }

        var totalProfit = 0;
        var totalTicketProfit = 0;
        var numberOfVipTicket = 0;
        var numberOfNormalTicket = 0;
        var hourTicketProfit = 0;
        var dayTicketProfit = 0;
        // var dayArray = ['01','02','03','04','05','06','07','08','09','10',
        //                 '11','12','13','14','15','16','17','18','19','20',
        //                 '21','22','23','24','25','26','27','28','29','30','31'];
        var dayArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
        ];
        var profitOfDayMap = {};
        //init MAP
        for (const str of dayArray) {
            profitOfDayMap[str] = 0;
        }
        var donhangves = await Donhangve.find({});
        for (let i = 0; i < donhangves.length; i++) {
            if (getMonthFromTimeStamp(donhangves[i].createdAt.toString()) == req.body.selectedMonth.toString()) {
                if (vipList[donhangves[i].phoneNum] == true) {
                    numberOfVipTicket++;
                    // console.log(donhangves[i].phoneNum  + '  VIP')
                } else {
                    vipList[donhangves[i].phoneNum] = false;
                    numberOfNormalTicket++;
                    // console.log(donhangves[i].phoneNum  + '  NO VIP')
                }
                if (donhangves[i].ticketType === 0) {
                    hourTicketProfit += donhangves[i].price;
                } else {
                    dayTicketProfit += donhangves[i].price;
                }
                totalTicketProfit += donhangves[i].price;
                var day = getDayFromTimeStamp(donhangves[i].createdAt.toString());

                profitOfDayMap[Number(day)] += donhangves[i].price;
                //console.log(day);        
            }
        }
        //console.log(profitOfDayMap);
        var profitOfDayArray = [];
        profitOfDayArray.push(['0', 'Page Views']);
        for (let i = 1; i <= 31; i++) {
            profitOfDayArray.push([i, profitOfDayMap[i]]);
        }


        //bán hàng
        var totalProductProfit = 0;
        var mathangs = await Mathang.find({});
        // return res.json(arr2);
        var productsPrice = {};
        var productsProfit = {};
        var productsName = {};
        var productsIdList = [];
        var productsNumber = {};
        for (var i = 0; i < mathangs.length; i++) {
            var id = mathangs[i]._id;
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
        for (var i = 0; i < donhangs.length; i++) {
            var selectedMonth = req.body.selectedMonth;
            if (selectedMonth == getMonthFromTimeStamp(donhangs[i].createdAt.toString())) {
                donHangThongKe.push(donhangs[i]);
            }
        }
        for (var i = 0; i < donHangThongKe.length; i++) {
            for (var j = 0; j < donHangThongKe[i].products.length; j++) {
                var id = donHangThongKe[i].products[j].productId;
                var quantity = donHangThongKe[i].products[j].quantity;
                productsProfit[id] += productsPrice[id] * quantity;
                productsNumber[id] += quantity;
                totalProductProfit += productsProfit[id];
            }
        }
        

        var thongKeBanHang = [];
        for (const id of productsIdList) {
            if(productsProfit[id] > 0 ){
                var temp = {
                    name: productsName[id],
                    number: productsNumber[id],
                    profit: productsProfit[id].toFixed(0),
                }
                thongKeBanHang.push(temp);
            }
        }


        totalProfit = totalProductProfit + totalTicketProfit;

        // Khách hàng ưu tiên.
        var phoneNumberList = {};
        for (let i = 0; i < donhangves.length; i++) {
            if (selectedMonth == getMonthFromTimeStamp(donhangves[i].createdAt.toString())) {
                phoneNumberList[donhangves[i].phoneNum] = 0;
            }
        }
        for (let i = 0; i < donhangves.length; i++) {
            if (selectedMonth == getMonthFromTimeStamp(donhangves[i].createdAt.toString())) {
                phoneNumberList[donhangves[i].phoneNum] += donhangves[i].price;
            }
        }
        var sortable = [];
        for (var customer in phoneNumberList) {
            sortable.push([customer, phoneNumberList[customer].toFixed(0)]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        sortable = sortable.slice(0, 3);
        var regularCustomer = [];
        for (let i = 0; i < sortable.length; i++) {
            regularCustomer.push({
                phone: sortable[i][0],
                money: sortable[i][1]
            })
        }
        //console.log(regularCustomer);
        return res.render('thongke/thongkethang', {
            vip: numberOfVipTicket,
            novip: numberOfNormalTicket,
            hourTicketProfit: hourTicketProfit.toFixed(0),
            dayTicketProfit: dayTicketProfit.toFixed(0),
            one: profitOfDayMap[1].toFixed(0),
            two: profitOfDayMap[2].toFixed(0),
            three: profitOfDayMap[3].toFixed(0),
            four: profitOfDayMap[4].toFixed(0),
            five: profitOfDayMap[5].toFixed(0),
            six: profitOfDayMap[6].toFixed(0),
            seven: profitOfDayMap[7].toFixed(0),
            eight: profitOfDayMap[8].toFixed(0),
            nine: profitOfDayMap[9].toFixed(0),
            ten: profitOfDayMap[10].toFixed(0),
            one1: profitOfDayMap[11].toFixed(0),
            two1: profitOfDayMap[12].toFixed(0),
            three1: profitOfDayMap[13].toFixed(0),
            four1: profitOfDayMap[14].toFixed(0),
            five1: profitOfDayMap[15].toFixed(0),
            six1: profitOfDayMap[16].toFixed(0),
            seven1: profitOfDayMap[17].toFixed(0),
            eight1: profitOfDayMap[18].toFixed(0),
            nine1: profitOfDayMap[19].toFixed(0),
            ten1: profitOfDayMap[20].toFixed(0),
            one2: profitOfDayMap[21].toFixed(0),
            two2: profitOfDayMap[22].toFixed(0),
            three2: profitOfDayMap[23].toFixed(0),
            four2: profitOfDayMap[24].toFixed(0),
            five2: profitOfDayMap[25].toFixed(0),
            six2: profitOfDayMap[26].toFixed(0),
            seven2: profitOfDayMap[27].toFixed(0),
            eight2: profitOfDayMap[28].toFixed(0),
            nine2: profitOfDayMap[29].toFixed(0),
            ten2: profitOfDayMap[30].toFixed(0),
            one3: profitOfDayMap[31].toFixed(0),
            totalProductProfit: totalProductProfit.toFixed(0),
            products: thongKeBanHang,
            totalTicketProfit: totalTicketProfit.toFixed(0),
            totalProfit: totalProfit.toFixed(0),
            regularCustomer: regularCustomer,
        })
    }

}

module.exports = new thongkeController();