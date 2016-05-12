define(function(require) {
    var post = require('components/post');

    var postBtn  = document.getElementsByClassName('fn-post-link')[0];
    var postName = document.getElementById('name');
    var postUrl  = document.getElementById('url');

    postBtn.addEventListener('click', function() {
        if (postName.value && postUrl.value) {
            var formData = {
                name: postName.value,
                url: postUrl.value
            };
            post.postData(formData);
        } else {
            console.log('Fields cannot be empty');
        }
    });

});
