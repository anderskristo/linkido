define(['ajax'], function(ajax) {
    var home = function() {
        this.init = function() {
            // Post new link
            var postBtn  = document.getElementsByClassName('fn-post-link')[0];
            var postName = document.getElementById('name');
            var postUrl  = document.getElementById('url');

            postBtn.addEventListener('click', function() {
                if (postName.value && postUrl.value) {
                    var url  = 'api/link';
                    var data = 'name=' + postName.value + '&url=' + postUrl.value;
                    ajax.postData(url, data).then(function(response) {
                        if (response.response === true) {
                            console.log(response);
                        } else {
                            console.log(response);
                        }
                    });
                } else {
                    console.log('Fields cannot be empty');
                }
            });

            // Get new link
            ajax.getData('api/links').then(function(data) {
                var links = data;
            });

        };
    }
    return home;
});
