const nodemailer = require('nodemailer');

//Send email confirm register user
exports.sendEmailRegisterUser = async (email, userName) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'trongdatdo363@gmail.com',
            pass: 'rfrcowkmloleoctn'
        }
    });

    var mainOptions = {
        from: 'trongdatdo363@gmail.com',
        to: email,
        subject: 'Xác nhận đăng ký tài khoản',
        text: `Bạn đã đăng ký tài khoản thành công trên hệ thống với email là: ${email}`,
    }

    return await transporter.sendMail(mainOptions);
}
   