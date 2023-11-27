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
  localStorage.removeItem('cart')
  window.history.pushState({}, '', '/login')
  window.location.reload()
}

function renderNavbar(cartNumberOfItems = 0) {
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
              <div class="d-flex gap-3 align-items-center">
              <div class="dropdown">
              <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="bi bi-cart2"></i> ${cartNumberOfItems}
                </button>
                <ul class="dropdown-menu">
                  
                </ul>
             </div>
              <a href="/perfil" class="btn btn-sm btn-outline-secondary rounded-5" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </a>

              <button class="btn btn-sm btn-outline-secondary" id="logout" type="button">
                Logout
              </button>

              </div>
            </div>
          </div>
        </div>
      </nav>`

  const routes = ['/home.html', '/perfil.html']

  if (routes.includes(window.location.pathname)) {
    document.querySelector('.navbarRenderizado').innerHTML = navbarHTML
    document.querySelector('#logout').addEventListener('click', logout)
  }
}

const cartNumberOfItems = JSON.parse(localStorage.getItem('cart'))?.length || 0

renderNavbar(cartNumberOfItems)

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || []

  if (cartItems.length === 0) {
    document.querySelector(
      '.dropdown-menu'
    ).innerHTML = `<li><span class="dropdown-item" >Carrito vacio</span> </li> 
      <li><span class="dropdown-item text-center" ><i class="bi bi-bag-x-fill b"></i> </span></li>
                      <li><a disabled class="btn btn-sm btn-outline-secondary dropdown-item" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Checkout </a></li>
`
    return
  }

  const cartHtml = cartItems.map((item) => {
    return `
    <li>
      <div class="dropdown-item d-flex flex-column justify-content-between align-items-center">
        <img src="${item.img}" alt="..." class="img-thumbnail" width="100" height="100">
        <span>${item.name}</span>
        <span>${item.price} €</span>
        <a class="btn btn-sm" type="button" onclick="borrarseClase(${item.id})"> <i class="bi bi-trash"></i></a>
      </div>
    </li>
    `
  })
  const routes = ['/home.html', '/perfil.html']

  if (routes.includes(window.location.pathname)) {
    document.querySelector('.dropdown-menu').innerHTML = cartHtml
  }
}

function parseDate(date) {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  return `${day} de ${month} de ${year}`
}

renderCart()

function renderPerfil() {
  if (window.location.pathname === '/perfil.html') {
    fetch('http://localhost:3000/api/compras').then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const compras = data.data
          const perfilCompras = compras.filter((compra) => {
            return (
              compra.user === JSON.parse(localStorage.getItem('usuario')).id
            )
          })

          if (perfilCompras.length === 0) {
            document.querySelector('.perfilRenderizado').innerHTML =
              'No has realizado ninguna compra'
            return
          } else {
            const perfilHtml = perfilCompras
              .map((compra) => {
                return ` <div class="card">
              <div class="card-body">
                <h5 class="card-title">Compra realizada ${parseDate(
                  compra.date
                )} </h5>
                <p class="card-text">Precio total: ${compra.total} €</p>
                <p class="card-text">Productos: ${compra.products.length}</p>
              </div>
            </div>`
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

function renderProducts() {
  if (window.location.pathname === '/home.html') {
    fetch('http://localhost:3000/api/products').then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          const products = data.data
          const clasesHtml = products
            .map((product) => {
              return `
            <div class="card">
              <img src="${product.img}" class="card-img-top" alt="categoria ${product.category} name ${product.name}">
              <div class="card-body d-flex gap-4 align-items-center justify-content-center">

              <button class="btn btn-sm btn-outline-secondary rounded" onclick="addItemToCart(${product.id})">Añadir al carro</button>
                <div>
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.price} €</p>
                </div>
              </div>
            </div> 
            `
            })
            .join('')
          document.querySelector('.renderProducts').innerHTML = clasesHtml
        })
      }
    })
  }
}

renderProducts()

function addItemToCart(id) {
  console.log(id)

  fetch(`http://localhost:3000/api/products/${id}`).then((res) => {
    if (res.status === 200) {
      res.json().then((data) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || []
        const item = data.data
        cartItems.push(item)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        renderCart()
      })
    }
  })

  renderCart()
  window.location.reload()
}

function borrarseClase(id) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || []
  const item = cartItems.filter((item) => {
    return item.id !== id
  })
  localStorage.setItem('cart', JSON.stringify(item))
  const cartNumberOfItems =
    JSON.parse(localStorage.getItem('cart'))?.length || 0
  renderCart()
  renderNavbar(cartNumberOfItems)
  if (cartNumberOfItems === 0) {
    window.location.reload()
  }
}

const prueba = {
  name: 'prueba',
  email: 'hola'
}

console.log(prueba)
