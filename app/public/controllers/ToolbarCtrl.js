/**
 * Created by karanbir on 25/11/15.
 */
    angular
        .module('smartApp')
        .controller('ToolbarCtrl', ToolbarCtrl);

function ToolbarCtrl(User){
    this.isAuthenticated =  false;

    if(User.isAuthenticated()){
        this.isAuthenticated = true;
        this.user = User.getUser();
    }

}

