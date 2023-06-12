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
fetch(url_con, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then((response) => {
    return response.json();
}).then((data) => {
    console.log('data comment', data)
    const divItem = document.createElement('ul');

    data.map((item) => {
        item?.comment_parent?.length ? cmtEl.innerHTML += `
        <div class='par'>
          <div class='comment_info headCmtForm'> ${item.comment_parent[0].name_comment}</div>
          <div class='comment_parent'>
            <div class='content'>${item.comment_parent[0].comment}</div>
            <input type='hidden' id='name_comment${item.comment_parent[0].id}' value='${item.comment_parent[0].name_comment}' />
            <div class='button-rep d-flex justify-content-end'>
              <button class='btn-replay btn btn-sm btn-outline-primary' type="button" onclick='showReplay(${item.comment_parent[0].id})'>Phản Hồi - ${item.comment_parent[0].id}</button>
            </div>
          </div>
          <div class='replay${item.comment_parent[0].id}' style='display:none; margin-top :5px;'>
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
        </div>` : null;
    });
}).catch(function (error) {
    console.log('comment', error);
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
        if (res.status === 200) {
            window.location.reload();
        }
        else {
            const err = new Error("Error")
            throw err;
        }
        console.log('data', data);
    } catch (error) {
        console.log(error);
    }
});

async function showReplay(id) {

    if ($('.replay' + id).css('display') === 'none') {
        $('.replay' + id).css('display', 'block');
        // var name = document.getElementById('name_comment' + id).value;// var i_na = document.getElementById('setText_' + id);
        // i_na.innerHTML = 'Trả lời : ' + name;
        // console.log(name);
    } else {
        $('.replay' + id).css('display', 'none');
    }

    const body = {
        id_comment: id,
        name_comment: document.getElementById('fullNameReply').value,
        phone_comment: document.getElementById('sdtReply').value,
        answer: document.getElementById('textAreaCmtReply').value,
        new_answer: 1,
    }

    const formData = new FormData();

    Object.keys(body).map((key) => {

        console.log(body[key]);
        formData.append(key, body[key])
    })
    try {
        const res = await fetch('https://data.thoviet.com/api/newAnswer', {
            method: 'POST',
            body: JSON.stringify(body)
        })
        // const data = await res.json()
        // console.log(data);
        // console.log(data);
        if (res.status === 200) {
          console.log(res);
          window.location.reload();
          
    
        } else {
          const err = new Error("Error")
          throw err;
        }
        console.log('data', data);
    } catch (error) {
        console.log(error);
    }
}

// end function comment
$('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
});