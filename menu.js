// 메뉴배열
const menus = [
    {name:'Shrimp Whopper', price:6900, picture:'img/shrimp.jpg', count: [1]},
    {name:'Quattro Cheese', price:7900, picture:'img/quattroCheese.jpg', count: [1]},
    {name:'Monster Burger', price:9500, picture:'img/monster.jpg', count: [1]},
    {name:'Bulgogi Whopper', price:6500, picture:'img/bulgogiWhopper.jpg', count: [1]},
    {name:'Bacon Cheese', price:6500, picture:'img/baconCheese.jpg', count: [1]},
    {name:'Long Chicken', price:4400, picture:'img/longChicken.jpg', count: [1]},
    {name:'Kings Chicken', price:2900, picture:'img/kingChicken.jpg', count: [1]},
    {name:'Mushroom Bulgogi', price:6500, picture:'img/mushroomBulgogi.jpg', count: [1]}
]

const orders = []

const carts = []

// 메뉴리스트 생성
const menuList = document.querySelector("#menuList")
let str =''
for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    // data-idx값(getAttribute으로 나중에 활용)을 부여해서 주문처리할때 사용
    str += `
            <div class="card shadow-sm" data-name="${menu.name}" data-price="${menu.price}">
                <img class="burger" src=${menu.picture}>
                    <div class="card-body">
                        <p class="card-text">${menu.name}</p>
                        <p class="card-text">${menu.price}&#8361;</p>
                    <div class="d-flex justify-content-between align-items-center">
                            <div id="xBtn-group" class="btn-group" data-idx="${i}">
                                <!-- Trigger the modal with a button -->
                                <button type="button" id="purId" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#orderDiv">purchase</button>
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
const xPurBtns = document.querySelectorAll("#purId")


xPurBtns.forEach(purBtn => {
	purBtn.addEventListener("click", function (e) {

        let str = ""

        //클릭한 요소값을 가져옴
        const target = e.target
        // console.log("TARGET: " + target)

        const purBtnData = target.closest("#xBtn-group")
        // console.log(purBtnData)

        //상품의 저장되 있던 idx값을 idx변수에 저장
        const idx = purBtnData.getAttribute("data-idx")
        console.log("IDX: " + idx)

        carts.push(idx)
        console.log("CARTS: " + carts)

        // targetMenu로 저장됨
        const targetMenu = menus[idx]

        for (let i = 0; i < orders.length; i++) {

            if (7 < orders.length) {
                return alert('The order list is too long. please start over!')
            }
            
            if (targetMenu == orders[i]) {
                return alert('There is already a product in your order list.')
            }
            
        }

        orders.push(targetMenu)
        console.log(orders)

        for (let i = 0; i < orders.length; i++) {
            
            const order = orders[i]

            str += `<div class="d-flex justify-content-center">
            <div class="card" style="width: 10rem;">
            <img src="${order.picture}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${order.name}</h5>
              <div class="row" id="infoDiv">
                <div class="card-text">${order.price}&#8361;</div>
                <div class="xCountClass" id="xCount${i}">${order.count[0]}EA</div>
              </div>
                <div class="row" id="xNum">
                    <a href="#" id="btn-add" class="btn btn-secondary" data-targetNum="${carts[i]}">Add</a>
                    <a href="#" id="btn-cancel" class="btn btn-secondary">Subtract</a>
                </div>
            </div>
          </div>`
        }

        modal.innerHTML = str


        $(document).ready(function() {
            $(document).on("click",'#btn-add', function(e){
                e.stopImmediatePropagation()
                e.preventDefault()
        
                //클릭한 요소값을 가져옴
                const target = e.target
                const dataNum = target.getAttribute("data-targetNum")
                console.log(target)
                console.log("dataNum: ", dataNum)

                for (let i = 0; i < carts.length; i++) {

                    const order = orders[i]
                    let count = order.count[0]
        
                    if (carts[i] == dataNum) {

                        console.log('im in')
                        console.log(count)
                        
                        count++

                        let countStr = `${count}EA`
                        document.querySelector(`#xCount${i}`).innerHTML = countStr
                        order.count[0] = count

                        break
                    }
                    
                }
                
            })
        }, false)

    });
}, false);



