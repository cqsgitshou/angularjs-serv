/**
 * 封装angular js http 网络请求的service
 * 封装请求接口url和重装请求参数
 */
appModule.factory("HttpService", ['$http', function ($http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    
    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function (data) {
    	var str = [];
	     for(var p in data){
	         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
	     }
	     return str.join("&");
    }];

    return {
    	
        feedBackReplyPost: function (data) {
            return $http.post("/api/feedback",data);
        }
       
    };
  /*  return {
       
        operateChannelAdd: function (data) {
            return $http.post("/api/operateChannel",data);
        }
    }*/
}])
