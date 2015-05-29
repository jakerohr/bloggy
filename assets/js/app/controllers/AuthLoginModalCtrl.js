BloggyApp.controller('AuthLoginModalCtrl',['$scope','UserService','$modalInstance',function($scope,UserService,$modalInstance){
  // console.log('modal controller loaded');

  $scope.login = function() {
    // console.log(UserService);
    // alert('you want to log in with ' + $scope.email + ' ' + $scope.password)

    UserService.login($scope.email,$scope.password, function(err,data){
      if(err){
        console.log(data);
        alert('something awful happened.');
      } else if (data && data.result){
        $modalInstance.close();
      } else {
        console.log(data);
        alert('unable to log in');
      }
    });
  }

}]);
