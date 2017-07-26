angular.module('meanproduct').controller('RegisterController', RegisterController);

function RegisterController($http,$window,$location) {
    var vm = this;

    vm.register = function() {
        var user = {
            username: vm.username,
            name: vm.name,
            email: vm.email,
            password: vm.password
        };

        if (!vm.username || !vm.password) {
            vm.error = 'Please add a username and a password.';
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.error = 'Please make sure the passwords match.';
            } else {
                $http.post('/api/users/register', user).then(function(result) {
                    console.log(result);
                    vm.message = 'Successful registration, please login.';
                    vm.error = '';
                    // $window.location.href="/";
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
};