let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let mood = "create";
let tmp;

// getTotal
var getTotal = () => {
  if (price.value != "") {
    var result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
};

// save localStorage
let dataPro;
if (localStorage.product) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// create product
submit.onclick = () => {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
  };
  if (mood === "create") {
    if (
      title.value != null &&
      price.value != null &&
      count.value <= 200 &&
      count.value > 0 &&
      category.value != null
    ) {
      // count
      for (let i = 0; i < newPro.count; i++) {
        if (newPro.count > 0) {
          dataPro.push(newPro);
        }
      }
      localStorage.setItem("product", JSON.stringify(dataPro));
      showData();
      clearData();
    } else {
      alert("Enter Information way success");
    }
  } else {
    dataPro[tmp] = newPro;
    submit.value = "Create";
    count.style.display = "block";
    localStorage.product = JSON.stringify(dataPro);
    showData();
    clearData();
    getTotal();
  }
};

// clear input
var clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

// Show Data
var showData = () => {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    let id = i + 1;
    table += `<tr>
        <td>${id}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><input type = "submit" onclick="update(${i})" value= "Update"></td>
        <td><input type = "submit" onclick= "deletePro(${i})" id = "delete" value= "Delete"></td>
      </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  if (dataPro.length > 0) {
    document.getElementById(
      "allDelete"
    ).innerHTML = `<input type = "submit" id = "allDelete" value= "All Delete ( ${dataPro.length} )">`;
  } else {
    document.getElementById("allDelete").innerHTML = "";
  }
};
showData();

// delete
var deletePro = (i) => {
  dataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

// deleteAll
var deleteAll = document.getElementById("allDelete");
deleteAll.onclick = () => {
  dataPro.splice(0);
  localStorage.clear();
  showData();
};

// update

var update = (i) => {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  total.innerHTML = dataPro[i].total;
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.value = "Update";
  mood = "Update";
  tmp = i;
};

// search
var searchMood = "Title";
var getSearchMood = (id) => {
  if (id == "title") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
};

var searchData = (value) => {
  console.log(value)
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "Title") {
      if (dataPro[i].title.includes(value)) {
        let id  = i + 1 
        table += `<tr>
        <td>${id}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><input type = "submit" onclick="update(${i})" value= "Update"></td>
        <td><input type = "submit" onclick= "deletePro(${i})" id = "delete" value= "Delete"></td>
      </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        let id  = i + 1 
        table += `<tr>
        <td>${id}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><input type = "submit" onclick="update(${i})" value= "Update"></td>
        <td><input type = "submit" onclick= "deletePro(${i})" id = "delete" value= "Delete"></td>
      </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
};

// clean Data
