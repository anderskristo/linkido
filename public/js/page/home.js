define(function(require) {
    var ajax = require('components/ajax');

    // Post new link
    var postBtn  = document.getElementsByClassName('fn-post-link')[0];
    var postName = document.getElementById('name');
    var postUrl  = document.getElementById('url');

    postBtn.addEventListener('click', function() {
        if (postName.value && postUrl.value) {
            var url  = 'api/link';
            var data = 'name=' + postName.value + '&url=' + postUrl.value;
            ajax.postData(url, data).then(function(response) {
                console.log(response);
            });
        } else {
            console.log('Fields cannot be empty');
        }
    });

    // Get new link
    ajax.getData('api/links').then(function(data) {
        var links = data;
        console.log(links);
    });
});
