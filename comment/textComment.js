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
    divItem.classList = "cmtUl"
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
        <form id="formCmtTVReply" onsubmit="return handleReply(event, ${conver.comment_parent[0].id} )">
          <div id="infoCmt">
            <div class="gridCmt">
              <div class="grid-item-cmt">
                <input type="text" name="name" id="fullNameReply${conver.comment_parent[0].id}" class="form-controlFix" placeholder=" "
                  style="background-color: white;" required>
                <label class="labelField" for="name">Tên (<span style="color: red;">*</span>)</label>
              </div>
              <div class="grid-item-cmt">
                <input type="number" name="sdt" id="sdtReply${conver.comment_parent[0].id}" class="form-controlFix" placeholder=" "
                  style="background-color: white;" required>
                <label class="labelField" for="name">Số điện thoại (<span style="color: red;">*</span>)</label>
              </div>
            </div>
            <div class="textarea-cmt">
              <textarea name="msg" id="textAreaCmtReply${conver.comment_parent[0].id}" msg cols="30" rows="1" class="form-controlFixTextarea resize-ta"
                style="background-color: white; padding-top:5px; overflow: hidden;" placeholder=" " required></textarea>
              <label class="labelFieldTextarea" for="message">Nội dung (<span style="color: red;">*</span>)</label>
            </div>
            <div class="imgUpload">
          <img class="image${conver.comment_parent[0].id}" src="">
          <button class="file-upload"><input type="file" class="file-input" accept="image/*">Chọn hình</button>
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
const image_uploadsCmt  = document.querySelector('#image_uploads');


const form = document.getElementById('formCmtTV');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const nameCmt =  document.getElementById('fullName').value;
  const phoneCmt =  document.getElementById('sdt').value;
  const cmt =  document.getElementById('textAreaCmt').value;
  const imgCmtPath =  document.getElementById('image_uploads').files[0];
  const newConverCmt = 1;
  // const data1 ={
  //   name_comment:document.getElementById('fullName').value,
  //   phone_comment: document.getElementById('sdt').value,
  //   comment: document.getElementById('textAreaCmt').value,
  //   img_comment_path: document.getElementById('image_uploads').files[0],
  //   new_convertition: 1
  // }
  // console.log(data1);
  // console.log(e);
  const formDataCmt = new FormData();
  formDataCmt.append('name_comment',nameCmt);
  formDataCmt.append('phone_comment',phoneCmt);
  formDataCmt.append('comment',cmt);
  formDataCmt.append('img_comment_path',imgCmtPath,'img_comment_path.jpg');
  formDataCmt.append('new_convertition',newConverCmt);
  console.log("Form data",formDataCmt);
  fetch('https://data.thoviet.com/api/newConver', {
    method:"post",
    body:formDataCmt,
  }).then(res=>res.json())
  .then(data=>console.log(data))
  .catch(err=>console.log(err))
  // try {
  //   const res = await fetch('https://data.thoviet.com/api/newConver', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Access-Control-Allow-Origin': '*',
  //     },
  //     body: JSON.stringify(data1),
  //   })
  //   console.log(res);
  //   if (res.status === 200) {
  //     // window.location.reload();

  //   } else {
  //     const err = new Error("Error")
  //     throw err;
  //   }
  //   console.log('data', data);
  // } catch (error) {
  //   console.log(error);
  // }
});
// const d = document.getElementById('text123').value
async function handleReply(e, id) {
  e.preventDefault();
  console.log("kiem tra", id);
  const data2 = {
    id_comment: id,
    name_comment: document.getElementById(`fullNameReply${id}`).value,
    phone_comment: document.getElementById(`sdtReply${id}`).value,
    answer: document.getElementById(`textAreaCmtReply${id}`).value,
    new_answer: 1,
  }

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
}

function showReplay(id) {
  console.log("show id", id);
  if ($('.replay' + id).css('display') === 'none') {
    $('.replay' + id).css('display', 'block');
  } else {
    $('.replay' + id).css('display', 'none');
  }
}
$('input[type=number]').on('mousewheel', function (e) {
  $(e.target).blur();
});

// $('.file-input').change(function(){
//   var curElement = $('.image');
//   console.log(curElement);
//   var reader = new FileReader();

//   reader.onload = function (e) {
//       // get loaded data and render thumbnail.
//       curElement.attr('src', e.target.result);
//   };
//   // read the image file as a data URL.
//   reader.readAsDataURL(this.files[0]);
// });

// image Input upload 
const input = document.getElementById('image_uploads');
const preview_im_coment = document.querySelector('.preview');
// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/jpeg",
  "image/png"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}
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
  while (preview_im_coment.firstChild) {
    preview_im_coment.removeChild(preview_im_coment.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'Không chọn được hình ảnh';
    preview_im_coment.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview_im_coment.appendChild(list);

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
