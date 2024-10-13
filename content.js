const mouseEventOf = (eventType) => (element, x, y) => {
    const rect = element.getBoundingClientRect()
  
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y,
    })
    element.dispatchEvent(event)
  }
  
  async function awaitForElement(selector) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        const element = document.querySelector(selector)
        if (element) {
          clearInterval(interval)
          resolve(element)
        }
      }, 50)
    })
  }
  
  async function editLastMessage() {
    const messages = document.querySelectorAll('.message-out > div:first-of-type')
    document.querySelectorAll('.message-out > div:first-of-type')
    const lastMessage = messages[messages.length - 1]
    
    mouseEventOf('mouseover')(lastMessage, 0, 0)
    ;(await awaitForElement('[aria-label="Menu de contexto"]'))?.click()
    ;(await awaitForElement('[aria-label="Editar"]'))?.click()
    ;(await awaitForElement('[contenteditable="true"]'))?.click()
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        console.log('Editando última mensagem');
        event.preventDefault(); 
        editLastMessage();
    }
});


