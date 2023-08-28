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
    if(phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log(phones.length)
    // console.log("isShowAll", isShowAll);
    // display only first 12 phones if not show all
    phones = phones.slice(0,12);
    console.log(phones);
    

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
        <button class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
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