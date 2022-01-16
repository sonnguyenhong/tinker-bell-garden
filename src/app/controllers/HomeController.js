const Event = require('../models/hoatdong')
class HomeController {

    // [GET] /admin
    index(req, res, next) {
        Event.findOne({ startDate: { $lte: Date.now() }, endDate: { $gte: Date.now() } }).lean()
            .then(event => {
                if (!event) {
                    const event = {
                        imageUrl: './img/khu-vui-choi-ha-noi-nemtv-12.jpg',
                        name: 'Sự kiện đặc biệt',
                        eventInfo: 'Hiện tại chưa có sự kiện đặc biệt',
                        numberOfDiscountCode: 0,
                        currentNumofDiscountCode: 0
                    }
                    res.render('admin/admin', {
                        event: event,
                        hasEvent: false
                    })

                } else {
                    console.log(event)
                    res.render('admin/admin', {
                        event: event,
                        hasEvent: true
                    })
                }
            })
            .catch(err => next(err))
    }

}

module.exports = new HomeController