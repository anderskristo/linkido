define(function() {
    return {
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
