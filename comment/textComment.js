function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
}
let textarea = document.querySelector(".resize-ta");
textarea.addEventListener("keyup", () => {
  textarea.style.height = calcHeight(textarea.value) + "px";
});
// --function comment

// var output1 = document.getElementById('convertition');
var url_con = 'https://data.thoviet.com/api/comment';
console.log(url_con);
fetch(url_con, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}).then((response) => {
  return response.json();
}).then((data) => {
  data.map(function (conver) {
    const divItem = document.createElement('ul');
    // if (typeof conver.answer[0] !== 'undefined' ) {
    console.log(conver.answer);
    divItem.innerHTML = `
                        <div class='par'>
                          <div class='comment_info headCmtForm'> ${conver.comment_parent[0].name_comment}</div>
                          <div class='comment_parent'>
                            <div class='content'>${conver.comment_parent[0].comment}</div>
                            <input type='hidden' id='name_comment${conver.comment_parent[0].id}' value ='${conver.comment_parent[0].name_comment}'/>
                            <div class ='button-rep d-flex justify-content-end'>
                              <button class= 'btn-replay btn btn-sm btn-outline-primary' onclick='showReplay(${conver.comment_parent[0].id})'>Phản Hồi - ${conver.comment_parent[0].id}</button>
                            </div>
                          </div>
                          <div class='replay${conver.comment_parent[0].id}'  style='display:none; margin-top :5px;'> 
                            <form action="" method ="post">
                            <div class='row'>
                              <input type="hidden" name="new_answer" value="1">
                              <input type="hidden" name="name_comment" value="{{ auth()->user()->name }}">
                              <input type="hidden" name="phone_comment" value="1">
                              <input type="hidden" name="comment_parent" value="${conver.comment_parent[0].id}">
                              <div class='col-2'> 
                                <p id ='setText_${conver.comment_parent[0].id}' ></p>
                              </div>
                              <div class="col-9" style="margin: auto">
                                <input name="awnser" id="textAreaCmt setText2_${conver.comment_parent[0].id}"  class="form-controlFixTextarea resize-ta" />
                              </div>
                              <div class="col-1 ">
                                <button type="submit" class="btn btn-sm btn-success"> <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                              </div>
                            </div>
                            </form>
                          </div>
                        </div>`;
    for (const [key, value] of Object.entries(conver.answer)) {
      if (typeof conver.answer[0] !== 'undefined') {
        divItem.innerHTML += `
                                <div class='answer'>
                                  <div class='comment_info'> ${conver.answer[key].name_comment}</div>
                                  <input type='hidden' id='name_comment${conver.answer[key].id}' value ='${conver.answer[key].name_comment}'/>
                                  <div class= 'awnser_comment'>
                                    <div class='content'>${conver.answer[key].comment}</div>
                                    <div class ='button-rep d-flex justify-content-end'>
                                      <button class= 'btn-replay btn btn-sm btn-outline-primary' onclick='showReplay(${conver.answer[key].id})'>Phản Hồi</button>
                                    </div>
                                  </div>
                                  <div class='replay${conver.answer[key].id}'  style='display:none; margin-top :5px;'> 
                                    <form action="" id="formCmtTV" method ="post">
                                      <div class='row'>
                                        <input type="hidden" name="new_answer" value="1">
                                        <input type="hidden" name="name_comment" value="{{ auth()->user()->name }}">
                                        <input type="hidden" name="phone_comment" value="1">
                                        <input type="hidden" name="comment_parent" value="${conver.comment_parent[0].id}">
                                        <div class='col-2'>
                                          <p id ='setText_${conver.answer[key].id}' ></p>
                                        </div>
                                        <div class="col-9" style="margin: auto">
                                          <input name="awnser" id="textAreaCmt setText2_${conver.answer[key].id}"  class="form-controlFixTextarea resize-ta" />
                                        </div>
                                        <div class="col-1 ">
                                          <button type="submit" class="btn btn-sm btn-success"> <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>`;
      }
    }

    cmtEl.appendChild(divItem);
  });

}).catch(function (error) {
  console.log(error);
});

const btnSubmitCmt = document.querySelector('.formBtn-Cmt');
const cmtEl = document.querySelector('.containerCmt');
const fullNameCmt = document.querySelector('#fullName');
const numberPhone = document.querySelector('#sdt');
const textareaCmtEl = document.querySelector('#textAreaCmt');
// const countCmt = document.querySelector(".countClass");

