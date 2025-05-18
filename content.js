const mouseEventOf = (eventType) => (element, x, y) => {
	const rect = element.getBoundingClientRect();

	const event = new MouseEvent(eventType, {
		view: window,
		bubbles: true,
		cancelable: true,
		clientX: rect.left + x,
		clientY: rect.top + y,
	});
	element.dispatchEvent(event);
};

async function awaitForElement(selector) {
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			const element = document.querySelector(selector);
			if (element) {
				clearInterval(interval);
				resolve(element);
			}
		}, 50);
	});
}

async function editLastMessage() {
	const messages = document.querySelectorAll(
		".message-out > div:first-of-type"
	);
	const lastMessage = messages[messages.length - 1];
	if (!lastMessage) {
		return;
	}

	mouseEventOf("mouseover")(lastMessage, 0, 0);

	const menuButton = await awaitForElement('[aria-label="Menu de contexto"]');

	if (!menuButton) {
		return;
	}
    
	menuButton.click();

    const editButton = await awaitForElement("#app > div > span:nth-child(8) > div > ul > div > div:nth-child(8) > li");

    if (!editButton) {
        return;
    }

    editButton.click();
}

document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowUp") {
		event.preventDefault();
		editLastMessage();
	}
});
