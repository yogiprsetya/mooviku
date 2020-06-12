import 'regenerator-runtime'
import apiData from 'apiConfig'

// SCSS
import '@/scss/main.scss'

// Component
import Navbar from '@/component/navbar'

// JS
import '@/js/bootstrap'
import 'owl.carousel'

customElements.define('nav-bar', Navbar)

customElements.define('movie-detail', class MovieDetail extends HTMLElement {
  
  connectedCallback() {
    const URLParams = new URLSearchParams(window.location.search)

    fetch(`${apiData.url}/movie/${URLParams.get('id')}?api_key=${apiData.key}`)
      .then(response => response.json())
      .then(data => {
        this.render(data)
      })
    }

    render(data) {
      this.innerHTML = `
        <div class="cover container mt-5 d-none d-md-block">
          <div class="bg-dark rounded">
            <img class="w-100 shadow" src="${apiData.image + data.backdrop_path}" alt="${data.original_title}"/>
          </div>
        </div>

        <main class="container mb-5 mt-5 mt-md-0 px-md-5">
          <div class="row mb-3">
            <div class="col-12 col-md-4 h-75">
              <img class="img-fluid shadow-lg rounded" src="${apiData.image + data.poster_path}" alt="${data.original_title}"/>
            </div>

            <div class="col-12 col-md-8 mt-auto">
              <h1 class="mb-3">${data.original_title}</h1>

              <div class="d-flex justify-content-between font-weight-bold align-items-center">
                <span>${data.runtime} min</span>
                <span>
                  ${
                    data.genres.slice(-3).map((i, id, element) => {
                      return element[id].name
                    }).join(', ')
                  }
                </span>
                <span class="d-none d-md-flex">
                  <i class="material-icons pr-1">calendar_today</i>${data.release_date}
                </span>
                <i class="material-icons md-48 d-none d-md-block">4k</i>
              </div>

              <div class="mt-3 mb-4">
                <p>${data.overview}</p>
              </div>

              <div class="d-flex align-items-center">
                <span class="d-flex h1 font-weight-normal align-items-center mb-0">
                  <i class="material-icons md-48 mr-2 color-brand">stars</i>
                  ${data.vote_average}

                  <span class="font-weight-light h5 mb-0 text-muted ml-3">${data.vote_count} reviewed</span>
                </span>
                
                <span class="ml-5 d-inline-flex align-items-center justify-content-center">
                  <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle"
                      stroke-dasharray="${data.popularity.toFixed()}, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" class="percentage">${data.popularity.toFixed()}%</text>
                  </svg>
                  <h6 class="ml-2 mb-0">User<br/>Score</h6>
                </span>
              </div>
            </div>
          </div>
        </main>
      `
    }
})

customElements.define('movie-cast', class MovieCast extends HTMLElement {
  connectedCallback() {
    fetch(`${apiData.url}/movie/${new URLSearchParams(window.location.search).get('id')}/credits?api_key=${apiData.key}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.render(data.cast)
    })
  }

  render(data) {
    let createCastData = data.map(data => {
      if(data.profile_path) {
        return `
          <div class="col-md-3">
            <div class="card mb-2">
              <img class="card-img-top" src="${apiData.image + data.profile_path}" alt="${data.name}">

              <div class="card-body">
                <p class="card-text">
                  ${data.name}<br/>
                  <small>as ${data.character}</small>
                </p>
              </div>
            </div>
          </div>
        `
      }
    })

    this.innerHTML = createCastData.join('\n')
    
  }
})

customElements.define('movie-production', class MovieProduction extends HTMLElement {
  connectedCallback() {
    fetch(`${apiData.url}/movie/${new URLSearchParams(window.location.search).get('id')}?api_key=${apiData.key}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.render(data.production_companies)
    })
  }

  render(data) {
    let createData = data.map(data => {
      if(data.logo_path) {
        return `
        <div class="col-md-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${apiData.image + data.logo_path}" alt="${data.name}">

            <div class="card-body">
              <p class="card-text">
                ${data.name}
              </p>
            </div>
          </div>
        </div>
        `
      }
    })

    this.innerHTML = createData.join('\n')
    
  }
})

customElements.define('movie-similar', class MovieSimilar extends HTMLElement {
  connectedCallback() {
    fetch(`${apiData.url}/movie/${new URLSearchParams(window.location.search).get('id')}/similar?api_key=${apiData.key}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.render(data.results)
    })
  }

  render(data) {
    let createData = data.map(data => {
      return `
        <div class="col-md-3 mb-3">
          <a href="/movie.html?id=${data.id}">
            <img class="img-fluid" src="${apiData.image + data.poster_path}" alt="${data.title}">
          </a>
        </div>
      `
    })

    this.innerHTML = createData.join('\n')
    
  }
})