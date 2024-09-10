const tokenBot = ""
const secretBot = ""
const pathBot = "/"
const teleApi = "https://api.telegram.org/bot" + tokenBot

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === pathBot) {
      if (request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== secretBot) {
        return new Response("Unauthorized", { status: 403 });
      }
      
      const update = await request.json();
      const message = update.message
      const text = message.text

      await fetch(
          teleApi + "/sendMessage" , {
          method: "POST",
          headers: {
              "content-type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            "chat_id": update.message.chat.id,
            "text": "receive " + text
          })
      })
      
      return new Response("Ok");
    }

    return new Response('Bot work');
  },
};