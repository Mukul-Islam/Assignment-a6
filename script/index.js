const connect = () => {
    const url = "https://fakestoreapi.com/products";

    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))

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
      <button class="btn btn-outline btn-sm">
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
