chrome.commands.onCommand.addListener((command) => {
    console.log(`Comando recebido: ${command}`);
    if (command === "edit_message") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log(`Tab ativa: ${tabs[0].id}`);
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    }
  });
  