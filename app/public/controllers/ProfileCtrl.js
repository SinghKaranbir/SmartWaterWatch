/**
 * Created by karanbir on 26/11/15.
 */
angular.module('smartApp')
    .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($scope, User){

    $scope.viewMode = false;

    $scope.edit = function(){
        console.log('iam edit');
        $scope.viewMode = true;
    };
    console.log(User.getUser());
    this.user = User.getUser();

    console.log(User.isAuthenticated());

}