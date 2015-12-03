/**
 * Created by karanbir on 02/12/15.
 */
angular.module('smartApp')
    .controller('ManageSensorCtrl', ManageSensorCtrl);

function ManageSensorCtrl($scope,$mdDialog,$mdToast,$http){

    $scope.showDialog = function(ev) {
        $mdDialog.show({
            controller: DialogCtrl,
            templateUrl: 'views/add_sensor_dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    function DialogCtrl($scope, $mdDialog) {

        $scope.sensor = {
            sensorName : '',
            sensorType : '',
            serialNo : ''
        };

        $scope.addSensor = function(){

            $http.post('/sensor/register', $scope.sensor).success(function (data) {
                if(data.state == 'success') {
                    $mdToast.show($mdToast.simple().content(data.message));
                }else {
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                }
            });
            $mdDialog.hide();
        }
    }
}