const form = document.getElementById('formCmtTV');
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data1 = {
    // id: Math.floor((Math.random() * 1000) + 1),
    name_comment: document.getElementById('fullName').value,
    phone_comment: document.getElementById('sdt').value,
    comment: document.getElementById('textAreaCmt').value,
    new_convertition: 1
  }
  console.log(data1);
  try {
    const res = await fetch('https://data.thoviet.com/api/newConver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data1),
    })
    console.log(res);
    if (res.status !== 200) {
      const err = new Error("Error")
      throw err;
    }
    if (confirm('Vui lòng xác nhận gửi!')) {
      window.location.reload();
    }
    console.log('data', data);
  } catch (error) {
    console.log(error);
  }
});


// function button comment 

// btnSubmitCmt.addEventListener('click', handleSubmitCmt);
// cmtArr = [];
// let positionCmt = false;
// let cmtCount = 0;
// function handleSubmitCmt(e) {
//   e.preventDefault();
//   const fullNameEl = fullNameCmt.value;
//   const phoneEl = numberPhone.value;
//   const textareaEl = textareaCmtEl.value;
//   newComment = {
//     "id_comment": Math.floor((Math.random() * 1000) + 1),
//     "name_comment": fullNameEl,
//     "phone_comment": phoneEl,
//     "comment": textareaEl,
//     "typeOfComment": positionCmt
//   }
//   const urlApi = "https://data.thoviet.com/api/newConver";
//   if (fullNameEl && phoneEl && textareaEl !== "") {
//     // create comment 
//     // thay the bang fetch api
//     console.log(url_con);
//     fetch(url_con, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     }).then((response) => {
//       return response.json();
//     }).then((data) => {
//       data.map(
//         )
//       if (positionCmt === false) {
//         countCmtEl()
//       }
//       resetFormValue();
//       addCmt(newComment);
//     }


// }

//   function resetFormValue() {
//     fullNameCmt.value = '';
//     numberPhone.value = '';
//     textareaCmtEl.value = '';
//     positionCmt = false;
//   }
//   function countCmtEl() {
//     cmtCount++;
//     countCmt.innerHTML = cmtCount;

//   }

//   function addCmt(item) {
//     // const letter = (item.fullNameCmt).charAt(0);
//     // add element 
//     const ulEl = document.createElement('div');
//     // add id 
//     ulEl.id = item.id;
//     // add class 
//     ulEl.classList = "commentsCmt";
//     // add html 
//     ulEl.innerHTML = `
//   <div class="commentCard ">
//     <h4 class="nameTitle"><em>${item.name}</em></h4>
//     <p class="pContentCmt">
//       ${item.textarea} 
//     </p>
//     <div class="footerContentCmt">
//       <a href="#showCmtTV" id="showCmtTV" class="showComment" style="margin-right: 10px;"><small>Xem bình luận</small></a>
//       <a href="#replyCmtTV" id="replyCmtTV" class="showReply" onClick="showReplyForm(${item.id})"><small>Phản hồi</small></a>
//     </div>
//     <div class="replyCmtContainer"></div>
//     <div class="commentCard${item.id}" style="display: none;">
//     <form action="">
//       <div id="infoCmt">
//         <div class="gridCmt">
//           <div class="grid-item-cmt">
//             <input type="text" name="name" id="fullname" class="form-controlFix" placeholder=" "
//               style="background-color: white;" required>
//             <label class="labelField" for="name">Tên (<span style="color: red;">*</span>)</label>
//           </div>
//           <div class="grid-item-cmt">
//             <input type="number" name="sdt" id="sdt" min="10" max="11" class="form-controlFix" placeholder=" "
//               style="background-color: white;" required>
//             <label class="labelField" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>
//           </div>
//         </div>
//         <div class="textarea-cmt">
//           <textarea name="msg" id="textAreaCmt" msg cols="30" rows="1"
//             class="form-controlFixTextarea resize-ta" style="background-color: white; padding-top:5px; overflow: hidden;"
//             placeholder=" " required> Chào: ${item.name}</textarea>
//           <label class="labelFieldTextarea" for="message">Nội dung (<span
//               style="color: red;">*</span>)</label>
//         </div>
//         <div class="formBtnCmt">
//           <button type="button" id="postcmt" class="formBtn-Cmt">Bình Luận</button>
//         </div>
//       </div>
//     </form>
//   </div>
//   </div>
//   <div class="replyCmtContainer"></div>
//   `
//     cmtEl.insertAdjacentElement('beforeend', ulEl);
//   }

//   const btnSubmitCmtReply = document.querySelector(".containerCmt");
//   const replyCmt = document.querySelector(".replyCmtContainer");
//   const fullNameCmtReply = document.querySelector('#fullNameReply');
//   const numberPhoneReply = document.querySelector('#sdtReply');
//   const textareaCmtElReply = document.querySelector('#textAreaCmtReply');

