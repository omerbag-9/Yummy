$(document).ready(function(){
    $(".loading").fadeOut(2000)
})

//sidebar toggle
let sideBarWidth = $("#sideBarLeft").outerWidth()
$(".sidebar").css({left: `${-sideBarWidth}px`})
$(".toggle").on("click",function(){
    let leftWidth = $(".sidebar").css("left")
    if(leftWidth == "0px"){
        $(".sidebar").animate({left: `${-sideBarWidth}px`},500)
    }else{
        $(".sidebar").animate({left: 0},500)
    }
})

$(".toggle").on("click",function(e){
    togglevalue = $(e.target).attr("id")
    if(togglevalue == "sideIcon"){
        $("#sideIcon").addClass("d-none")
        $("#sideIconbars").removeClass("d-none")
    }else{
        $("#sideIcon").removeClass("d-none")
        $("#sideIconbars").addClass("d-none")
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//home

let meals = []

async function getMeals(){
    for (let i = 0; i < 25; i++) {
    let req = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    let data = await req.json()
        meals.push(data.meals)
    }
    displayMeals()
}
getMeals()

function displayMeals(){
    let temp=''
    meals.flat().forEach((e)=>{
        temp+=`<div class="col-md-3">
        <div class="bg-danger foodDiv rounded position-relative">
            <img class="w-100" src="${e.strMealThumb}" alt="">
            <div class="overlay">
                <h2>${e.strMeal}</h2>
            </div>
            <div mealId="${e.idMeal}" class="mealId"></div>
        </div>
    </div>`
    })
    document.getElementById("foodData").innerHTML = temp

    $(".mealId").on("click",function(e){
        let mealId = $(e.target).attr("mealId")
        $(".details").removeClass("d-none")
        $(".categoryOverlay").addClass("d-none")
        $(".specific").addClass("d-none")
        getMealsDetails(mealId)
    })

}
//////////////

//display meal details
let mealDetails = []
async function getMealsDetails(id){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await req.json()
    mealDetails = data.meals
    displayMealsDetails()
}


function displayMealsDetails(){
    let temp=''
    mealDetails.forEach((e)=>{
        temp+=`<div class="col-md-4">
        <img class="w-100 rounded" src="${e.strMealThumb}" alt="">
        <h2 class="text-white">${e.strMeal}</h2>
    </div>
    <div class="col-md-7">
        <h2 class="text-white">instructions</h2>
        <p class="text-white">${e.strInstructions}</p>
            <h2 class="text-white">Area: </h2>
            <h2 class="text-white">Category: </h2>
            <h2 class="text-white">Recipes: </h2>
            <ul class="list-unstyled">
                 <li class="text-bg-info d-inline-block rounded p-1 m-1  ${(e.strIngredient1 == "") ? "d-none" : ""} ">${e.strIngredient1}</li>
                  <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient2 == "") ? "d-none" : ""} ">${e.strIngredient2}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient3 == "") ? "d-none" : ""} ">${e.strIngredient3}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient4 == "") ? "d-none" : ""}">${e.strIngredient4}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient5 == "") ? "d-none" : ""} ">${e.strIngredient5}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient6 == "") ? "d-none" : ""} ">${e.strIngredient6}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient7 == "") ? "d-none" : ""} ">${e.strIngredient7}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient8 == "") ? "d-none" : ""} ">${e.strIngredient8}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient9 == "") ? "d-none" : ""} ">${e.strIngredient9}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient10 == "") ? "d-none" : ""} ">${e.strIngredient10}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient11 == "") ? "d-none" : ""} ">${e.strIngredient11}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1   ${(e.strIngredient12 == "") ? "d-none" : ""} ">${e.strIngredient12}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient13 == "") ? "d-none" : ""} ">${e.strIngredient13}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient14 == "") ? "d-none" : ""} ">${e.strIngredient14}</li>
                    <li class="text-bg-info d-inline-block rounded p-1 m-1    ${(e.strIngredient15 == "") ? "d-none" : ""} ">${e.strIngredient15}</li>
            </ul>
            <h2 class="text-white">Tags: </h2>
           <a href="${e.strTags}"><button class="btn btn-outline-success">Source</button></a>
            <a href="${e.strYoutube}"><button class="btn btn-outline-danger">Youtube</button></a>
        </div>`
    })
    document.getElementById("details").innerHTML = temp

    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//meal category
let mealsCategories = []

async function getMealsCategories(){
    let req = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let data = await req.json()
        mealsCategories = data.categories
    displayMealsCategories()
}
getMealsCategories()

function displayMealsCategories(){
    temp = ''
    mealsCategories.forEach((e)=>{
        temp += `<div class="col-md-3">
        <div class="foodDiv rounded position-relative">
            <img class="w-100" src="${e.strCategoryThumb}" alt="">
            <div class="overlay">
                <h2>${e.strCategory}</h2>
            </div>
            <div categoryMeal="${e.strCategory}" class="category-meal-name"></div>
        </div>
    </div>`
    })
    document.getElementById("foodCategory").innerHTML = temp

    $(".category-meal-name").on("click",function(e){
        let mealCategory = $(e.target).attr("categoryMeal")
        $(".specific").removeClass("d-none")
        getMealsCategoriesSpecific(mealCategory)
    })
}

$("#categoriesLink").on("click",function(){
    $(".categoryOverlay").removeClass("d-none")
    $(".details").addClass("d-none")
    $(".specific").addClass("d-none")
    $(".areameals").addClass("d-none")
    $(".area").addClass("d-none")
    $(".ingredients").addClass("d-none")
    $(".ingredientsmeals").addClass("d-none")
    $(".contact").addClass("d-none")
    $(".search").addClass("d-none")

})



//////////////////choosen category
let mealsCategoriesSpecific = []

async function getMealsCategoriesSpecific(category){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data = await req.json()
    mealsCategoriesSpecific = data.meals
    displayMealsCategoriesSpecific()
}


function displayMealsCategoriesSpecific(){
    let temp = ''
    mealsCategoriesSpecific.forEach((e)=>{
        temp+=`<div class="col-md-3">
        <div class="bg-danger specificMeals rounded position-relative">
            <img class="w-100" src="${e.strMealThumb}" alt="">
            <div class="overlaySpecific">
                <h2>${e.strMeal}</h2>
            </div>
            <div mealId="${e.idMeal}" class="mealId"></div>
        </div>
    </div>`
    })
    document.getElementById("specific").innerHTML = temp

    $(".mealId").on("click",function(e){
        let mealId = $(e.target).attr("mealId")
        $(".details").removeClass("d-none")
        $(".categoryOverlay").addClass("d-none")
        $(".specific").addClass("d-none")
        $(".area").addClass("d-none")
        $(".areameals").addClass("d-none")
        $(".ingredients").addClass("d-none")

        getMealsDetails(mealId)
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//get and display Areas
let Areas = []

async function getAreas(){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await req.json()
    Areas = data.meals
    displayAreas()
}
getAreas()

function displayAreas(){
    let temp = ''
    Areas.forEach((e)=>{
        temp += ` <div class="col-md-3 position-relative">
        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
    <h2 class="text-white">${e.strArea}</h2>
    <div Area="${e.strArea}" class="AreaName"></div>
    </div>`
    })
    document.getElementById("getAreas").innerHTML = temp
    $(".AreaName").on("click",function(e){
        let areaName = $(e.target).attr("Area")
        getAreaMeal(areaName)
        $(".area").addClass("d-none")
        $(".areameals").removeClass("d-none")
    })
}
$("#areaLink").on("click",function(){
    $(".details").addClass("d-none")
    $(".categoryOverlay").addClass("d-none")
    $(".specific").addClass("d-none")
    $(".area").removeClass("d-none")
    $(".areameals").addClass("d-none")
    $(".ingredients").addClass("d-none")
    $(".ingredientsmeals").addClass("d-none")
    $(".contact").addClass("d-none")
    $(".search").addClass("d-none")

})


//get and display area meals

let areamealsList = []

async function getAreaMeal(area){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await req.json()
    areamealsList = data.meals
    displayAreaMeals()
}

function displayAreaMeals(){
    let temp = ''
    areamealsList.forEach((e)=>{
        temp += `<div class="col-md-3">
        <div class="foodDiv rounded position-relative">
            <img class="w-100" src="${e.strMealThumb}" alt="">
            <div class="overlay">
                <h2>${e.strMeal}</h2>
            </div>
            <div mealId="${e.idMeal}" class="areaMealId"></div>
        </div>
    </div>`
    })
    document.getElementById("areamealsData").innerHTML = temp
    $(".areaMealId").on("click",function(e){
        let mealId = $(e.target).attr("mealId")
        $(".details").removeClass("d-none")
        $(".categoryOverlay").addClass("d-none")
        $(".specific").addClass("d-none")
        $(".area").addClass("d-none")
        $(".areameals").addClass("d-none")
        $(".ingredientsmeals").addClass("d-none")
        getMealsDetails(mealId)
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let ingredients = []

async function getIngredients(){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await req.json()
    ingredients = data.meals
    displayIngredients()
}
getIngredients()

function displayIngredients(){
    let temp = ''
    for (let i = 0; i < 20; i++) {
        temp += `<div class="col-md-3 text-center position-relative">
        <i class="fa-solid fa-solid fa-drumstick-bite top fa-4x text-white"></i>
        <h2 class="text-white">${ingredients[i].strIngredient}</h2>
        <p class="text-white">${ingredients[i].strDescription}</p>
        <div ingredient="${ingredients[i].strIngredient}" class="ingredientName"></div>
    </div> `  
    }
    document.getElementById("getIngredients").innerHTML = temp
    $(".ingredientName").on("click",function(e){
        let ingredientName = $(e.target).attr("ingredient")
        $(".ingredients").addClass("d-none")
        $(".ingredientsmeals").removeClass("d-none")
        getIngreadinentMeal(ingredientName)
    })
}
$("#ingredients").on("click",function(){
    $(".details").addClass("d-none")
    $(".categoryOverlay").addClass("d-none")
    $(".specific").addClass("d-none")
    $(".area").addClass("d-none")
    $(".areameals").addClass("d-none")
    $(".ingredients").removeClass("d-none")
    $(".ingredientsmeals").addClass("d-none")
    $(".contact").addClass("d-none")
    $(".search").addClass("d-none")

})





//ingrediants meals

let ingredientmealsList = []

async function getIngreadinentMeal(ingredient){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let data = await req.json()
    ingredientmealsList = data.meals
    displayIngredientsMeals()
}

function displayIngredientsMeals(){
    let temp = ''
    ingredientmealsList.forEach((e)=>{
        temp += `<div class="col-md-3">
        <div class="foodDiv rounded position-relative">
            <img class="w-100" src="${e.strMealThumb}" alt="">
            <div class="overlay">
                <h2>${e.strMeal}</h2>
            </div>
            <div mealId="${e.idMeal}" class="ingredientMeal"></div>
        </div>
    </div>`
    })
    document.getElementById("ingredientmealdata").innerHTML = temp
    $(".ingredientMeal").on("click",function(e){
        let mealId = $(e.target).attr("mealId")
        $(".details").removeClass("d-none")
        $(".categoryOverlay").addClass("d-none")
        $(".specific").addClass("d-none")
        $(".area").addClass("d-none")
        $(".areameals").addClass("d-none")
        $(".ingredientsmeals").addClass("d-none")
        $(".search").addClass("d-none")
        getMealsDetails(mealId)
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//search
let searchName = document.getElementById("searchName")
let searchLetter = document.getElementById("searchLetter")
let searchList = []
let searchLetterList = []

$(searchName).on("keyup",function(){
    let searchNameValue = searchName.value
    getSearchName(searchNameValue)
})

async function getSearchName(name){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await req.json()
    searchList = data.meals
    console.log(searchList);
    displaySearchName()
}



function displaySearchName(){
    temp = ''
    searchList.forEach((e)=>{
        temp += `<div class="col-md-3 pt-5">
        <div class="foodDiv rounded position-relative">
            <img class="w-100" src="${e.strMealThumb}" alt="">
            <div class="overlay">
                <h2>${e.strMeal}</h2>
            </div>
            <div mealId="${e.idMeal}" class="searchName"></div>
        </div>
    </div>`
    })
    document.getElementById("searchData").innerHTML = temp

    $(".searchName").on("click",function(e){
        let mealId = $(e.target).attr("mealId")
        $(".details").removeClass("d-none")
        $(".categoryOverlay").addClass("d-none")
        $(".specific").addClass("d-none")
        $(".area").addClass("d-none")
        $(".areameals").addClass("d-none")
        $(".ingredientsmeals").addClass("d-none")
        $(".search").addClass("d-none")
        getMealsDetails(mealId)
    })
}

///////////////
$(searchLetter).on("keyup",function(){
    let searchLetterValue = searchLetter.value
    getSearchLetter(searchLetterValue)
})


async function getSearchLetter(Letter){
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`)
    let data = await req.json()
    searchLetterList = data.meals
    displaySearchLetter()
}


function displaySearchLetter(){
    temp = ''
    searchLetterList.forEach((e)=>{
        temp += `<div class="col-md-3 pt-5">
        <div class="foodDiv rounded position-relative">
            <img class="w-100" src="${e.strMealThumb}" alt="">
            <div class="overlay">
                <h2>${e.strMeal}</h2>
            </div>
            <div mealId="${e.idMeal}" class="searchLetter"></div>
        </div>
    </div>`
    })
    document.getElementById("searchData").innerHTML = temp

    $(".searchLetter").on("click",function(e){
        let mealId = $(e.target).attr("mealId")
        $(".details").removeClass("d-none")
        $(".categoryOverlay").addClass("d-none")
        $(".specific").addClass("d-none")
        $(".area").addClass("d-none")
        $(".areameals").addClass("d-none")
        $(".ingredientsmeals").addClass("d-none")
        $(".search").addClass("d-none")
        getMealsDetails(mealId)
    })
}


$("#searchLink").on("click",function(){
    $(".categoryOverlay").addClass("d-none")
    $(".details").addClass("d-none")
    $(".specific").addClass("d-none")
    $(".areameals").addClass("d-none")
    $(".area").addClass("d-none")
    $(".ingredients").addClass("d-none")
    $(".ingredientsmeals").addClass("d-none")
    $(".contact").addClass("d-none")
    $(".search").removeClass("d-none")
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// regex



let nameuser = document.getElementById("name")
let email = document.getElementById("email")
let phone = document.getElementById("phone")
let age = document.getElementById("age")
let password = document.getElementById("password")
let repassword = document.getElementById("repassword")
let alertnameuser = document.getElementById("alertname")
let alertemail = document.getElementById("alertemail")
let alertphone = document.getElementById("alertphone")
let alertage = document.getElementById("alertage")
let alertpassword = document.getElementById("alertpassword")
let alertrepassword = document.getElementById("alertrepassword")
let nameuserreturn = false
let emailreturn = false
let phonereturn = false
let agereturn = false
let passwordreturn = false
let repasswordreturn= false


function Valid(rgx,input,alertInput){
    if(rgx.test(input.value) == true){
        alertInput.classList.add("d-none")
        return true
}else{
    alertInput.classList.remove("d-none")
    return false
}
}

$(nameuser).on("keyup",function(){
    let NameRgx = /^[a-zA-Z]*$/
    Valid(NameRgx,nameuser,alertnameuser)
    nameuserreturn = Valid(NameRgx,nameuser,alertnameuser)
    enabled()
})
$(email).on("keyup",function(){
    let EmailRgx = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/
    Valid(EmailRgx,email,alertemail)
    emailreturn = Valid(EmailRgx,email,alertemail)
    enabled()
})
$(phone).on("keyup",function(){
    let phoneRgx = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/
    Valid(phoneRgx,phone,alertphone)
    phonereturn = Valid(phoneRgx,phone,alertphone)
    enabled()
})
$(age).on("keyup",function(){
    let ageRgx = /^[1-9][0-9]?$|^100$/
    Valid(ageRgx,age,alertage)
    agereturn = Valid(ageRgx,age,alertage)
    enabled()
})
$(password).on("keyup",function(){
    let passwordRgx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    Valid(passwordRgx,password,alertpassword)
    passwordreturn = Valid(passwordRgx,password,alertpassword)
    enabled()
})


repassword.addEventListener("keyup",function(){
    if(repassword.value != password.value){
        alertrepassword.classList.remove("d-none")
        repasswordreturn = false
        enabled()
    }
    else{
        alertrepassword.classList.add("d-none")
        repasswordreturn = true
        enabled()
    }
})


$("#contactLink").on("click",function(){
    $(".contact").removeClass("d-none")
})

function enabled(){
    if(nameuserreturn == true  && emailreturn == true && phonereturn == true && agereturn == true && passwordreturn == true && repasswordreturn == true){
        $(".btn").removeClass("disabled")
    }else{
        $(".btn").addClass("disabled")
    }    
}



//////////////////////////////////////////////////////////////////
