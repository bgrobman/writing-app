const bookTitle = document.getElementById('input-title');
const pageTitle = document.getElementById('input-page-title');
const pageNumber = document.getElementById('input-page-number');
const paragraph = document.getElementById('input-page-content');
const auther = document.getElementById('writers-name');
const comment = document.getElementById('comment');
const pageButton = document.getElementById('preview-page');
const submitButton = document.getElementById('submit-page');
const previewParagraph = document.getElementById('prev');
const previewPage = document.getElementById('preview');
const allInputs = [bookTitle,pageTitle,pageNumber,paragraph,auther,comment];
const prevBookTitle = document.getElementById('prev-book-title');
const prevPageTitle = document.getElementById('prev-page-title');
const prevContent = document.getElementById('prev-content');
const pageContent = document.getElementById('preview-content');
const modalName = document.getElementById('modal-name');
const modalPerCode = document.getElementById('modal-code');
const modalMasterCode = document.getElementById('modal-master-code');
const modalSubmitCode = document.getElementById('model-submit-code');
const modalContent = document.getElementById('modal-content');
const editPage = document.getElementById('edit-page');
let secure = false;
let valid = true;
let ex = true;
let prevHtml;
let printedPage = false;
var url = `https://api.airtable.com/v0/appP3yc6hsTO1FLXd/Table%201?api_key=keyZ3s4zJ9nbnOFdZ`;
let inputAll = [bookTitle,pageTitle, pageNumber ,auther ,  previewParagraph , comment];
var goodData ;

function retriveData(){
  return fetch(url)
         .then(res => res.json())
}

function testEmpty(){
  valid = true;
  if( bookTitle.value === ''||auther.value === ''||pageTitle.value === '' || pageNumber.value === ''||pageContent.innerText === ''){
    valid = false;
  }
  if(valid === false){
      alert('you have not filled out all the data boxes ,therfore the data will not be sent to the database!');
  }
}

function testFull(){
   return retriveData()
   .then((data) => {
     ex = true;
     data.records.map(item => {
       if(  $('#preview #prev-book-title h1').text().toLowerCase() === ' book title: '+ item.fields.BookTitle.toLowerCase()  && $('#preview #prev-page-title h5').html() === 'Chapter:'+ item.fields.PageNumber){
         valid = false;
          ex = false;
         }
   });
  });
}

function writenData(){
  return  data = {
    "fields": {
      "BookTitle": bookTitle.value,
      "PageNumber": pageNumber.value,
      "Auther": $('#writers-name').val(),
      "PageTitle" : pageTitle.value,
      "PageContent":previewPage.innerHTML
    }
  };
}


function makeElement(e,content,addAtt,attName){
   var element = document.createElement(e);
   element.textContent = content;
   return element
}

function postPage(data){
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}

previewPage.style.display = 'none';

paragraph.addEventListener("keyup", function(e){
      if(e.keyCode == 13){
        previewParagraph.textContent = '';
        var p = makeElement('p',paragraph.value,'overflow','auto');
        previewParagraph.prepend(p);
        previewParagraph.style.border = '2px solid red';
        var c = makeElement('p',paragraph.value);
         $('#preview-content').append(c);
          paragraph.value = '';
         $('#preview-content').hide();
  }
 });

 modalSubmitCode.addEventListener('click',function(){
   $('#close-modal').click();
   fetch(`https://api.airtable.com/v0/appPRJdIgsvsXiASr/Table%201?api_key=keyZ3s4zJ9nbnOFdZ`)
    .then(res => res.json())
    .then((data) => {
       data.records.map((item) => {
        if( item.fields.MasterCode === modalMasterCode.value){
          secure = true;
        }
      });
      if(secure === false){
        alert('You have not submited the correct autherazation code!');
      }else{
        console.log('good code');
        alert('You have signed in!');
        $('#sign-in').hide();
      }
    })
    .then(data => {modalMasterCode.value = '';} );
    $('#modal-name').val('');
    $('#modal-code').val('');
   });

modalContent.addEventListener("keyup", function(e){
      if(e.keyCode == 13){
        $('#model-submit-code').click();
        $('#close-modal').click();
      }
});

 pageButton.addEventListener('click',function(){
   $('#preview div h2, #preview div h1, #preview div h5,#preview div h6,#preview div p, #preview div h4').remove();
    previewPage.style.display = '';
    var m = makeElement('h1', ' Book Title: ' +  bookTitle.value);
    prevBookTitle.prepend(m)
    var pt =  makeElement('h2','Page Title: ' + pageTitle.value);
    var pn = makeElement('h5','Chapter:' + pageNumber.value);
    prevPageTitle.prepend(pt,pn);
    var auther = makeElement('h4','Auther: ' + $('#writers-name').val());
    $('#auther').prepend(auther);
    $('#preview div h1, #preview div h2, #preview div h4').css("text-transform", "capitalize");
    var com = makeElement('p','Comment:' + $('#comment').val());
    $('#com').prepend(com);
    $('#com').css('border','solid blue 1px');
    $('#com').css('padding','20px');
    var html =   $('#preview-content').html();
    $('#preview-content-print').html(html);
    goodData = writenData();
    testEmpty();
    inputAll.map((item) => {item.value = '';});
    previewParagraph.textContent = '';
    paragraph.value = '';
    if(valid){
      printedPage = true;
    }
    $('#preview-content').html('');
 });

submitButton.addEventListener('click',function(){
  testFull()
  .then((data) => {
    if(secure){
     if(ex){
       if(printedPage){
         postPage(goodData);
         alert('the data has been sent!');
         goodData = '';
      }else{
        alert(' You did not fill all the input boxes!');
      }
    }else{
      alert('This page already exsits!');
    }
   }else{
     alert('You have not signed in!');
   }
});
});

 editPage.addEventListener('click',function(){
  if(secure){
   if(printedPage){
    testFull()
    .then((data) => {
     if(ex === false){
      postPage(goodData);
     }else{
       alert('This Page does not exist in the database!');
     }
    });
  }else{
    alert(' You did not fill all the input boxes!');
  }
}else{
    alert('You have not signed in!');
  }
});
