(function() {
    'use strict';

    angular
        .module('app')
        .controller('headerController', headerController);        

    console.log('header controller pre');

    headerController.$inject = ['$scope','$route','$window','albumService'];

    function headerController($scope, $route, $window, albumService) {
        console.log('header controller');
        var vm = $scope;  // straight $scope controller

        vm.searchText = "";
        vm.searchVisible = false;

        vm.activeTab = albumService.activeTab;

        // forward the search key to other controllers
        vm.onKey = function () {        
            $scope.$emit('onsearchkey', vm.searchText);
        }

        $scope.searchBlur = function () {            
            vm.searchText = "search";
        }

        vm.$on("$locationChangeSuccess", function () {            
            var path = $window.location.hash;
            vm.activeTab = path.extract("#/", "/", true);
            isSearchVisible(vm.activeTab);
            console.log(path, vm.activeTab);            
        });

        function isSearchVisible(tab) {            
            var tab = tab.toLowerCase();

            if (tab == "albums" ||
                tab == "artists")
                vm.searchVisible = true;
            else
                vm.searchVisible = false;
            console.log(vm.searchVisible);
        }
        return;
    }    

})();

