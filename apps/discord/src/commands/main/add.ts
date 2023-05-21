import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { prisma } from "db";
import { type Command } from "../../type.js";

async function getCategories() {
  const categories = await prisma.category.findMany({ select: { name: true } });
  return categories.map((x) => ({ ...x, value: x.name }));
}

const categories = await getCategories();

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds expense to database")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("category")
        .setRequired(true)
        .addChoices(...categories),
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("amount in SGD")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("remarks")
        .setDescription("optional remarks about the spending"),
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    console.log(interaction.options);
    await interaction.reply("added!");
  },
};
