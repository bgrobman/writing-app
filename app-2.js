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
   data.records.map(item =>{
     html += '<option>' + item.fields.BookTitle + '</option>';
   });
   html += '</select>';
$('#search').prepend(html);
});

button.addEventListener('click',() => {
  $('#landing').html('');
  retriveData()
  .then((data) => {
    data.records.map(item => {
      if(item.fields.BookTitle === $('#inputGroup').val()){
          var html = item.fields.PageContent;
        }
    $('#landing').prepend(html);
  });
  });
});
