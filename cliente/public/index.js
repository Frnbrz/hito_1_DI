function login() {
  const email = document.querySelector('#floatingInput').value
  const password = document.querySelector('#floatingPassword').value

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((data) => {
        localStorage.setItem('usuario', JSON.stringify(data.data.user))
        document.cookie = `token=${data.data.token}`
        window.history.pushState({}, '', '/home')
        window.location.reload()
      })
    }
    document.querySelector('.error').innerHTML = 'Login failed'
  })
}

function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  localStorage.removeItem('usuario')
  window.history.pushState({}, '', '/login')
  window.location.reload()
}

function renderNavbar() {
  const username =
    JSON.parse(localStorage.getItem('usuario'))?.name || 'Usuario'

  const navbarHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary px-5">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">Tienda</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav d-flex justify-content-between aling-items-center w-100 ">
              <div class="d-flex">
              </div>
              
              <span class="nav-username">
                ${username}
              </span>
              <button class="btn btn-sm btn-outline-secondary" id="logout" type="button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>`

  const routes = [
    '/home.html',
    '/clases.html',
    '/perfil.html',
    '/profesores.html'
  ]

  if (routes.includes(window.location.pathname)) {
    document.querySelector('.navbarRenderizado').innerHTML = navbarHTML
    document.querySelector('#logout').addEventListener('click', logout)
  }
}

renderNavbar()

function renderClases() {
  if (window.location.pathname === '/clases.html') {
    fetch('http://localhost:3000/api/clases', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${document.cookie.split('=')[1]}`
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const clases = data.data
          const clasesHTML = clases
            .map((clase) => {
              const aforo = clase.users.length === clase.aforo
              const disable = aforo ? 'disabled' : ''
              return `
            <div class="card">
              <img src="${clase.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${clase.name}</h5>
                <p class="card-text">${clase.description}</p>
                <p class="card-text">Aforo: ${clase.users.length}/${clase.aforo}</p>
                <button class="btn btn-primary" onclick="inscribirseClase(${clase.id})" ${disable}>Inscribirse</button>
              </div>
            </div> 
            `
            })
            .join('')
          document.querySelector('.clasesRenderizadas').innerHTML = clasesHTML
        })
      }
    })
  }
}

renderClases()

function renderPerfil() {
  if (window.location.pathname === '/perfil.html') {
    fetch('http://localhost:3000/api/clases', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${document.cookie.split('=')[1]}`
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const clases = data.data
          const perfilClases = clases.filter((clase) => {
            return clase.users.includes(
              JSON.parse(localStorage.getItem('usuario')).id
            )
          })

          if (perfilClases.length === 0) {
            document.querySelector('.perfilRenderizado').innerHTML =
              'No estas inscripto a ninguna clase'
            return
          } else {
            const perfilHtml = perfilClases
              .map((clase) => {
                return `
            <div class="card">
              <img src="${clase.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${clase.name}</h5>
                <p class="card-text">${clase.description}</p>
                <button class="btn btn-primary" onclick="borrarseClase(${clase.id})">Borrarse</button>
              </div>
            </div> 
            `
              })
              .join('')
            document.querySelector('.perfilRenderizado').innerHTML = perfilHtml
          }
        })
      }
    })
  }
}

renderPerfil()

function renderProfesores() {
  if (window.location.pathname === '/profesores.html') {
    fetch('http://localhost:3000/api/profesores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${document.cookie.split('=')[1]}`
      }
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const profesores = data.data
          const profesoresHTML = profesores
            .map((profesor) => {
              return `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${profesor.name}</h5>
                <p class="card-text">${profesor.description}</p>
                <p class="card-text">${profesor.role}</p>
              </div>
            </div> 
            `
            })
            .join('')
          document.querySelector('.profesoresRenderizados').innerHTML =
            profesoresHTML
        })
      }
    })
  }
}

renderProfesores()

function inscribirseClase(id) {
  const user = JSON.parse(localStorage.getItem('usuario'))

  console.log(user)
  fetch(`http://localhost:3000/api/clases/${id}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${document.cookie.split('=')[1]}`
    },
    body: JSON.stringify({ userId: user.id })
  }).then((res) => {
    if (res.status === 200) {
      window.location.reload()
    }
  })
}

function borrarseClase(id) {
  const user = JSON.parse(localStorage.getItem('usuario'))

  console.log(user)
  fetch(`http://localhost:3000/api/clases/${id}/users`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${document.cookie.split('=')[1]}`
    },
    body: JSON.stringify({ userId: user.id })
  }).then((res) => {
    if (res.status === 200) {
      window.location.reload()
    }
  })
}

fetch('url')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
