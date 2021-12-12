// 메뉴배열
const menus = [
    {name:'Shrimp Whopper', price:6900, picture:'img/shrimp.jpg'},
    {name:'Quattro Cheese', price:7900, picture:'img/quattroCheese.jpg'},
    {name:'Monster', price:9500, picture:'img/monster.jpg'},
    {name:'Bulgogi Whopper', price:6500, picture:'img/bulgogiWhopper.jpg'}
]


// 메뉴리스트 생성
const menuList = document.querySelector("#menuList")
let str =''
for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    // data-idx값(getAttribute으로 나중에 활용용)을 부여해서주문처리할때 사용
    str += `
            <div class="card shadow-sm" data-name="${menu.name}" data-price="${menu.price}">
            <img class="burger" src=${menu.picture}>
            <div class="card-body">
            <p class="card-text">${menu.name}</p>
            <p class="card-text">${menu.price}&#8361;</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <!-- Trigger the modal with a button -->
                <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#orderDiv" data-idx="${i}">purchase</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">information</button>
                </div>
                <small class="text-muted" align="right">cooking time<br>10 mins</small>
            </div>
            </div>
        </div>`

}
menuList.innerHTML = str

// 모달창 body
const modal = document.querySelector("#orderDiv .modal-dialog .modal-content .modal-body")

// 모달창 이벤트 생성
// 구매버튼
const purchaseBtn = document.querySelector("#orderDiv")
purchaseBtn.addEventListener('click', function (e) {
    let orderStr = `<p>hi</p>`
    modal.innerHTML = orderStr

    //클릭한 요소값을 가져옴
    // const target = e.target
    // console.log("TARGET: " + target)

    // //div의 #menuCard 가까이 클릭
    // const btnEle = target.closest("#menuCard")

    //상품의 저장되 있던 idx값을 idx변수에 저장
    const idx = purchaseBtn.getAttribute("data-idx")
    console.log("IDX: " + idx)
    
    

}, false)
