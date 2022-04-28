$(function () {
    _.init();
})

const _ = {
    init: function () {
        $("#root").html(this.component.navbar())
        $("#footer").html(this.component.footer())

        this.events();
    },
    events: function (isInit = true) {
        if (isInit) {
            $(".navbar-toggler").on("click", function () {
                $("#navbarText").toggle();
            });

            this.method._homeRoute();
            window.onpopstate = _.method.handleLocation;
            _.method.handleLocation();
        }
        $(`[data-href]`).on('click', _.method.route);
        $("#download").on("click",function (e) {
            window.open("https://yahoo.com");
        })
    },
    routes: {
        "404": "../pages/error.html",
        "page": {
            "/": "../pages/home.html",
            "home": "../pages/home.html",
            "about": "../pages/about.html",
        },
    },
    component: {
        card: function () {

        },
        navbar: function () {
            return `

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href=""><img class="logo" src="./assets/CAlogo2.png" alt=""></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item " >
                      <a class="nav-link" data-href="">Accueil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-href="page#about">A propos</a>
                      </li>
                  </ul>
                </div>
            </nav>
            <div id="content"></div>
            <div id="footer"></div>
    
    `
        },
        footer: function () {
            return `
                <div class="footer-content">
                        <div>©2022 Canal ARAIGNEE TV</div>
                        <div>Dernière mise à jour de cette page 04/05/2022</div>
                        <div><code>maraBOOT</code></div>
                </div>
            `;
        }
    },
    method: {
        route: function (event) {
            let href = event.currentTarget.dataset["href"] || "page#home";
            href = href.split("#");
            event = event || window.event;
            event.preventDefault();

            window.history.pushState({}, "", `/apps/?${href[0]}=${href[1]}`);
            _.method.handleLocation();
        },
        handleLocation: async function () {
            const url = new URLSearchParams(location.search);
            let params = {};
            url.forEach((v, k) => params[k] = v);
            const route = _.method._paramsToRoute(params);
            const content = await fetch(route[0]).then((data) => data.text());
            document.getElementById("content").innerHTML = content;
            _.events(false);

        },
        _paramsToRoute: function (url) {
            if (!url) return;
            let routeList = [];
            for (const key in url) {
                routeList.push(_.routes[key][url[key]] || _.routes["404"]);
            }
            return routeList;
        },
        _homeRoute: function () {
            const pathname = "/apps/?page=home";
            window.history.pushState({}, "", pathname);
        }
    }
}


