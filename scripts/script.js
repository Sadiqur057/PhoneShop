const loadPhone = async (searchText='iphone', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
loadPhone();

const showAllBtn = document.getElementById("show-all");

const displayPhones = (phones, isShowAll) => {
  const phoneCardContainer = document.getElementById("phones-container");
  phoneCardContainer.textContent = "";

  if (phones.length > 12) {
    showElementById("show-all");
  } else {
    hideElementById("show-all");
  }

  //
  if (isShowAll !== true) {
    phones = phones.slice(0, 12);
  } else {
    hideElementById("show-all");
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "p-4 lg:p-5 border-[1px] rounded-lg";
    phoneCard.innerHTML = `
      <div class="p-6 bg-[#0d6efd0d] rounded-md">
        <img class="w-1/3 mx-auto" src="${phone.image}" alt="">
      </div>
      <div class="text-center w-5/6 mx-auto">
        <h1 class="py-3 md:pt-6 pb-3 font-bold text-xl">${phone.phone_name}</h1>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h4 class="py-2 font-semibold text-lg">$999</h4>
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary font-bold my-1">Show Details</button>
      </div>
      `;
    phoneCardContainer.appendChild(phoneCard);
  });
  handleLoading(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  handleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};
document.getElementById("search-btn").addEventListener("click", handleSearch);

const handleLoading = (isLoading) => {
  showElementById("loading-animation");
  if (isLoading) {
    showElementById("loading-animation");
  } else {
    hideElementById("loading-animation");
  }
};

// handle show all button
document.getElementById("show-all").addEventListener("click", () => {
  handleSearch(true);
  console.log('done')
});

// handle show details
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

  
};

const showPhoneDetails = (phone)=>{
  show_details_modal.showModal();
  showElementTextById('phone-name',phone.name);
  const phoneImg = document.getElementById('phone-img');
  phoneImg.src =  phone.image;
  const features = phone.mainFeatures;
  showElementTextById('phone-storage',features?.storage || 'No information available');
  showElementTextById('phone-display',features?.displaySize || 'No information available');
  showElementTextById('phone-chipset',features?.chipSet || 'No information available');
  showElementTextById('phone-memory',features?.memory || 'No information available');
  showElementTextById('phone-release-date',phone?.releaseDate || 'No information available');
  showElementTextById('phone-gps',phone?.others?.GPS || 'No information available');
  const sensors = features?.sensors; 
  showElementTextById('phone-sensors',sensors.join(', ') || 'No information available');

}