const connect = () => {
    const url = "https://fakestoreapi.com/products";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            allProducts = data
            displayData(data)
        })

}


// "id": 1,
// "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// "price": 109.95,
// "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
// "rating": {
// "rate": 3.9,
// "count": 120
// display data


let allProducts = []

const cartDetails = (id) => {

    // find product by id
    const product = allProducts.find(item => item.id === id);

    console.log(product);

    // show modal content
    document.getElementById("modal-title").innerText = product.title;

    document.getElementById("modal-body").innerHTML = `
        <img src="${product.image}" class="w-40 mx-auto" />
        <p class="mt-2 font-bold">$${product.price}</p>
        <p class="text-sm">${product.description}</p>
    `;

    // open modal
    document.getElementById("my_modal_2").showModal();
};

const displayData = (title) => {
    const titleContainer = document.getElementById("title-container");
    console.log(title)
    title.forEach(element => {
        const divList = document.createElement("div");
        divList.innerHTML = `
        <div class="card bg-base-100 w-72 shadow-sm border">
  <figure class="p-4">
    <img
      class="h-40 w-full object-contain"
      src="${element.image}"
      alt="Product"
    />
  </figure>

  <div class="card-body p-4 pt-0 space-y-2">

    <!-- top row: badge + rating -->
    <div class="flex items-center justify-between">
      <span class="badge badge-info badge-sm">${element.category}</span>

      <div class="flex items-center gap-1 text-xs text-gray-500">
        <div class="rating rating-xs">
          <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" />
        </div>
        <span>${element.rating.rate}(${element.rating.count})</span>
      </div>
    </div>

    <!-- title -->
    <h2 class="font-semibold text-sm leading-snug line-clamp-1">
      ${element.title}
    </h2>

    <!-- price -->
    <p class="font-bold text-base">$${element.price}</p>

    <!-- buttons -->
    <div class="flex items-center justify-between pt-2">
      <button onclick="cartDetails(${element.id})" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-circle-info"></i>
        Details
      </button>

      <button class="btn btn-primary btn-sm">
        <i class="fa-solid fa-cart-shopping"></i>
        Add
      </button>
    </div>
  </div>
</div>

        `
        titleContainer.append(divList);
    });
}
connect()

const showHome = () => {
    document.getElementById("home-page").classList.remove("hidden")
    document.getElementById("products-page").classList.add("hidden")
}

const showProducts = () => {
    document.getElementById("home-page").classList.add("hidden")
    document.getElementById("products-page").classList.remove("hidden")
}

const setActiveFilter = (activeId) => {
    const ids = ["filter-all", "filter-electronics", "filter-jewelery", "filter-mens", "filter-womens"]
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        el.classList.remove("btn-primary")
        el.classList.add("btn-outline")
    })
    const active = document.getElementById(activeId)
    if (active) {
        active.classList.remove("btn-outline")
        active.classList.add("btn-primary")
    }
}

const renderProducts = (list) => {
    const titleContainer = document.getElementById("title-container")
    if (titleContainer) titleContainer.innerHTML = ""
    displayData(list)
}

const connectHome = () => {
    const url = "https://fakestoreapi.com/products";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const homeContainer = document.getElementById("home-title-container")
            if (!homeContainer) return
            homeContainer.innerHTML = ""
            data.slice(0, 3).forEach(element => {
                const divList = document.createElement("div");
                divList.innerHTML = `
        <div class="card bg-base-100 w-72 shadow-sm border">
  <figure class="p-4">
    <img
      class="h-40 w-full object-contain"
      src="${element.image}"
      alt="Product"
    />
  </figure>

  <div class="card-body p-4 pt-0 space-y-2">

    <div class="flex items-center justify-between">
      <span class="badge badge-info badge-sm">${element.category}</span>

      <div class="flex items-center gap-1 text-xs text-gray-500">
        <div class="rating rating-xs">
          <input type="radio" name="h${element.id}" class="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" name="h${element.id}" class="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" name="h${element.id}" class="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" name="h${element.id}" class="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="h${element.id}" class="mask mask-star-2 bg-orange-400" />
        </div>
        <span>${element.rating.rate}(${element.rating.count})</span>
      </div>
    </div>

    <h2 class="font-semibold text-sm leading-snug line-clamp-1">
      ${element.title}
    </h2>

    <p class="font-bold text-base">$${element.price}</p>

    <div class="flex items-center justify-between pt-2">
      <button onclick="showProducts(); setActiveFilter('filter-all'); renderProducts(allProducts)" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-circle-info"></i>
        View
      </button>

      <button class="btn btn-primary btn-sm">
        <i class="fa-solid fa-cart-shopping"></i>
        Add
      </button>
    </div>
  </div>
</div>

                `
                homeContainer.append(divList);
            })
        })
}

const bindNav = () => {
    const allLinks = document.querySelectorAll(".menu a")
    allLinks.forEach(a => {
        const t = (a.textContent || "").trim().toLowerCase()
        if (t === "home") {
            a.addEventListener("click", (e) => {
                e.preventDefault()
                showHome()
            })
        }
        if (t === "products") {
            a.addEventListener("click", (e) => {
                e.preventDefault()
                showProducts()
                setActiveFilter("filter-all")
                renderProducts(allProducts)
            })
        }
    })

    const shop = document.getElementById("shop-now")
    if (shop) {
        shop.addEventListener("click", (e) => {
            e.preventDefault()
            showProducts()
            setActiveFilter("filter-all")
            renderProducts(allProducts)
        })
    }
}

const bindFilters = () => {
    const btnAll = document.getElementById("filter-all")
    const btnElec = document.getElementById("filter-electronics")
    const btnJew = document.getElementById("filter-jewelery")
    const btnMen = document.getElementById("filter-mens")
    const btnWomen = document.getElementById("filter-womens")

    if (btnAll) {
        btnAll.addEventListener("click", () => {
            setActiveFilter("filter-all")
            renderProducts(allProducts)
        })
    }
    if (btnElec) {
        btnElec.addEventListener("click", () => {
            setActiveFilter("filter-electronics")
            renderProducts(allProducts.filter(p => p.category === "electronics"))
        })
    }
    if (btnJew) {
        btnJew.addEventListener("click", () => {
            setActiveFilter("filter-jewelery")
            renderProducts(allProducts.filter(p => p.category === "jewelery"))
        })
    }
    if (btnMen) {
        btnMen.addEventListener("click", () => {
            setActiveFilter("filter-mens")
            renderProducts(allProducts.filter(p => p.category === "men's clothing"))
        })
    }
    if (btnWomen) {
        btnWomen.addEventListener("click", () => {
            setActiveFilter("filter-womens")
            renderProducts(allProducts.filter(p => p.category === "women's clothing"))
        })
    }
}

showHome()
bindNav()
bindFilters()
connectHome()
