const landing = document.getElementById('landing');
const button = document.getElementById('searchButton');
const buttonSearch = document.getElementById('searchButton-2');
let url = `https://api.airtable.com/v0/appP3yc6hsTO1FLXd/Table%201?api_key=keyZ3s4zJ9nbnOFdZ`;

function retriveData(){
  return fetch(url)
         .then(res => res.json())
}

retriveData()
.then((data) => {
  var html = '<select class="custom-select" id="inputGroup" aria-label="search for books in database"><option>Select Book</option>';
   data.records.map(item =>{
     //if(){
     html += '<option>' + item.fields.BookTitle + '</option>';
   //}
   });
   html += '</select>';
 $('#search').prepend(html);
});

button.addEventListener('click',() => {
  $('#search-2').html('');
  retriveData()
    .then((data) => {
     var html = '<select class="custom-select" id="inputGroup-2" aria-label="search for books in database"> <option>Select Page number</option>';
      data.records.map(item => {
        if(item.fields.BookTitle.toLowerCase() === $('#inputGroup').val().toLowerCase()){
           html += '<option>' + item.fields.PageNumber + '</option>';
          }

        });
        html += '</select>';
        $('#search-2').prepend(html);
});
});

buttonSearch.addEventListener('click',() => {
   $('#landing').html('');
  retriveData()
  .then((data) => {
    data.records.map(item => {
      if(item.fields.BookTitle.toLowerCase() === $('#inputGroup').val().toLowerCase() && item.fields.PageNumber === $('#inputGroup-2').val()){
          var html = item.fields.PageContent;
        }
    $('#landing').prepend(html);
  });
  });
});


// retriveData()
// .then((data) => {
//   var count = 0 ;
//   var more = 0;
//     data.records.map(item => {
//       if(item.fields.BookTitle === $('#inputGroup').val() && item.fields.PageTitle === $('#inputGroup').val() ){
//            count +=1;
//         }
//         if(count => 2){
//           more += 1;
//           var mul = item.fields.BookTitle
//         }
// });
//
// });
