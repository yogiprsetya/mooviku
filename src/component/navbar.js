export default class Navbar extends HTMLElement {  
  connectedCallback() {
    let navLink = ''

    const navItem = [
      {
        name: 'GENRES',
        link: 'genre.html'
      }
    ]

    navItem.forEach(item => {
      navLink +=
      `<li class="nav-item active">
        <a class="nav-link" href="${item.link}">${item.name}</a>
      </li>`
    })

    this.innerHTML = `
    <nav class="container">
      <a class="navbar-brand" href="/">
        <img class="w-25" src="../images/logo-m.png" />
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav font-weight-bold">
          ${navLink}
        </ul>

        <form class="form-inline my-2 my-lg-0 ml-0 ml-md-3" action="/find.html">
          <input class="form-control" name="query" type="search" placeholder="Search movie" aria-label="Search">
        </form>
      </div>
    </nav>
    `;
  }
}