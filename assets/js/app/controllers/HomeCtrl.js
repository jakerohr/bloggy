BloggyApp.controller('HomeCtrl',['$scope','$rootScope','Post','AlertService',function($scope,$rootScope,Post,AlertService){

  console.log(AlertService.get());

  $rootScope.loading = true;

  console.log('home controller loaded!');
  $scope.posts = [];

  $scope.showPost = function(postId) {
    Post.get({id:postId},function(data){
      console.log(data);
      // res.view('/posts/' + postId);???
    })
  }

  $scope.deletePost = function(postId) {
    Post.delete({id:postId}, function(data){
      AlertService.add('info','The post was deleted.')
      // $scope.loadPosts();
    })
  }


  $scope.loadPosts = function(){

    io.socket.get('/api/post', function(data, jwRes){
      $scope.$evalAsync(function(){
        $rootScope.loading = false;
        $scope.posts = data;
      })
    });
  }

  $scope.loadPosts();

  io.socket.on('post', function(msg){
    // console.log('socket message: ',msg);
    // $scope.loadPosts();
    if(msg && msg.verb){
      switch(msg.verb){
        case 'created':
          $scope.$evalAsync(function(){
            $scope.posts.push(msg.data);
          });
          break;
        case 'updated':
          $scope.$evalAsync(function(){
            for(var i = 0; i < $scope.posts.length; i++){
              if($scope.posts[i].id == msg.id){
                for(var key in msg.data){
                  $scope.posts[i][key] = msg.data[key];
                }
                break;
              }
            }
          });
          break;
        case 'destroyed':
          $scope.$evalAsync(function(){
            for(var i = 0; i < $scope.posts.length; i++){
              if($scope.posts[i].id == msg.id){
                  $scope.posts.splice(i,1);
                  break;
              }
            }
          });
          break;
      }
    }
  });

  // $http.get('/api/post').success(function(data){
  //   console.log(data)
  //   $scope.posts = data;
  // });

}]);
