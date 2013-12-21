(function (global) {
    var app = global.app = global.app || {};

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
        $(document.body).height(window.innerHeight);
    }, false);

    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout"});

    app.login = function (e) {
        
        
        
        
        var xhr = new XMLHttpRequest(),
            scheme = 'https://',
            githubApi = 'api.github.com',
            authorization = 'authorizations/clients',
            clientId = '5481483d48b55376bf3a',
            clientSecret = '6359870e3c46edf1d8d467737dbd56a40a3b9cdb',
            request,
            requestBody,
            username = $("#username").val(),
            password = $("#password").val(),
            host,
            url;
        request = {
          "client_secret": clientSecret,
          "scopes": [ 
            "repo"
          ],
          "note": "Authorizing mobile app"
        };
        requestBody = JSON.stringify(request);
        host = scheme + githubApi;
        url = [host, authorization, clientId].join('/');
        
        
       
        xhr.open('PUT', url, true);
        xhr.dataType = "json";
        xhr.setRequestHeader('Accept','application/vnd.github.raw+json');
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
       
        xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(username + ':' + password) );
        
        xhr.onreadystatechange = function () {
            var response,
                token;
            if (this.readyState == 4) {
                if (this.status >= 200 && this.status < 300 || this.status === 304) {
                    console.log(this.responseText);
                    response = JSON.parse(this.responseText);
                    token = response.token;
                    console.log("token: " + token);
                    //setTimeout(function(){ app.requestUser(token) },100 );
                    app.requestUser(token);
                }
                else {
                   // cb({path: path, request: this, error: this.status});
                }
            }
        };
        xhr.send(requestBody);
    };
    
    app.requestUser = function (token){
        var xhr = new XMLHttpRequest();
        console.log("sending");
        xhr.open('GET', "https://api.github.com/user", true);
        xhr.dataType = "json";
        xhr.setRequestHeader('Accept','application/vnd.github.raw+json');
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'token ' + token);
        xhr.onreadystatechange = function (){
            if (this.readyState == 4) {
                if (this.status >= 200 && this.status < 300 || this.status === 304) {
                    console.log(this.responseText);
                   // cb(null, raw ? this.responseText : this.responseText ? JSON.parse(this.responseText) : true, this);
                }
                else {
                  //  cb({path: path, request: this, error: this.status});
                }
            }
        }
        xhr.send();
    };
})(window);