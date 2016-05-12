define(function() {
    return {
        postData: function(data) {
            var http   = new XMLHttpRequest();
            var url    = 'api/link'
            var params = 'name=' + data.name + '&url=' + data.url;

            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState === 4 && http.status === 200) {
                    console.log(http.responseText);
                }
            }
            http.send(params);
        }
    };
});
