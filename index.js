const axios = require('axios');
const config = require('./config/config.json')

const sitekey = config.site_key;
const clientkey = config.capmonster_key;

const submitCaptcha = {
	clientKey: clientkey,
	task: {
		type: 'RecaptchaV2EnterpriseTask',
		websiteURL: 'https://community.luktech.net/includes/ajax/core/signup.php',
		websiteKey: sitekey,
	},
};

const registerDiscordAccount = async () => {
	try {
		const createTaskResponse = await axios.post('https://api.capmonster.cloud/createTask', submitCaptcha, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const {
			taskId
		} = createTaskResponse.data;
		console.log("CAPTCHA TASK CREATED: " + taskId);

		let getTaskResultResponse;
		let status = 'processing';

		while (status !== 'ready') {
			const getTaskResult = {
				clientKey: clientkey,
				taskId: taskId,
			};

			getTaskResultResponse = await axios.post('https://api.capmonster.cloud/getTaskResult', getTaskResult, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log('getTaskResult RESPONSE:', getTaskResultResponse.data);

			status = getTaskResultResponse.data.status;

			if (status !== 'ready') {
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}

		const {
			solution
		} = getTaskResultResponse.data;
		const captcha_key = solution.gRecaptchaResponse;
		const user_agent = solution.userAgent;
		console.log("CAPTCHA SOLVED SUCCESS");

		function generateUsername(length = 8) {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let username = '';

			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				username += characters.charAt(randomIndex);
			}

			return username;
		}

		function generatePassword(length = 8) {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#';
			let password = '';

			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				password += characters.charAt(randomIndex);
			}

			return password;
		}

		function generateEmail(length = 8, username) {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let mail = '';

			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				mail += characters.charAt(randomIndex);
			}
			const email = `${mail}@gmail.com`;
			return email;
		}

		const username = generateUsername();
		const email = generateEmail(username);
		const password = generatePassword();

		const registerPayload = {
			email: email,
			field1: "",
			first_name: username,
			["g-recaptcha-response"]: captcha_key,
			gender: "1",
			password: password,
			privacy_agree: "on",
			username: username
		};

		const registerResponse = await axios.post(config.website_register_url, registerPayload, {
			headers: {
				"sec-ch-ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"`,
				"sec-ch-ua-mobile": "?0",
				"user-agent": user_agent,
				"accept": "application/json, text/javascript, */*; q=0.01",
				"x-requested-with": "XMLHttpRequest",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"sec-ch-ua-platform": "Windows",
				"sec-gpc": "1",
				"host": "community.luktech.net"
			}
		});

		console.log('Registration response:', registerResponse.data);
	} catch (error) {
		console.error('An error occurred:', error);
	}
};

for (let i = 0; i < config.account_generate; i++) {
	registerDiscordAccount();
}