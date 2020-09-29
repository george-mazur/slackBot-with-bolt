const { App } = require("@slack/bolt");

const secret = '4924cdfbf4c4919736f54d5ba05788bc'
const token = 'xoxb-1415722560240-1392369371826-TinAwHnzGnyfSr6xFYfXhvgd'

const app = new App({
    token: token,
    signingSecret: secret
});

(async () => {
    await app.start(3007);
    console.log('⚡️ Bolt app is running!');
})();

app.message('hey', async ({ message, say }) => {
    await say(`Hey there <@${message.user}>!`);
});

app.message('show button', async ({ message, say }) => {
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hey there <@${message.user}>!`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me"
                    },
                    "action_id": "button_click"
                }
            }
        ],
        text: `Hey there <@${message.user}>!`
    });
});

app.action('button_click', async ({ body, ack, say }) => {
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});