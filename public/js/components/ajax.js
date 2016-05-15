define([], function() {    
    return {
        postData: function(url, data) {
            var http   = new XMLHttpRequest();
            var url    = url;
            var params = data;

            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            var ret = Promise.defer();
            http.onreadystatechange = function() {
                if (http.readyState === 4 && http.status === 200) {
                    var response = JSON.parse(http.responseText);
                    ret.resolve(response)
                }
                // TODO: Catch some errors and reject them
            }
            http.send(params);
            return ret.promise;
        },

        getData: function(url) {
            var http   = new XMLHttpRequest();
            var url    = url;

            http.open('GET', url, true);
            var ret = Promise.defer();
            http.onreadystatechange = function() {
                if (http.readyState === XMLHttpRequest.DONE) {
                    var response = JSON.parse(http.responseText);
                    ret.resolve(response);
                }
                // TODO: Catch some errors and reject them
            }
            http.send();
            return ret.promise;
        }
    };
});
