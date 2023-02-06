const bcrypt = require('bcryptjs');

const { sendEmailRegisterUser } = require('../../helpers/emailHelpers');
const User = require('../../models/user/user.model');
exports.register = async (data, portal) => {
    let { name, email, password } = data;

    let account = await User.findOne({
        email: email
    });
    if (account) {
        throw Error('account_existed')
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.create({
        ...data, password: hashPassword
    });

    await sendEmailRegisterUser(email, name);
    return { user }
}
exports.getDetailUser = async (id, portal) => {

    let user = await User.findById(id);

    if (!user) {
        throw Error('user_is_not_existed');
    }

    return { user }
}
exports.updateUser = async (id, data) => {

    let currentUser = await User.findById(id)
    if (!currentUser) {
        throw Error('user_is_not_existed');
    }

    // console.log(data.role);
    let user = await User.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { user }
}
exports.deleteUser = async (id) => {

    let user = await User.findByIdAndDelete(id)

    return { user }
}

exports.getAllUsers = async (query, portal) => {
    let { page, limit, name, email, phone, role } = query;
    let option = {};

    //Set query data
    if (name) option.name = new RegExp(name, "i")
    if (email) option.email = new RegExp(email, "i")
    if (phone) option.phone = new RegExp(phone, "i")
    if (role) option.role = role


    if (!page || !limit) {
        let allUsers = await User
            .find(option)
            .sort({ createdAt: 'desc' })

        return { allUsers }
    } else {
        let allUsers = await User.paginate(option, {
            page,
            limit,
            sort: { 'createdAt': 'desc' }
        })

        return { allUsers }
    }
}
exports.getHomesOfUser = async (id, query, portal) => {
    let { page, limit } = query;
    let option = {}
    // if (status) option.status = status
    // if (type) option.type = type
    // if (vipPoint) option.vipPoint = { $gte: 1 }
    // if (vip && expiration) {
    //     option.vipPoint = 0;
    //     option.fee = { $gte: 1 }
    // }
    //pagination homes in user
    let startIndex = limit * (page - 1);
    let endIndex = limit * page;
    // option.homes = { $slice: [startIndex, endIndex] }
    let user = await User
        .findById(id)
        .populate([{
            path: "homes",
            // match: option,
            // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
            populate: [{
                path: "owner"
            },
            // {
            //     path: "devices"
            // },
            // {
            //     path: "sensors"
            // },
        ]
        }])
    let { homes } = await User.findById(id).populate([{
        path: "homes",
        // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
        populate: [{
            path: "owner"
        },
        // {
        //     path: "devices"
        // },
        // {
        //     path: "sensors"
        // },
        ]
    }]);
    if (!user) {
        throw Error('user_is_not_existed');
    }

    if (!homes) {
        throw Error('home_of_user_is_empty');
    }

    let totalDocs = homes?.length;
    let listHomes = user.homes.sort((a, b) => b.createdAt - a.createdAt).slice(startIndex, endIndex)

    let homesOfUser = {
        docs: listHomes,
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        limit,
        page
    }
    // console.log(homesOfUser);
    return { homesOfUser }
}