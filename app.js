const bookTitle = document.getElementById('input-title');
const pageTitle = document.getElementById('input-page-title');
const pageNumber = document.getElementById('input-page-number');
const paragraph = document.getElementById('input-page-content');
const auther = document.getElementById('writers-name');
const comment = document.getElementById('comment');
// const paragraphButton = document.getElementById('submit-paragraph');
const pageButton = document.getElementById('submit-page');
const previewParagraph = document.getElementById('prev');
const previewPage = document.getElementById('preview');
const allInputs = [bookTitle,pageTitle,pageNumber,paragraph,auther,comment];
const prevBookTitle = document.getElementById('prev-book-title');
const prevPageTitle = document.getElementById('prev-page-title');
const prevContent = document.getElementById('prev-content');
const pageContent = document.getElementById('preview-content');
let valid = true;
let ex = true;
let prevHtml;
var url = `https://api.airtable.com/v0/appP3yc6hsTO1FLXd/Table%201?api_key=keyZ3s4zJ9nbnOFdZ`;
let inputAll = [bookTitle,pageTitle, pageNumber ,auther ];

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
  retriveData()
  .then((data) => {
    ex = true;
    data.records.map(item => {
      if(item.fields.BookTitle === bookTitle.value && item.fields.PageNumber === pageNumber.value ){
         valid = false;
         ex = false;
        }
  });
       if(ex === false){
         alert('this page already excists in the database!');
       }
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

paragraph.addEventListener("keyup", function(e){
      if(e.keyCode == 13){
        previewParagraph.textContent = '';
        var p = makeElement('p',paragraph.value,'overflow','auto');
        previewParagraph.prepend(p);
        previewParagraph.style.border = '2px solid red';
          var c = makeElement('p',paragraph.value);
         paragraph.value = '';
         $('#preview-content').append(c);
         $('#preview-content').hide();
  }
 });




 pageButton.addEventListener('click',function(){
   $('#preview div h2, #preview div h1, #preview div h5,#preview div h6,#preview div p,#preview div h4').remove();
    var m = makeElement('h1', ' Book Title: ' +  bookTitle.value);
    prevBookTitle.prepend(m);
    var pt =  makeElement('h2','Page Title:' + pageTitle.value);
    var pn = makeElement('h5','Chapter:' + pageNumber.value);
    prevPageTitle.prepend(pt,pn);
    var auther = makeElement('h4','Auther:' + $('#writers-name').val());
    $('#auther').prepend(auther);
    var com = makeElement('p','Comment:' + $('#comment').val());
    $('#com').prepend(com);
    $('#com').css('border','solid blue 1px');
    $('#com').css('padding','20px');
    var html =   $('#preview-content').html();
    $('#preview-content-print').html(html);
    testFull();
    testEmpty();
    if(valid){
    postPage(writenData());
  }
    $('#preview-content p').remove();
 });
