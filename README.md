# Simple-Discord-Bot

This is just a Simple Discord Bot that runs on Node JS. 

The bot is open source as it's on Github for everyone to use and modify.

## Getting Started

To get the bot up and running download the source code and following the next few steps.

1. Install the required packages
    ```bash
    npm install
    ```
2. Copy the file `.env.example` and name it `.env`
3. Fill all values in the `.env` file
   - You need to go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a bot (if you don't have one yet)
   - Goto the "General Information" page and copy the "Application ID" and paste it as the `DISCORD_APPID`.
   - Goto the "Bot" page and click on _Copy_ found in the Token area, then paste that as the `DISCORD_TOKEN`.
4. Ready to start programming a bot!
    To start the bot you can run `npm start`, wait a moment till you see _Authentication Complete!_

## Configuration

To configure the bot you can use a dot env file for setup of your Bot token.
**Do not commit your secrets to GitHub!  Use the `.env` file!**

## How to use

Everything in this project uses the concept of "plugins" for the commands.

You can create and add your own commands by creating a new JS file in the "plugins" (found in src/plugins) folder.

The file gets automatically loaded when the server starts up.
Be sure to take a look at the other plugins that already in this project to see how to create a new one.
