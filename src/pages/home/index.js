import "regenerator-runtime"

// SCSS
import '@/scss/main.scss'

// Component
import Navbar from "@/component/navbar"
import posterCarousel from "@/component/poster-carousel"

// JS
import '@/js/bootstrap'
import 'owl.carousel'

customElements.define("nav-bar", Navbar)
customElements.define("poster-carousel", posterCarousel)
