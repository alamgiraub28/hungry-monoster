const searchBtn = document.getElementById('searchBtn');
const mealList = document.getElementById('foodList');
const mealDetail = document.getElementById('foodDetails');

searchBtn.addEventListener('click', showFoodList);

// Food List Function
function showFoodList(){
    let searchInputText = document.getElementById('inputFoodName').value.trim();
    if(searchInputText.length === 0){
     url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`;
     
     return window.alert("Please Write Your Food Name");
    } else{
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`;
    }
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div onclick="displayFoodDetail('${meal.strMeal}')">
                    <div class="foodItem" data-id="${meal.idMeal}">
                        <div class ="foodImg">
                            <img class="image_food" src="${meal.strMealThumb}"></img>
                        </div>
                        <div class = "foodTitle">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
                `;
            });
        } else{
            html = `<h1 class="notFound">"Sorry Not Found Your Food!"</h1>`;
        }
        mealList.innerHTML = html;
        mealDetail.innerHTML = null;
    });
}

// Food Details Function
const displayFoodDetail = foodDetail =>{
const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodDetail}`;
fetch(url)
.then(res => res.json())
.then(data => renderFoodInfo(data.meals))
}

// Food Render function
const renderFoodInfo = meal => {
meal = meal[0];
let html = `
                <div class ="foodDetailContainer">
                <img class="image_food" src="${meal.strMealThumb}">
                <h3 class="mealTitle">${meal.strMeal}</h3>
                <ul>
                <p>INGREDIENTS</p>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                    <li>${meal.strIngredient6}</li>
                </ul>
                </div>
`;

mealDetail.innerHTML = html;
}
