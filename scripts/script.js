const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};
// loadPhone('iphone');

const phoneCardContainer = document.getElementById("phones-container");
const showAllBtn = document.getElementById("show-all");
console.log(showAllBtn);

const displayPhones = (phones) => {
  if (phones.length > 12) {
    console.log("showAll", phones.length);
    showElementById("show-all");
  } else {
    hideElementById("show-all");
  }

  phones = phones.slice(0, 12);
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "p-4 lg:p-5 border-[1px] rounded-lg";
    phoneCard.innerHTML = `
      <div class="p-6 bg-[#0d6efd0d] rounded-md">
        <img class="w-1/2 mx-auto" src="${phone.image}" alt="">
      </div>
      <div class="text-center w-5/6 mx-auto">
        <h1 class="py-3 md:pt-6 pb-3 font-bold text-xl">${phone.phone_name}</h1>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h4 class="py-2 font-semibold text-lg">$999</h4>
        <button class="btn btn-primary font-bold my-1">Show Details</button>
      </div>
      `;
    phoneCardContainer.appendChild(phoneCard);
  });
  handleLoading(false);
};

// handle search button
const handleSearch = () => {
  handleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText)
  loadPhone(searchText);
};
document.getElementById("search-btn").addEventListener("click", handleSearch);

const handleLoading = (isLoading) => {
  showElementById('loading-animation')
  console.log(document.getElementById('loading-animation'))
  if (isLoading) {
    showElementById("loading-animation");
  } else {
    hideElementById("loading-animation");
  }
};
