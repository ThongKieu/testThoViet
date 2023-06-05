
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

btnSubmitCmt.addEventListener('click', handleSubmitCmt);
cmtArr = [];
let positionCmt = false;
let cmtCount = 0;
// function button comment 
function handleSubmitCmt(e) {
  const name = fullNameCmt.value;
  const phone = numberPhone.value;
  const textarea = textareaCmtEl.value;
  if (name && phone && textarea !== "") {
    // create comment 
    newComment = {
      "id": Math.floor((Math.random() * 1000) + 1),
      "name":name,
      "textarea": textarea,
      "typeOfComment": positionCmt
    }
    cmtArr.push(newComment)
    console.log(newComment);
  }
  console.log(name);
  console.log(phone);
  console.log(textarea);

  e.preventDefault();
}



// end function comment
$('input[type=number]').on('mousewheel', function (e) {
  $(e.target).blur();
});