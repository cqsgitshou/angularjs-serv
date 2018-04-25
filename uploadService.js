appModule.service('UploadService', function(){
	
	this.upload = function ($scope,Upload) {
		file = $scope.file ;
         var selectFileName = file.name.toLowerCase();
         var suffix = fileSuffix(selectFileName);
         
         if(!(selectFileName.endWith("jpg")||selectFileName.endWith("png"))){
        	 alert("请上传.jpg,.png格式的图片");return;
         }
         
         var fileName=$scope.fileName;
         if(!isNaN(fileName)){
        	 fileName=fileName+"."+suffix;
         }
         Upload.upload({
             //服务端接收
             url: '/api/admin/file/upload.html',
             //上传的同时带的参数
              data: {file: file,"fileName":fileName,path:$scope.filePath}
         }).progress(function (evt) { 
             //进度条
             var progressPercentage =parseInt(100.0 * evt.loaded / evt.total);
             console.log("progress:"+progressPercentage);
             $scope.progressPercentage="上传进度："+progressPercentage+"%";
         }).success(function (data, status, headers, config) {

           if(data.res_code=="1"){
        	     $scope.imageSrc = data.url;
        	     $scope.datas.img_url = data.url;
        	     $scope.datas.storage = data.storage;
                 console.log("success:"+$scope.datas.img_url+":"+$scope.datas.storage);
                 $scope.progressPercentage="";
                 
           }else{
        	   alert(data.res_msg);
           }
           
         }).error(function (data, status, headers, config) {
             //上传失败
             console.log('error status: ' + status);
       });
    };
    
});
