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
// 구매버튼에서 상품 idx추출
const xPurBtns = document.querySelectorAll("#purId")

console.log(xPurBtns)


xPurBtns.forEach(purBtn => {
	purBtn.addEventListener("click", function (e) {
        console.log("실행")

        //클릭한 요소값을 가져옴
        const target = e.target
        console.log("TARGET: " + target)

        const purBtnData = target.closest("#xBtn-group")
        console.log(purBtnData)

        //상품의 저장되 있던 idx값을 idx변수에 저장
        const idx = purBtnData.getAttribute("data-idx")
        console.log("IDX: " + idx)

        // targetMenu로 저장됨
        const targetMenu = menus[idx]

        let str = `<img src="${targetMenu.picture}" style="float: right; width:150px; height:100px;"><br>
                    <h3>${targetMenu.name}</h3><br>
                    <h3>${targetMenu.price}</h3>`

        modal.innerHTML = str

        // modal의 img를 targetPicture으로 변경
        // popEle.querySelector("img").setAttribute("src", targetPicture)


    }, false);
});
