
var $ = require('jquery');
var axios = require('axios');

console.log('test');
console.log($('#mainForm').length);

$('#mainForm').submit(function(event) {
    $('#response').append('<img style="max-width:400px" src="'+$('#image-url').val()+'"/>');
    event.preventDefault();
    axios.request({
        url: '/label?&url='+$('#image-url').val(),
        method:'GET'
    }).then(function(response) {
        $('#response').append('<p>'+response.data.label+'</p>');
    }).catch(console.log);
    return false;
})
