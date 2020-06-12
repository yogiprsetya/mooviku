import apiData from 'apiConfig'

export default class posterCarousel extends HTMLElement {

  carouselInit() {
    $('#trending').owlCarousel({
      loop: true,
      margin: 20,
      stageOuterClass: 'owl-stage-outer py-3',
      dots: true,
      stagePadding: 100,
      dotsClass: "owl-dots text-center",
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    })
  }
 
  async connectedCallback() {
    await this.render(`${apiData.url}/trending/movie/week?api_key=${apiData.key}`)
  }

  render(url) {
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.results.forEach(element => {
        this.innerHTML +=
        `<a href="movie.html?id=${element.id}">
          <img class="shadow-sm rounded" src="${apiData.image + element.poster_path}" alt="${element.original_title}">
        </a>`
      })

      this.carouselInit()
    })
  }
}