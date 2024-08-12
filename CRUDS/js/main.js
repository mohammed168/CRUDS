let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//get total

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00101';
    }
}

//ceat product

let datePro;
if(localStorage.product != null){
    datePro = JSON.parse(localStorage.product);
}else{
    datePro = [];
}
submit.onclick = () => {
    let newPro = {
        title: title.value ,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count : count.value,
        category: category.value,
        category: category.value.toLowerCase(),
    }
    //count
    if(title.value != ''){
        if(mood === 'create'){
    if(newPro.count > 1){
        for(let i = 0; i < newPro.count; i++){
            datePro.push(newPro);
        }
    }
    }else{
        datePro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    }
    

    //save local storege
    localStorage.setItem('product' , JSON.stringify(datePro));
    clearDate();
    showDate();
}

//clear inputs

function clearDate(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read

function showDate(){
    getTotal();
    let table = '';
    for(let i = 0; i < datePro.length; i++){
        table += `
        <tr>
                        <td>${i}</td>
                        <td>${datePro[i].title}</td>
                        <td>${datePro[i].price}</td>
                        <td>${datePro[i].taxes}</td>
                        <td>${datePro[i].ads}</td>
                        <td>${datePro[i].discount}</td>
                        <td>${datePro[i].total}</td>
                        <td>${datePro[i].category}</td>
                        <td><button onclick="updateDate(${i})"  id="update">update</button></td>
                        <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>

                    </tr>
        `;
          document.getElementById('tbody').innerHTML = table  ;

    }
    let btnDelete = document.getElementById('deleteAll');
    if(datePro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datePro.length})</button>`
    } else {
        btnDelete.innerHTML = '';
    }
}
showDate();

//delete

  function deleteDate (i) {
    datePro.splice(i, 1);
    localStorage.product = JSON.stringify(datePro);
    showDate();
    if(i == 0 ){
        location.reload();
    }
  }































































































































































































































  
  function deleteAll () {
    localStorage.clear();
    datePro.splice(0);
    location.reload(); 
  }

//update

function updateDate (i){
    title.value = datePro[i].title; 
    price.value = datePro[i].price; 
    taxes.value = datePro[i].taxes; 
    ads.value = datePro[i].ads; 
    discount.value = datePro[i].discount; 
    category.value = datePro[i].category;  
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp =i;
    scroll({top:0, behavior: 'smooth'}); 
}

//search

let searchMood = 'title';
function getSearchMood (id){
    if( id == 'searchTitle' ){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
}else {
    searchMood = 'category';
    search.placeholder = 'Search By Category';

}
search.focus();
search.value = '';
showDate();
}
function searchDate(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0 ; i < datePro.length ; i++){
            if(datePro[i].title.includes(value)){
                table += `
                <tr>
                                <td>${i}</td>
                                <td>${datePro[i].title}</td>
                                <td>${datePro[i].price}</td>
                                <td>${datePro[i].taxes}</td>
                                <td>${datePro[i].ads}</td>
                                <td>${datePro[i].discount}</td>
                                <td>${datePro[i].total}</td>
                                <td>${datePro[i].category}</td>
                                <td><button onclick="updateDate(${i})"  id="update">update</button></td>
                                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        
                            </tr>
                `;
            }
        }
    }else{
        for(let i = 0 ; i < datePro.length ; i++){
            if(datePro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                                <td>${i}</td>
                                <td>${datePro[i].title}</td>
                                <td>${datePro[i].price}</td>
                                <td>${datePro[i].taxes}</td>
                                <td>${datePro[i].ads}</td>
                                <td>${datePro[i].discount}</td>
                                <td>${datePro[i].total}</td>
                                <td>${datePro[i].category}</td>
                                <td><button onclick="updateDate(${i})"  id="update">update</button></td>
                                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        
                            </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table  ;
}
//clean date
