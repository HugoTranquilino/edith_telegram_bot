require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log("Bot iniciado...");
console.log("API URL:", process.env.API_URL);

bot.on("message", async (msg) => {
	console.log("mensaje recibido: ", msg.text);
  const chatId = msg.chat.id;

  try {
    const res = await axios.post(process.env.API_URL + "/chat", {
      prompt: msg.text
    });

		console.log("Respuesta del API: ", res.data)

    bot.sendMessage(chatId, res.data.reply);
  } catch (err) {
		console.error("Error: ", err.message)
		console.error(err.response?.data)
		
    bot.sendMessage(chatId, "Error 😢");
  }
});