const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    // display show all
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log(phones.length)
    console.log("isShowAll", isShowAll);
    // display only first 12 phones if not show all
    console.log(phones);
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    

    // clear phoneContainer
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
         </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h3 class="text-2xl font-bold">$999</h3>
        <div class="card-actions">
        <button onclick = "handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle show details click
const handleShowDetails = async (id) => {
    console.log(id);
    // load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);
    showPhoneDetails(phone);

}
// Show details
const showPhoneDetails = (phone) => {
    const showDetailsContainer = document.getElementById('show-modal-container');
    showDetailsContainer.innerHTML = `
    <div class = "flex justify-center"><img src="${phone.image}" alt=""></div>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class="text-xl font-medium">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p"><span class="text-xl font-medium">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p"><span class="text-xl font-medium">GPS: </span>${phone?.others?.GPS}</p>
    <div class = "flex justify-center mt-5">
    <button class = "btn btn-primary">Close</button>
    </div>
    `
    show_details_modal.showModal();
}

// Handle search button click
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    // console.log("Searching...");
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spiner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }

}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
};

// loadPhone();