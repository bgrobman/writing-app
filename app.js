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

let pageContent = document.getElementById('p-c');
let valid = false;
let prevHtml;
// function testEmpty(target){
//   if(target.value === ''){
//    valid = false;
//    var p = makeElement('p','the element is empty!',target);
//    target.prepend(p);
//   }
// }

function makeElement(e,content,parent){
   var element = document.createElement(e);
   element.textContent = content;
   return element
   //parent.prepend(element);
}

paragraphButton.addEventListener('click', function(){
  previewParagraph.textContent = '';
  var p = makeElement('p',paragraph.value);
  previewParagraph.prepend(p);
  pageContent.prepend(p);
  pageContent.style.display = 'none';
  previewParagraph.style.border = '2px solid red';


  paragraph.value = '';
});


 pageButton.addEventListener('click',function(){
   var m = makeElement('h1',bookTitle.value);
   prevBookTitle.prepend(m);
    var pt =  makeElement('h3',pageTitle.value);
    var pn = makeElement('span','Chapter:' + pageNumber.value);
    prevPageTitle.prepend(pt,pn);
//    prevContent.prepend(pageContent);
alert('hello');
 });


//mm
