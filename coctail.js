const toggleSpinner = spinnerStyle => {
    document.getElementById('spinner').style.display = spinnerStyle;
}
const bodyResult = spinnerStyle => {
    document.getElementById('search-result').style.display = spinnerStyle;
}

const loadData = () => {
      toggleSpinner('block');
      bodyResult('none');
    const searchText = document.getElementById('search-text');
    const searchValue = searchText.value;
    if(searchText.value.length==0){
        window.alert('write something');
        toggleSpinner('none');
    }
  
    else{
           // console.log(searchValue);
           const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
           searchText.value = "";
           fetch(url)
               .then(res => res.json())
               .then(data => displayData(data.drinks));

    }
   
 
}


const searchContainer=document.getElementById('search-container');
 

const displayData = drinks =>{

  searchContainer.textContent = '';
  displayResult(drinks);
 
    
   
}

const displayResult=drinks=>{
    if(!drinks){
        window.alert('nothing');
        toggleSpinner('none');
    }
     drinks.forEach(drink => {
         console.log(drink);
         const div = document.createElement('div');
         div.classList.add('drink');
         div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="p-3 card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <p class="card-text">${drink.strInstructions.slice(0,100)}</p>
                        <a href="#" onclick="loadDetails(${drink.idDrink})" class="btn btn-primary">Details</a>
                </div>
            </div>
        
        `;
         searchContainer.appendChild(div);

     });
     toggleSpinner('none');
     bodyResult('block');
}
// drinks details  

const loadDetails = async idDetail => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDetail}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.drinks[0]);
}
const displayDetails = data => {
    const detailsContain = document.getElementById('details-contain');
    detailsContain.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
       <div class="card h-100 " >
                <img src="${data.strDrinkThumb}" class="p-3 img-fluid card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.strDrink}</h5>
                    <p class="card-text">${data.strInstructionsIT}</p>

                </div>
            </div>        
    `;
    detailsContain.appendChild(div);
}
document.getElementById('search-btn').addEventListener('click',function(){
    document.getElementById('details-contain').textContent= "";
})
