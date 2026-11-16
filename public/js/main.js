console.log('main.js kører')


const loginForm = document.querySelector('#login-form')
if (loginForm) {
    console.log("Login form fundet..")
    loginForm.addEventListener('submit', async e => {
        e.preventDefault()
        console.log('Login Form submittet')
    })
}


const opretForm = document.querySelector('#opret-form')
if (opretForm) {
    console.log("Opret form fundet..")
    opretForm.addEventListener('submit', async e => {
        e.preventDefault()
        console.log('Opret Form submittet')

        const username = document.querySelector('#opretUsername').value
        const password = document.querySelector('#opretPassword').value
        const level = document.querySelector('#opretLevel').value

        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, level })
        })
        const data = await response.json()

        if (data.ok) {
            location.reload()
            console.log('Bruger oprettet', username, password, level)
        } else {
            alert(data.error)
        }

    })
}