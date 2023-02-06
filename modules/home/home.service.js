const Home = require('../../models/home/home.model')

const User = require('../../models/user/user.model')

exports.createHome = async (data) => {

    //Them nha vao db
    let newHome = await Home.create({ ...data });
    let home = await Home.findById({ _id: newHome._id });
    let userInfo = await User.findById(data.owner);
    //Them vao danh sach home cua nguoi dang
    if (userInfo) {
        userInfo.homes.push(newHome._id);
        await userInfo.save();
    }


    return { home }
}
exports.getAllHomes = async (query) => {
    let { page, limit, type, categories, address, province, district, ward,
        direction, priceFrom, priceTo, acreageFrom, acreageTo,
        title, userName, userPhone, status, vipType, followsLength, follows } = query;
    let option = {};
    // console.log(query);
    //Set query option
    // if (type) option.type = type;
    // if (categories) option.categories = categories;
    // if (address) option.address = new RegExp(address, "i");
    // if (province) option.province = province;
    // if (district) option.district = district;
    // if (ward) option.ward = ward;
    // if (direction) option.direction = direction;
    // if (priceFrom && priceTo) option.price = { $gte: priceFrom, $lte: priceTo }
    // if (acreageFrom && acreageTo) option.acreage = { $gte: acreageFrom, $lte: acreageTo }
    // if (title) option.title = new RegExp(title, "i");
    // if (userName) option.userName = new RegExp(userName, "i");
    // if (userPhone) option.userPhone = new RegExp(userPhone, "i");
    // if (status) option.status = status;
    // if (vipType == 2) {
    //     option.vipPoint = { $lte: 0 }
    // } else if (vipType == 1) {
    //     option.vipPoint = { $gte: 1 }
    // }
    // // if (vipType) 
    // if (follows) option.follows = follows;
    // console.log(Object.keys(option.follows).length);
    // if (followsLength) Object.keys(option.follows).length = { $gte: followsLength }
    if (!page || !limit) {
        let allHomes = await Home
            .find(option)
            .populate([{
                path: "owner"
            },
            ])
            .sort({ createdAt: 'desc'})
        return { allHomes }
    } else {
        let allHomes = await Home.paginate(option, {
            page,
            limit,
            populate: [{
                path: "owner"
            }],
            sort: {'createdAt': -1 }
        })
        return { allHomes }
    }
}
exports.deleteHome = async (homeId, userId) => {

    let homeSelect = await Home.findById(homeId);
    let user = await User.findById(userId);

    let home = await Home.findByIdAndDelete(homeId);
    //Loại bỏ Home khỏi user

    let homes = [...user.homes || []];
    user.homes = homes.filter(p => p.toString() !== homeId);
    await user.save();

    return { home }
}

exports.getHomeForUpdate = async (homeId, userId) => {


    let user = await User.findById(userId);

    if (!user) {
        throw Error("User is not existing")
    }

    //Check home đó có phải của user này hay k
    let isHomeOfUser = user.homes.includes(homeId);

    if (!isHomeOfUser) {
        throw Error("you_can_not_access")
    }

    let home = await Home
        .findById(homeId)

    if (!home) {
        throw Error("Home is not existing")
    }
    return { home }
}

exports.updateHome = async (id, data) => {

    if (!data.name) {
        data.name = undefined;
    }
    if (!data.location) {
        data.location = undefined;
    }
    let home = await Home.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { home }
}
exports.getDetailHome = async (id) => {


    let home = await Home
        .findById(id)
        .populate([

            {
                path: "owner"
            },
            // {
            //     path: "devices"
            // },
            // {
            //     path: "sensors"
            // },
        ])

    if (!home) {
        throw Error("Home is not existing")
    }
    return { home }
}

exports.getDevicesOfHome = async (id, query, portal) => {
    let { page, limit } = query;
    let option = {}
    // if (status) option.status = status
    // if (type) option.type = type
    // if (vipPoint) option.vipPoint = { $gte: 1 }
    // if (vip && expiration) {
    //     option.vipPoint = 0;
    //     option.fee = { $gte: 1 }
    // }
    //pagination devices in home
    let startIndex = limit * (page - 1);
    let endIndex = limit * page;
    // option.devices = { $slice: [startIndex, endIndex] }
    let home = await Home
        .findById(id)
        .populate([{
            path: "devices",
            // match: option,
            // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
            populate: [{
                path: "homeId"
            },
            // {
            //     path: "devices"
            // },
            // {
            //     path: "sensors"
            // },
        ]
        }])
    let { devices } = await Home.findById(id).populate([{
        path: "devices",
        // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
        populate: [{
            path: "homeId"
        },
        // {
        //     path: "devices"
        // },
        // {
        //     path: "sensors"
        // },
        ]
    }]);
    if (!home) {
        throw Error('home_is_not_existed');
    }

    if (!devices) {
        throw Error('device_of_home_is_empty');
    }

    let totalDocs = devices?.length;
    let listDevices = home.devices.sort((a, b) => b.createdAt - a.createdAt).slice(startIndex, endIndex)

    let devicesOfHome = {
        docs: listDevices,
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        limit,
        page
    }
    // console.log(devicesOfhome);
    return { devicesOfHome }
}

exports.getSensorsOfHome = async (id, query, portal) => {
    let { page, limit } = query;
    let option = {}
    // if (status) option.status = status
    // if (type) option.type = type
    // if (vipPoint) option.vipPoint = { $gte: 1 }
    // if (vip && expiration) {
    //     option.vipPoint = 0;
    //     option.fee = { $gte: 1 }
    // }
    //pagination sensors in home
    let startIndex = limit * (page - 1);
    let endIndex = limit * page;
    // option.sensors = { $slice: [startIndex, endIndex] }
    let home = await Home
        .findById(id)
        .populate([{
            path: "sensors",
            // match: option,
            // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
            populate: [{
                path: "homeId"
            },
            // {
            //     path: "sensors"
            // },
            // {
            //     path: "sensors"
            // },
        ]
        }])
    let { sensors } = await Home.findById(id).populate([{
        path: "sensors",
        // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
        populate: [{
            path: "homeId"
        },
        // {
        //     path: "sensors"
        // },
        // {
        //     path: "sensors"
        // },
        ]
    }]);
    if (!home) {
        throw Error('home_is_not_existed');
    }

    if (!sensors) {
        throw Error('sensor_of_home_is_empty');
    }

    let totalDocs = sensors?.length;
    let listSensors = home.sensors.sort((a, b) => b.createdAt - a.createdAt).slice(startIndex, endIndex)

    let sensorsOfHome = {
        docs: listSensors,
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        limit,
        page
    }
    // console.log(sensorsOfHome);
    return { sensorsOfHome }
}