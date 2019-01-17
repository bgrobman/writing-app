const bookTitle = document.getElementById('input-title');
const pageTitle = document.getElementById('input-page-title');
const pageNumber = document.getElementById('input-page-number');
const paragraph = document.getElementById('input-page-content');
const auther = document.getElementById('writers-name');
const comment = document.getElementById('comment');
const paragraphButton = document.getElementById('submit-paragraph');
const pageButton = document.getElementById('submit-page');
const previewParagraph = document.getElementById('prev');
const previewPage = document.getElementById('preview');
const allInputs = [bookTitle,pageTitle,pageNumber,paragraph,auther,comment];
const prevBookTitle = document.getElementById('prev-book-title');
const prevPageTitle = document.getElementById('prev-page-title');
const prevContent = document.getElementById('prev-content');

 const pageContent = document.getElementById('preview-content');
//let pageContent = [];
let valid = false;
let prevHtml;
// function testEmpty(target){
//   if(target.value === ''){
//    valid = false;
//    var p = makeElement('p','the element is empty!',target);
//    target.prepend(p);
//   }
// }

function makeElement(e,content,addAtt,attName){
   var element = document.createElement(e);
   element.textContent = content;
   return element
   //parent.prepend(element);
}

paragraphButton.addEventListener('click', function(){
  previewParagraph.textContent = '';
  var p = makeElement('p',paragraph.value,'overflow','auto');
  previewParagraph.prepend(p);
  previewParagraph.style.border = '2px solid red';
    var c = makeElement('p',paragraph.value);
    //pageContent.prepend(c);
   paragraph.value = '';
   $('#preview-content').append(c);
   $('#preview-content').hide();
});


 pageButton.addEventListener('click',function(){
   $('#preview div h2, #preview div h1, #preview div h5,#preview div h6,#preview div p').remove();
    var m = makeElement('h1', ' Book Title: ' +  bookTitle.value);
    prevBookTitle.prepend(m);
    var pt =  makeElement('h2','Page Title:' +pageTitle.value);
    var pn = makeElement('h5','Chapter:' + pageNumber.value);
    prevPageTitle.prepend(pt,pn);
    var auther = makeElement('h6','Auther:' + $('#writers-name').val());
    $('#auther').prepend(auther);
    var com = makeElement('p','Comment:' + $('#comment').val());
    $('#com').prepend(com);
    $('#com').css('border','solid blue 1px');
    var html =   $('#preview-content').html();
    $('#preview-content-print').html(html);
    $('#preview-content p').remove();
 });


//mm
