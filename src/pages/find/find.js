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

customElements.define('genre-detail', class GenreDetail extends HTMLElement {

  connectedCallback() {
    const URLParams = new URLSearchParams(window.location.search)

    fetch(`${apiData.url}/search/movie?api_key=${apiData.key}&query=${URLParams.get('query')}&page=1`)
      .then(response => response.json())
      .then(data => {
        document.getElementsByTagName("h1")[0].innerHTML += URLParams.get('query')
        this.render(data.results)
      })
    }

    render(data) {
      let createData = data.map(data => {
        return `
          <div class="row mb-4 pb-4 border-bottom">
            <div class="col-md-3">
              <img class="img-fluid" src="${apiData.image + data.poster_path}">
            </div>

            <div class="col-md-9 d-flex align-items-center flex-row">
              <a href="/movie.html?id=${data.id}" class="text-dark btn text-left">
                <h3>${data.original_title}</h3>
                <p>${data.overview}</p>
                
                <div class="d-flex align-items-center">
                  <span class="d-flex h1 font-weight-normal align-items-center mb-0">
                    <i class="material-icons md-48 mr-2 color-brand">stars</i>
                    ${data.vote_average}
                    <span class="font-weight-light h5 mb-0 text-muted ml-3">${data.vote_count} reviewed</span>
                  </span>
                  
                  <span class="ml-5 d-inline-flex align-items-center justify-content-center">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                      <path class="circle" stroke-dasharray="${data.popularity.toFixed()}, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" class="percentage">${data.popularity.toFixed()}%</text>
                    </svg>
                    <h6 class="ml-2 mb-0">User<br/>Score</h6>
                  </span>
                </div>
              </a>
            </div>
          </div>
        `
      })

      this.innerHTML = `
        <table class="table">
          <tbody>
            ${createData.join('\n')}
          </tbody>
        </table>
      `

    }
})
