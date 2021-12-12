// 메뉴배열
const menus = [
    {name:'Shrimp Whopper', price:6900, picture:'img/shrimp.jpg'},
    {name:'Quattro Cheese', price:7900, picture:'img/quattroCheese.jpg'},
    {name:'Monster', price:9500, picture:'img/monster.jpg'},
    {name:'Bulgogi Whopper', price:6500, picture:'img/bulgogiWhopper.jpg'}
]

const menuList = document.querySelector("#menuList")
let str =''
for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    // data-idx값(getAttribute으로 나중에 활용용)을 부여해서주문처리할때 사용
    str += `
            <div class="card shadow-sm" data-idx="${i}" data-name="${menu.name}" data-price="${menu.price}">
            <img class="burger" src=${menu.picture}>
            <div class="card-body">
            <p class="card-text">${menu.name}</p>
            <p class="card-text">${menu.price}&#8361;</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">purchase</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">information</button>
                </div>
                <small class="text-muted" align="right">cooking time<br>10 mins</small>
            </div>
            </div>
        </div>`

}
menuList.innerHTML = str