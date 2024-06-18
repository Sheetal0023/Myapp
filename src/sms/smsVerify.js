const phoneToken = require('generate-sms-verification-code')

const smsSid = process.env.SMS_SID 
const smsToken = process.env.SMS_TOKEN
const client = require('twilio')(smsSid, smsToken);

const smsOTP = () => {
     return genToken = phoneToken(5, {type: 'number'})
}



const sendMessage = async (otp, phonenumber) => {
  try{
    await client.messages
    .create({
    body: `Task-Manager-APP: OTP ${otp} to reset your password`,
    to: `+91${phonenumber}`, // Text your number
    from: '+15087196849', // From a valid Twilio number
})
  } catch(e) {
    console.log(e)
  }
 
 
}



module.exports = {
    smsOTP,
    sendMessage
}