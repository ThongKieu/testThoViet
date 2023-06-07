
// const replyCmt = document.getElementById('replyCmtTV');
// const replyCmtChecked = document.getElementById('replyCmt');
// // let isClicked = true;
// replyCmt.addEventListener('click', function (e) {
//   e.preventDefault();
//   if (replyCmtChecked.style.display=== 'none' ) {
//     replyCmtChecked.style.display = 'block';
//   } else {
//     replyCmtChecked.style.display = 'none';
//   }
// })
function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
}
let textarea = document.querySelector(".resize-ta");
textarea.addEventListener("keyup", () => {
  textarea.style.height = calcHeight(textarea.value) + "px";
});
// --function comment
const btnSubmitCmt = document.querySelector('.formBtn-Cmt');
const cmtEl = document.querySelector('.containerCmt');
const fullNameCmt = document.querySelector('#fullName');
const numberPhone = document.querySelector('#sdt');
const textareaCmtEl = document.querySelector('#textAreaCmt');
const countCmt = document.querySelector(".countClass");

btnSubmitCmt.addEventListener('click', handleSubmitCmt);
cmtArr = [];
let positionCmt = false;
let cmtCount = 0;
// function button comment 
function handleSubmitCmt(e) {
  const fullNameEl = fullNameCmt.value;
  const phoneEl = numberPhone.value;
  const textareaEl = textareaCmtEl.value;
  if (fullNameEl && phoneEl && textareaEl !== "") {
    // create comment 
    // thay the bang fetch api
    newComment = {
      "id": Math.floor((Math.random() * 1000) + 1),
      "name": fullNameEl,
      "phone": phoneEl,
      "textarea": textareaEl,
      "typeOfComment": positionCmt
    }
    cmtArr.push(newComment)
    console.log(newComment);
    if (positionCmt === false) {
      countCmtEl()
    }
    resetFormValue();
    addCmt(newComment);

  }
  console.log(fullNameEl);
  console.log(phoneEl);
  console.log(textareaEl);

  e.preventDefault();
}

function resetFormValue() {
  fullNameCmt.value = '';
  numberPhone.value = '';
  textareaCmtEl.value = '';
  positionCmt = false;
}
function countCmtEl() {
  cmtCount++;
  countCmt.innerHTML = cmtCount;

}
const showReplyCmtId = document.querySelectorAll('.showReply');
showReplyCmtId.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    let parentCmt = e.target.closest(".commentsCmt");
    let _id = parentCmt.id;
    if (_id) {
      let childrenCmt = parentCmt.querySelectorAll(`[dataset=${_id}]`);
      childrenCmt.forEach(child => child.classList.toggle("opened"));
      console.log(_id);
      console.log(showReplyCmtId);
      console.log(parentCmt);
    }
  })
)
function addCmt(item) {
  // const letter = (item.fullNameCmt).charAt(0);
  // add element 
  const ulEl = document.createElement('div');
  // add class 
  ulEl.classList = "commentsCmt opened";
  // ulEl.classList = "";
  // add id 
  ulEl.id = item.id;
  // add html 
  ulEl.innerHTML = `

  <div class="commentCard">
    <h4 class="nameTitle">${item.name}</h4>
    <p class="pContentCmt">
      ${item.textarea} 
    </p>
    <div class="footerContentCmt">
      <a href="#showCmtTV" id="showCmtTV" class="showComment" style="margin-right: 10px;"><small>Xem nhiều bình luận hơn</small></a>
      <a href="#replyCmtTV" id="replyCmtTV" class="showReply"><small>Phản hồi</small></a>
      
    </div>
  </div>
  <div class="commentsCmt" dataset="${item.id}" id="first-reply">
    <div class="commentCard">
      <form action="">
        <div id="infoCmt">
          <div class="gridCmt">
            <div class="grid-item-cmt">
              <input type="text" name="name" id="fullname" class="form-controlFix" placeholder=" "
                style="background-color: white;" required>
              <label class="labelField" for="name">Tên (<span style="color: red;">*</span>)</label>
            </div>
            <div class="grid-item-cmt">
              <input type="number" name="sdt" id="sdt" class="form-controlFix" placeholder=" "
                style="background-color: white;" required>
              <label class="labelField" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>

            </div>
          </div>
          <div class="textarea-cmt">
            <textarea name="msg" id="textAreaCmt" msg cols="30" rows="1"
              class="form-controlFixTextarea resize-ta" style="background-color: white; overflow: hidden;"
              placeholder=" " required></textarea>
            <label class="labelFieldTextarea" for="message">Nội dung (<span
                style="color: red;">*</span>)</label>
          </div>
          <div class="formBtnCmt">
            <button type="button" id="postcmt" class="formBtn-Cmt">Bình Luận</button>
          </div>
        </div>
      </form>
    </div>
  </div>


  `
  cmtEl.insertAdjacentElement('beforeend', ulEl);
}
// end function comment
$('input[type=number]').on('mousewheel', function (e) {
  $(e.target).blur();
});