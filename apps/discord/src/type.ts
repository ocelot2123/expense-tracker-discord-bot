import {
  type SlashCommandBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { type ChatInputCommandInteraction } from "discord.js";

export interface Command {
  data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
