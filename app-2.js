const landing = document.getElementById('landing');
const button = document.getElementById('searchButton');
let url = `https://api.airtable.com/v0/appP3yc6hsTO1FLXd/Table%201?api_key=keyZ3s4zJ9nbnOFdZ`;

function retriveData(){
  return fetch(url)
          .then(res => res.json())
}

retriveData()
.then((data) => {
  var html = '<select class="custom-select" id="inputGroup" aria-label="search for books in database"><option>Select Book</option>';
  for(let i  = 0; i < data.records.length ; i +=1){
   html += '<option>' + data.records[i].fields.BookTitle + '</option>';
 }
   html += '</select>';
$('#search').prepend(html);
});

button.addEventListener('click',() => {
  retriveData()
  .then((data) => {
    for(let i  = 0; i < data.records.length ; i +=1){
      if(data.records[i].fields.BookTitle === $('#inputGroup').val()){
        var html = data.records[i].fields.PageContent;
      }
   }
  $('#landing').prepend(html);
  });
});
// retriveData()
// .then((data) => {
//   for(let i  = 0; i < data.records.length ; i +=1){
//     if(data.records[i].fields.BookTitle === $('#inputGroup').val()){
//       var html = data.records[i].fields.PageContent;
//     }
//  }
// $('#landing').prepend(html);
// });
