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
    divItem.classList = "cmtUlNew"
    divItem.innerHTML =
      `<div class='par'>
      <div class='comment_infoNew headCmtFormNew'> ${conver.comment_parent[0].name_comment}</div>
      <div class='comment_parent'>
        <div class='contentNew'>${conver.comment_parent[0].comment}</div>
        <input type='hidden' id='name_comment${conver.comment_parent[0].id}' value='${conver.comment_parent[0].name_comment}' />
        <input type="hidden" id="text123" value="${conver.comment_parent[0].id}" />`;
        if (conver.comment_parent[0].img_comment_path) {
          divItem.innerHTML +=`  <a class="button" href="#popup${conver.comment_parent[0].id}">
          <image src ='https://data.thoviet.com/${conver.comment_parent[0].img_comment_path}' width='100px'/>
          </a>
        <div id="popup${conver.comment_parent[0].id}" class="overlayNew">
          <div class="popupNew">
            <a class="closeNew" href="#">&times;</a>
            <image src ='https://data.thoviet.com/${conver.comment_parent[0].img_comment_path}' width='300px'/>
          </div>
        </div>`;}
        
        divItem.innerHTML += ` 
        <div class='button-rep d-flex justify-content-end'>
        <button class='btn-replayNew btn btn-sm btn-outline-primary'
          onclick='showReplay(${conver.comment_parent[0].id})'>Phản Hồi</button>
      </div>
      </div>
      <div class='replay${conver.comment_parent[0].id}' style='display:none; margin-top :5px;'>
        <form id="formCmtTVReply" onsubmit="return handleReply(event, ${conver.comment_parent[0].id} )" enctype="multipart/form-data">
          <div id="infoCmt">
            <div class="gridCmtNew">
              <div class="grid-item-cmtNew">
                <input type="text" name="name" id="fullNameReply${conver.comment_parent[0].id}" class="form-controlFixNew" placeholder=" "
                  style="background-color: white;" required>
                <label class="labelFieldNew" for="name">Tên (<span style="color: red;">*</span>)</label>
              </div>
              <div class="grid-item-cmtNew">
                <input type="number" name="sdt" id="sdtReply${conver.comment_parent[0].id}" class="form-controlFixNew" placeholder=" "
                  style="background-color: white;" required>
                <label class="labelFieldNew" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>
              </div>
            </div>
            <div class="textarea-cmtNew">
              <textarea name="msg" id="textAreaCmtReply${conver.comment_parent[0].id}" msg cols="30" rows="1" class="form-controlFixTextareaNew resize-ta"
                style="background-color: white; padding-top:5px; overflow: hidden;" placeholder=" " required></textarea>
              <label class="labelFieldTextareaNew" for="message">Nội dung (<span style="color: red;">*</span>)</label>
            </div>
            <div class="formBtnCmtNew">
              <button type="submit" id="postcmt" class="formBtn-CmtNew">Bình Luận</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    `;
    for (const [key, value] of Object.entries(conver.answer)) {
      if (typeof conver.answer[0] !== 'undefined') {
        divItem.innerHTML +=
          `<div class='answerNew'>
          <div class='comment_infoNew'><em> ${conver.answer[key].name_comment}</em></div>
          <input type='hidden' id='name_comment${conver.answer[key].id}' value='${conver.answer[key].name_comment}' />
          <input type='hidden' id='name_answer' value='${conver.answer[key].id}' />
          <div class='awnser_commentNew'>
            <div class='contentNew'>${conver.answer[key].comment}</div>
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
const btnSubmitCmt = document.querySelector('.formBtn-CmtNew');
const cmtEl = document.querySelector('.containerCmtNew');
const fullNameCmt = document.querySelector('#fullName');
const numberPhone = document.querySelector('#sdt');
const textareaCmtEl = document.querySelector('#textAreaCmt');
const image_uploadsCmt = document.querySelector('#image_uploads');


const formCmt = document.getElementById('formCmtTV');
formCmt.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formDataCmt = new FormData();
  formDataCmt.append('name_comment', document.getElementById('fullName').value);
  formDataCmt.append('phone_comment', document.getElementById('sdt').value);
  formDataCmt.append('comment', document.getElementById('textAreaCmt').value);
  formDataCmt.append('img_comment', document.getElementById('image_uploads').files[0]);
  formDataCmt.append('new_convertition', 1);

  try {
    const res = await fetch('https://data.thoviet.com/api/newConver', {
      method: 'POST',
      body: formDataCmt,
    })

    if (res.status !== 200) {
      const err = new Error("Error")
      throw err;
    }
    const data = await res.json()
    console.log('data', data);
    window.location.reload();

  } catch (error) {
    console.log(error);
  }
});
// const d = document.getElementById('text123').value
async function handleReply(e, id) {
  e.preventDefault();
  console.log("kiem tra", id);
  const formDataReply = new FormData();
  formDataReply.append('name_comment', document.getElementById(`fullNameReply${id}`).value);
  formDataReply.append('phone_comment', document.getElementById(`sdtReply${id}`).value);
  formDataReply.append('answer', document.getElementById(`textAreaCmtReply${id}`).value);
  // formDataReply.append('img_comment', document.getElementById(`image_uploadsReply${id}`).files[0]);
  formDataReply.append('id_comment', id);
  formDataReply.append('new_answer', 1);
  try {
    const res = await fetch('https://data.thoviet.com/api/newAnswer', {
      method: 'POST',
      body: formDataReply,
    })
    if (res.status !== 200) {
      const err = new Error("Error")
      throw err;
    }
    const dataReply = await res.json()
    window.location.reload();
    console.log(dataReply);
  } catch (error) {
    console.log(error);
  }
}

function showReplay(id) {
  console.log("show id", id);
  if ($('.replay' + id).css('display') === 'none') {
    $('.replay' + id).css('display', 'block');
  } else {
    $('.replay' + id).css('display', 'none');
  }
}
// $('input[type=number]').on('mousewheel', function (e) {
//   $(e.target).blur();
// });
// image Input upload 
const input = document.getElementById('image_uploads');
const preview_img_coment = document.querySelector('.previewNew');
// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/jpeg",
  "image/png"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}
function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
  while (preview_img_coment.firstChild) {
    preview_img_coment.removeChild(preview_img_coment.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'Không chọn được hình ảnh';
    preview_img_coment.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview_img_coment.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if (validFileType(file)) {
        para.textContent = `Hình ảnh: ${file.name}, kích thước ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `Hình ${file.name}: Không đúng định dạng`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}
// Reply Image 
// input.style.opacity = 0;
// input.addEventListener('change', updateImageDisplay);
// function updateImageDisplay() {
//   while (preview.firstChild) {
//     preview.removeChild(preview.firstChild);
//   }

//   const curFiles = input.files;
//   if (curFiles.length === 0) {
//     const para = document.createElement('p');
//     para.textContent = 'No files currently selected for upload';
//     preview.appendChild(para);
//   } else {
//     const list = document.createElement('ol');
//     preview.appendChild(list);

//     for (const file of curFiles) {
//       const listItem = document.createElement('li');
//       const para = document.createElement('p');
//       if (validFileType(file)) {
//         para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
//         const image = document.createElement('img');
//         image.src = URL.createObjectURL(file);

//         listItem.appendChild(image);
//         listItem.appendChild(para);
//       } else {
//         para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
//         listItem.appendChild(para);
//       }

//       list.appendChild(listItem);
//     }
//   }
// }
