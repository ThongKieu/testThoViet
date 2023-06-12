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
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
}).then((response) => {
  return response.json();
}).then((data) => {
  data.map(function (conver) {
    const divItem = document.createElement('ul');
    divItem.classList="cmtUl"
    // if (typeof conver.answer[0] !== 'undefined' ) {
    console.log(conver.answer);
    divItem.innerHTML =
    `
    <div class='par'>
      <div class='comment_info headCmtForm'> ${conver.comment_parent[0].name_comment}</div>
      <div class='comment_parent'>
        <div class='content'>${conver.comment_parent[0].comment}</div>
        <input type='hidden' id='name_comment${conver.comment_parent[0].id}' value='${conver.comment_parent[0].name_comment}' />
        <input type="hidden" id="text123" value="${conver.comment_parent[0].id}" />
        <div class='button-rep d-flex justify-content-end'>
          <button class='btn-replay btn btn-sm btn-outline-primary'
            onclick='showReplay(${conver.comment_parent[0].id})'>Phản Hồi - ${conver.comment_parent[0].id}</button>
        </div>
      </div>
      <div class='replay${conver.comment_parent[0].id}' style='display:none; margin-top :5px;'>
        <form action="" id="formCmtTVReply" method="get">
          <div id="infoCmt">
            <div class="gridCmt">
              <div class="grid-item-cmt">
                <input type="text" name="name" id="fullNameReply" class="form-controlFix" placeholder=" "
                  style="background-color: white;" required>
                <label class="labelField" for="name">Tên (<span style="color: red;">*</span>)</label>
              </div>
              <div class="grid-item-cmt">
                <input type="number" name="sdt" id="sdtReply" class="form-controlFix" placeholder=" "
                  style="background-color: white;" required>
                <label class="labelField" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>
              </div>
            </div>
            <div class="textarea-cmt">
              <textarea name="msg" id="textAreaCmtReply" msg cols="30" rows="1" class="form-controlFixTextarea resize-ta"
                style="background-color: white; padding-top:5px; overflow: hidden;" placeholder=" " required></textarea>
              <label class="labelFieldTextarea" for="message">Nội dung (<span style="color: red;">*</span>)</label>
            </div>
            <div class="formBtnCmt">
              <button type="submit" id="postcmt" class="formBtn_Reply">Bình Luận</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    `;
    for (const [key, value] of Object.entries(conver.answer)) {
      if (typeof conver.answer[0] !== 'undefined') {
        divItem.innerHTML +=
        `<div class='answer'>
          <div class='comment_info'> ${conver.answer[key].name_comment}</div>
          <input type='hidden' id='name_comment${conver.answer[key].id}' value='${conver.answer[key].name_comment}' />
          <input type='hidden' id='name_answer' value='${conver.answer[key].id}' />
          <div class='awnser_comment'>
            <div class='content'>${conver.answer[key].comment}</div>
            <div class='button-rep d-flex justify-content-end'>
              <button class='btn-replay btn btn-sm btn-outline-primary' onclick='showReplay(${conver.answer[key].id})'>Phản Hồi</button>
            </div>
          </div>
          <div class='replay${conver.answer[key].id}' style='display:none; margin-top :5px;'>
            <form action="" id="formCmtTVReply${conver.answer[key].id}" method="post">
              <div id="infoCmt">
                <div class="gridCmt">
                  <div class="grid-item-cmt">
                    <input type="text" name="name" id="fullNameReply" class="form-controlFix" placeholder=" "
                      style="background-color: white;" required>
                    <label class="labelField" for="name">Tên (<span style="color: red;">*</span>)</label>
                  </div>
                  <div class="grid-item-cmt">
                    <input type="number" name="sdt" id="sdtReply" min="10" max="11" class="form-controlFix" placeholder=" "
                      style="background-color: white;" required>
                    <label class="labelField" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>
                  </div>
                </div>
                <div class="textarea-cmt">
                  <textarea name="msg" id="textAreaCmtReply" msg cols="30" rows="1" class="form-controlFixTextarea resize-ta"
                    style="background-color: white; padding-top:5px; overflow: hidden;" placeholder=" " required></textarea>
                  <label class="labelFieldTextarea" for="message">Nội dung (<span style="color: red;">*</span>)</label>
                </div>
                <div class="formBtnCmt">
                  <button type="button" id="postcmt" class="formBtn_Reply">Bình Luận</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        `;
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
    name_comment: document.getElementById('fullName').value,
    phone_comment: document.getElementById('sdt').value,
    comment: document.getElementById('textAreaCmt').value,
    new_convertition: 1
  }
  console.log(data1);
  console.log(e);
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
    if (res.status === 200) {
      window.location.reload();

    } else {
      const err = new Error("Error")
      throw err;
    }
    console.log('data', data);
  } catch (error) {
    console.log(error);
  }
});
function showReplay(id) {
  console.log("show id",id);
  if ($('.replay' + id).css('display') === 'none') {
    $('.replay' + id).css('display', 'block');
    // var name = document.getElementById('fullNameReply' + id).value;
    // var i_na = document.getElementById('name_comment' + id);
    // i_na.innerHTML = 'Trả lời : ' + name;
    // console.log(name);
    const d = document.getElementById('text123').value
    const btnReply = document.getElementById('formCmtTVReply')
    if(btnReply){
    btnReply.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data2 = {
        // id: Math.floor((Math.random() * 1000) + 1),
        
        id_comment: id,
        name_comment: document.getElementById('fullNameReply').value,
        phone_comment: document.getElementById('sdtReply').value,
        answer: document.getElementById('textAreaCmtReply').value,
        new_answer: 1,
      }
      const formData = new FormData()
      Object.keys(data2).map((key) => {

        console.log(data2[key]);
        formData.append(key, data2[key])
      })
      console.log(data2);
      try {
        const res = await fetch('https://data.thoviet.com/api/newAnswer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data2),
        })
        console.log(res);
        console.log(data2);
        if (res.status === 200) {
          window.location.reload();
          console.log(res);
        } else {
          const err = new Error("Error")
          throw err;
        }
        console.log('data', data2);
      } catch (error) {
        console.log(error);
      }
    });
  }
    // console.log(btnReply);

  } else {
    $('.replay' + id).css('display', 'none');
  }
}
$('input[type=number]').on('mousewheel', function (e) {
  $(e.target).blur();
});