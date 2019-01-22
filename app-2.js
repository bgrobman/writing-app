const landing = document.getElementById('landing');
let url = `https://api.airtable.com/v0/appP3yc6hsTO1FLXd/Table%201?api_key=keyZ3s4zJ9nbnOFdZ`;

function retriveData(){
  return fetch(url)
          .then(res => res.json())
}

retriveData()
.then((data) => {
  var html = '<select class="custom-select" id="inputGroup" aria-label="search for books in database">';
  // data.map(item =>{
  for(let i  = 0; i < data.length ; i +=1){
   html += '<option>' + data.records[i].fields.BookTitle + '</option>';
 }
   html += '</select>';
$('#search').prepend(html);
});
