import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds expense to database")
    .addStringOption((option) =>
      option.setName("category").setDescription("category").setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("amount").setDescription("amount in SGD").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("remarks")
        .setDescription("optional remarks about the spending")
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    console.log(interaction.options);
    await interaction.reply("added!");
  },
};
