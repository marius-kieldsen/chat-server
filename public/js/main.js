console.log('main.js kører')


const loginForm = document.querySelector('#login-form')
if (loginForm) {
    console.log("Login form fundet..")
    loginForm.addEventListener('submit', async e => {
        e.preventDefault()
        console.log('Submitting login request...')

        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value

        const svar = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { username, password })
        })

        if(svar.ok) {
            console.log("Yay, logged in!!")
            location.reload()
        } else {
            const data = svar.json()
            document.querySelector('#loginFejl').textContent = data.error
            console.log(data.error)
        }
    })
}

const opretForm = document.querySelector('#opret-form')
if (opretForm) {
    console.log("Opret form fundet..")
    opretForm.addEventListener('submit', async e => {
        e.preventDefault()
        console.log('Submitting sign up request...')

        const username = document.querySelector('#opretUsername').value
        const password = document.querySelector('#opretPassword').value
        const level = document.querySelector('#opretLevel').value

        const svar = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, level })
        })

        if (svar.ok) {
            location.reload()
        } else {
            const data = await svar.json()
            alert(data.error)
        }

    })
}

const logoutButton = document.querySelector('#logout')
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const svar = await fetch('/logout', {
            method: 'POST'
        })
        if(svar.ok) {
            console.log("Yay, logged out!!")
            location.reload()
        }
    })
}

const opretChatDialog = document.querySelector('#opret-chat-dialog')

document.querySelector('#vis-opret-chat')?.addEventListener('click', () => {
    opretChatDialog.showModal()
})

document.querySelector('#luk-dialog')?.addEventListener('click', () => {
    opretChatDialog.close()
})

const opretChatForm = document.querySelector('#opret-chat-form')
if (opretChatForm) {
    console.log("Opret Chat Form fundet..")
    opretChatForm.addEventListener('submit', async e => {
        e.preventDefault()
        console.log('Submitting create chat request...')

        const chatName = document.querySelector('#chatName').value

        const svar = await fetch('/chats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatName })
        })

        if (svar.ok) {
            console.log("Chat created!")

            const chat = await svar.json()
            const li = document.createElement('li')
            li.dataset.id = chat.id

            const a = document.createElement('a')
            a.href = '/chats/' + chat.id
            a.textContent = chat.name

            const slet = document.createElement('button')
            slet.className = 'slet'
            slet.textContent = 'slet'
            li.append(a, slet)

            document.querySelector('#chat-list').append(li)

            opretChatForm.reset()
            opretChatForm.close()
        } else {
            const data = await svar.json()
            alert(data.error)
        }
    })
}

document.querySelector('#chat-list').addEventListener('click', async e => {
    if (!e.target.matches('.slet')) return
    if (!confirm('Er du sikker på at du vil slette denne chat?')) return

    const li = e.target.closest('li')

    const svar = await fetch('/chats/' + li.dataset.id, {method: 'DELETE'})

    const fejlbeskeder= {
        401: 'Du skal være logget ind for at slette en chat.',
        403: 'Du har ikke tilladelse til at slette denne chat.',
        404: 'Chat ikke fundet.',
        default: 'Noget gik galt.'
    }

    if (svar.ok) {
        li.remove()
    } else {
        alert(fejlbeskeder[svar.status] ?? fejlbeskeder.default)
    }
})

