const axios = require('axios')
const sendText = async (req, res) => {
    let {text, channel, from_} = req.body;
    const url_rc_login = process.env.URL_RC_LOGIN,
        username_bot = process.env.USERNAME_BOT,
        password_bot = process.env.PASSWORD_BOT,
        url_rc_post_message = process.env.URL_RC_POST_MESSAGE;

    const response_login = await axios.post(
        url_rc_login + "",
        {
            "user": username_bot,
            "password": password_bot
        }
    )

    const {userId, authToken} = response_login.data.data;

    const responseText = await filterText(text.trim())

    const response_post_message = await axios.post(
        url_rc_post_message,
        {
            "channel": "#" + channel,
            "text": `@${from_} ${responseText}`
        },
        {
            headers: {
                "X-Auth-Token": authToken,
                "X-User-Id": userId
            }
        }
    )

    if (response_post_message.data.success) {
        return res.status(200).json({"success": true})
    } else {
        return res.status(500).json({"success": false})
    }

}

const filterText = async (msg) => {
   
    console.log("------------", msg)
    try {
        const {data} = await axios
        .get(
            encodeURI("https://tuanxuong.com/api/simsimi/index.php?text=" + msg),
            {
                headers: {"Content-Type": "application/json;charset=UTF-8"}
            })
            console.log(data)
            if(data.response)
            return unescape(data.response) ;
    } catch(e) {
        console.log(e.toString())
        return "Lỗi rồi :(("
    }
    

        return "";
    
}

module.exports = {
    sendText: sendText
}
