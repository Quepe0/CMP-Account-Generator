# Instructions for using an account generator from CapMonster.

This account generator is based on the use of CapMonster to resolve reCAPTCHAs and designed to run on a popular site written in PHP, for which you pay $200. Here are sample sites that use this generator:

- [https://community.luktech.net/](https://community.luktech.net/)
- [https://li.v-rp.pl/](https://li.v-rp.pl/)

To properly configure the account generator, follow these steps:

1. navigate to the `config` folder.
2. run the `config.json` file in the editor.
3. Complete the configuration data in the `config.json` file according to the following instructions.
4. run the command line (cmd).
5. type the `npm i` command to install the necessary dependencies.
6. type the command `node get_sitekey.js` to get the site key.
7. complete the configuration data in the `config.json` file with the obtained site key.
8. type the `node .` command to start the account generator.
9. your accounts will be generated automatically.
10. If you want to avoid IP blocking, we recommend using proxy servers. You can add proxy support by modifying the generator code.

**Note:** Make sure you have Node.js and npm tools installed before running the generator.

With these instructions, you will be able to set up and run the account generator using CapMonster to resolve reCAPTCHAs. You can now enjoy automatic account generation on selected sites.
