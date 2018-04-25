appModule.service('PageService', function(){
	var currentPage=1;
	var pageSize=10;
	var pageRange=10;
	var chgSize = pageRange/2;
	this.search = function ($scope) {
        groupToPages($scope);
    };

    this.groupToPages = function ($scope) {
        $scope.datas = $scope.items;
    };
    
    this.setCurrentPage = function (page) {
    	currentPage=page;
    	
    };
    
    this.getCurrentPage = function () {
    	return currentPage;
    };
    
    this.range = function (currentPage,totalPage) {
        var ret = [];
        var start = 1;
        
        var end = currentPage+chgSize;
        if(currentPage>=1&&currentPage<=chgSize){
        	if(totalPage>pageRange){
            	end=pageRange;
        	}else{
        		end=totalPage;
        	}
        	
        } else if(totalPage < end){
        	start = currentPage-chgSize+1;
        	end=totalPage;
        	if(end<=pageRange){
        		start=1;
        	}
        }else{
        	start = currentPage-chgSize+1;
        }
        
        for (var i = start; i <=end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    this.getTmplate = function () {
    	var template='<div class="pageContainer"><ul  ng-show="totalNumber > 0"><li>共{{pagedItems}}页，{{totalNumber}}条 </li>'
    		+'<li><a href ng-click="setPage(1)">首页</a></li><li><a  ng-class="{hidden: currentPage == 1}" href ng-click="prevPage()">上一页</a></li>'
    		+'<li ng-repeat="n in range(currentPage,pagedItems)"  ng-click="setPage(n)" class="list-page " ng-class="{active: currentPage == n}"><a href >{{n}}</a></li>'+
    		//+'<li ng-repeat="item in pagedItems track by $index" ng-class="{active: item == currentPage} "><span>{{ item }}</span></li>'+
    		
    		'<li><a href ng-click="nextPage()" class="btn-next" ng-class="{hidden: currentPage == pagedItems}">下一页</a></li><li><a href ng-click="setPage(pagedItems)">尾页</a></li></ul></div>';
    	return template;
    };

    /**
     * 使用pageData方法页面必须设置items获取分页数据
     */
    this.getPageDatas = function ($scope,list ,pageData) {
    	$scope.totalNumber=pageData.total_number;
        $scope.pagedItems = pageData.total_page;
        this.setCurrentPage(pageData.page);
        $scope.currentPage = pageData.page;
        $scope.items =list;
        $scope.groupToPages = this.groupToPages($scope);
 
    };
    
    
});

appModule.directive('paging',function(PageService){
    return {
      
       restrict: 'AE',
       replace: true,

       template:PageService.getTmplate()   
    }
});

