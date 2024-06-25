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
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const input_category = interaction.options.getString("category")!;
    const input_amount = interaction.options.getNumber("amount")!;
    const input_remark = interaction.options.getString("remarks");

    const userId = interaction.user.id;
    if (userId !== "520790514455412806" && userId !== "152047328524632065") {
      await interaction.editReply("David fuck off");
      return;
    }
    await prisma.expense.create({
      data: {
        amount: input_amount,
        remark: input_remark,
        category: { connect: { name: input_category } },
      },
    });
    await interaction.editReply(
      `Added expense ${input_category} $${input_amount}${
        input_remark ? ` ${input_remark}` : ""
      }`,
    );
  },
};
