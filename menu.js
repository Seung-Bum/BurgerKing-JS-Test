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

// 주문목록 배열
const orders = []

// 주문한 상품의 idx만 따로 저장하는 배열 
const carts = []

//Total Price 계산
function totalPricePrint () {
    let totalPrice = 0
    for (let e = 0; e < orders.length; e++) {
        const order = orders[e]
        totalPrice += order.price * order.count
    }
    document.querySelector("#xTotal").innerHTML = `Total Price: ${totalPrice}&#8361;`
}

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
                                <button type="button" id="burgerInfoBtn" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#infoDiv">information</button>
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

// 상품 purchase 버튼 이벤트 -> 누를때마다 idx값은 변경된다.
//                          -> 누를때마다 idx값을 carts에 담는다.
//                              -> 중복되는 idx값은 carts에 담지 않는다.
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
        console.log("--------------------------------------")
        console.log("IDX: " + idx)

        if (carts.length != 0) {
            for (let i = 0; i < carts.length; i++) {
                
                // 중복된 상품의 idx는 carts에 추가하지 않습니다.
                if (carts[i]==idx) {
                    break
                } else {
                    carts.push(idx)
                    console.log("CARTS: " + carts)
                    break
                }
            }
        } else {
            carts.push(idx)
            console.log("CARTS: " + carts)
        }
        
        // targetMenu로 저장됨
        const targetMenu = menus[idx]

        for (let i = 0; i < orders.length; i++) {
            // 전체 상품의 종류를 넘길 경우 메시지를 보냅니다.
            if (7 < orders.length) {
                return alert('The order list is too long. please start over!')
            }
            // 중복된 상품을 누를 경우 메시지를 보냅니다.
            if (targetMenu == orders[i]) {
                return alert('There is already a product in your order list.')
            }
            
        }

        // 해당 상품을 orderList에 추가
        orders.push(targetMenu)
        console.log(orders)

        // orderList의 등록된 모든상품 출력
        // order의 idx로 등록할 경우 purchase를 누를때마다 idx값이 변하기 때문에
        // 변화지 않게 carts에 idx를 담아 활용한다.
        //   -> carts[i] = 각 order의 idx
        for (let i = 0; i < orders.length; i++) {

            const order = orders[i]

            str += `<div class="d-flex justify-content-center">
            <div class="card" style="width: 10rem;">
            <img src="${order.picture}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${order.name}</h5>
              <div id="infoDiv">
                <div class="xCountClass" id="xCount${carts[i]}">${order.count[0]}EA</div>
              </div>
              <div id="infoDiv">
                <div class="card-text" id="xPrice${carts[i]}">${order.price * order.count}&#8361;</div>
              </div>
                <div class="row" id="xNum">
                    <a href="#" id="btn-add" class="btn btn-secondary" data-targetNum="${carts[i]}">Add</a>
                    <a href="#" id="btn-Subtract" class="btn btn-secondary" data-targetNum="${carts[i]}">Subtract</a>
                </div>
            </div>
          </div>`
            
        }
        modal.innerHTML = str

        //Total Price 계산
        totalPricePrint()

        // 상품추가 버튼 이벤트
        $(document).ready(function() {
            $(document).on("click",'#btn-add', function(e){
                e.stopImmediatePropagation()
                e.preventDefault()
        
                //클릭한 요소값을 가져옴
                const target = e.target
                const dataNum = target.getAttribute("data-targetNum")
                console.log("--------------------------------------")
                console.log("ADD버튼 눌렀음")
                console.log("DATANUM: ", dataNum)

                for (let i = 0; i < carts.length; i++) {

                    const order = orders[i]
                    let count = order.count[0]

                    if (carts[i] == dataNum) {

                        console.log("CARTS: ", carts[i])
                        count++
                        console.log("COUNT: ", count)

                        order.count[0] = count
                        let price = count * order.price
                        document.querySelector(`#xPrice${carts[i]}`).innerHTML = `${price}&#8361;`
                        document.querySelector(`#xCount${carts[i]}`).innerHTML = `${count}EA`

                        //Total Price 계산
                        totalPricePrint()
                        break
                    }
                }
            })
        }, false)

        // 상품 빼기 버튼
        $(document).ready(function() {
            $(document).on("click",'#btn-Subtract', function(e){
                e.stopImmediatePropagation()
                e.preventDefault()
        
                //클릭한 요소값을 가져옴
                const target = e.target
                const dataNum = target.getAttribute("data-targetNum")
                console.log("--------------------------------------")
                console.log("SUB버튼 눌렀음")
                console.log("DATANUM: ", dataNum)

                for (let i = 0; i < carts.length; i++) {

                    const order = orders[i]
                    let count = order.count[0]
                    
                    if (carts[i] == dataNum) {

                        count--
                        console.log("CARTS: ", carts[i])
                        console.log("COUNT: ", count)

                        // 제품의 count가 0일 경우 
                        if (count == 0) {
                            // 해당 order 삭제  (order num i를 삭제한다. / carts도 같이 삭제)
                            console.log("--------------------------------------")
                            orders.splice(i,1)
                            carts.splice(i,1)
                            console.log("--Delete Complite--")

                            // orders 주문목록 확인
                            console.log("Delete Order: ", orders)
                            console.log("Delete Carts: ", carts)

                            // orders가 하나도 없는 경우 처음 페이지로 돌아간다.
                            if (orders.length == 0) {
                                alert("The order list is empty.")
                                window.location.href = "index.html"
                                break
                            }
            
                            let str = ""
                            // orer.count가 0인 경우인 orer만 제외시키고 다른 메뉴 출력
                            for (let j = 0; j < orders.length; j++) {

                                console.log("---ORDER LIST 재출력---")
                                console.log("재출력 확인 CARTS: ", carts[j])
                    
                                    str += `<div class="d-flex justify-content-center">
                                    <div class="card" style="width: 10rem;">
                                    <img src="${orders[j].picture}" class="card-img-top">
                                    <div class="card-body">
                                    <h5 class="card-title">${orders[j].name}</h5>
                                        <div id="infoDiv">
                                            <div class="xCountClass" id="xCount${carts[j]}">${orders[j].count[0]}EA</div>
                                        </div>
                                        <div id="infoDiv">
                                            <div class="card-text" id="xPrice${carts[j]}">${orders[j].price * orders[j].count[0]}&#8361;</div>
                                        </div>
                                        <div class="row" id="xNum">
                                            <a href="#" id="btn-add" class="btn btn-secondary" data-targetNum="${carts[j]}">Add</a>
                                            <a href="#" id="btn-Subtract" class="btn btn-secondary" data-targetNum="${carts[j]}">Subtract</a>
                                        </div>
                                    </div>
                                </div>`

                            }
                            modal.innerHTML = str

                            //Total Price 계산
                            totalPricePrint()
                            break
                        } else {
                            order.count[0] = count
                            let price = count * order.price
                            document.querySelector(`#xPrice${carts[i]}`).innerHTML = `${price}&#8361;`
                            document.querySelector(`#xCount${carts[i]}`).innerHTML = `${count}EA`

                            //Total Price 계산
                            totalPricePrint()
                        }
                    } 
                }
            })
        }, false)
    });
}, false);


// information 모달창 body
const infoModal = document.querySelector("#infoDiv .modal-dialog .modal-content .modal-body")
// information 모달창 이벤트 생성
const burgerInfoBtns = document.querySelectorAll("#burgerInfoBtn")

const infomation = []

burgerInfoBtns.forEach(burgerInfoBtn => {
	burgerInfoBtn.addEventListener("click", function (e) {
        let str = ""

        //클릭한 요소값을 가져옴
        const target = e.target
        const purBtnData = target.closest("#xBtn-group")

        //상품의 저장되 있던 idx값을 idx변수에 저장
        const idx = purBtnData.getAttribute("data-idx")
        console.log("--------------------------------------")
        console.log("IDX: " + idx)


        var file = new FileReader()
        file.onload = () => {
            // document.getElementById('output').textContent = file.result
            let burgerInfo = file.result.split('\n')
            console.log("hi")
            for (let i = 0; i < burgerInfo.length; i++) {
              console.log(`index:${i}: ${burgerInfo[i]}`)
            }
        }
        file.readAsText(this.files[0])


    })
})