//   // for (const btnSubmitReply of btnSubmitCmtReply ){
//   // btnSubmitCmtReply.addEventListener('click', handleSubmitCmtReply)
//   replyArr = [];
//   let positionCmtReply = false;

//   // function button comment  reply 
//   function handleSubmitCmtReply(e) {
//     e.preventDefault();
//     const fullNameElReply = fullNameCmtReply.value;
//     const phoneElReply = numberPhoneReply.value;
//     const textareaElReply = textareaCmtElReply.value;
//     if (fullNameElReply && phoneElReply && textareaElReply !== "") {
//       // create comment 
//       // thay the bang fetch api
//       newCommentReply = {
//         "idReply": Math.floor((Math.random() * 1000) + 1),
//         "nameReply": fullNameElReply,
//         "phoneReply": phoneElReply,
//         "textareaReply": textareaElReply,
//         "typeOfCommentReply": positionCmtReply
//       }
//       // if (positionCmtReply === false) {
//       //   countCmtEl()
//       // }
//       resetFormValueReply();
//       addCmtReply(newCommentReply);
//     }


//   }

//   function resetFormValueReply() {
//     fullNameCmtReply.value = '';
//     numberPhoneReply.value = '';
//     textareaCmtElReply.value = '';
//     positionCmtReply = false;
//   }
//   // function countCmtElReply() {
//   //   cmtCountReply++;
//   //   countCmtReply.innerHTML = cmtCountReply;

//   // }

//   btnSubmitCmtReply.addEventListener('click', function addCmtReply(item) {
//     // const letter = (item.fullNameCmt).charAt(0);
//     // add element 
//     const ulElReply = document.createElement('div');
//     // add id 
//     ulElReply.id = item.id;
//     // add class 
//     ulElReply.classList = "commentsCmt";
//     // add html 
//     ulElReply.innerHTML = `
//   <div class="commentCard ">
//     <h4 class="nameTitle"><em>${item.nameReply}</em></h4>
//     <p class="pContentCmt">
//       ${item.textareaReply} 
//     </p>
//     <div class="footerContentCmt">
//       <a href="#showCmtTV" id="showCmtTV" class="showComment" style="margin-right: 10px;"><small>Xem <span class="count"></span> bình luận hơn</small></a>
//       <a href="#replyCmtTV" id="replyCmtTV" class="showReply" onClick="showReplyForm(${item.id})"><small>Phản hồi</small></a>
//     </div>

//     <div class="commentCard${item.id}" style="display: none;">
//     <form action="">
//       <div id="infoCmt">
//         <div class="gridCmt">
//           <div class="grid-item-cmt">
//             <input type="text" name="name" id="fullNameReply" class="form-controlFix" placeholder=" "
//               style="background-color: white;" required>
//             <label class="labelField" for="name">Tên (<span style="color: red;">*</span>)</label>
//           </div>
//           <div class="grid-item-cmt">
//             <input type="number" name="sdt" id="sdtReply" min="10" max="11" class="form-controlFix" placeholder=" "
//               style="background-color: white;" required>
//             <label class="labelField" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>
//           </div>
//         </div>
//         <div class="textarea-cmt">
//           <textarea name="msg" id="textAreaCmtReply" msg cols="30" rows="1"
//             class="form-controlFixTextarea resize-ta" style="background-color: white; padding-top:5px; overflow: hidden;"
//             placeholder=" " required></textarea>
//           <label class="labelFieldTextarea" for="message">Nội dung (<span
//               style="color: red;">*</span>)</label>
//         </div>
//         <div class="formBtnCmt">
//           <button type="button" id="postcmt" class="formBtn_Reply">Bình Luận</button>
//         </div>
//       </div>
//     </form>
//   </div>
//   </div>
//   `
//     replyCmt[0].appendChild(ulElReply);
//   })
function showReplay(id) {

  if ($('.replay' + id).css('display') === 'none') {
    $('.replay' + id).css('display', 'block');
    var name = document.getElementById('name_comment' + id).value;
    var i_na = document.getElementById('setText_' + id);
    i_na.innerHTML = 'Trả lời : ' + name;
    console.log(name);
  } else {
    $('.replay' + id).css('display', 'none');
  }
}
// function showReplyForm(id) {
//   if ($('.commentCard' + id).css('display') === 'none') {
//     $('.commentCard' + id).css('display', 'block');
//     console.log();
//   } else {
//     $('.commentCard' + id).css('display', 'none');
//   }
// }
// end function comment
$('input[type=number]').on('mousewheel', function (e) {
  $(e.target).blur();
});