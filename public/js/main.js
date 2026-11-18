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