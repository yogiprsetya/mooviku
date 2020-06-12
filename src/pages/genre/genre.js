import "regenerator-runtime"
import apiData from 'apiConfig'

// SCSS
import '@/scss/main.scss'

// Component
import Navbar from "@/component/navbar"

// JS
import '@/js/bootstrap'
import 'owl.carousel'

customElements.define("nav-bar", Navbar)

customElements.define('genre-list', class GenreList extends HTMLElement {
  connectedCallback() {
    fetch(`${apiData.url}/genre/movie/list?api_key=${apiData.key}`)
    .then(response => response.json())
    .then(data => {
      this.render(data.genres)
    })
  }

  render(data) {
    let createData = data.map(data => {
      return `
        <div class="col-md-3">
          <a href="/genre-detail.html?id=${data.id}" class="btn btn-primary btn-lg btn-block mb-3">${data.name}</a>
        </div>
      `
    })

    this.innerHTML = createData.join('\n')
    
  }
})