(function() {
    'use strict';

    angular
        .module('app')
        .controller('artistsController', artistsController);

    artistsController.$inject = ["$scope", "$http","artistServiceLocal"];

    function artistsController($scope, $http, artistService) {
        console.log('artists controller');

        var vm = this; // controller as
        vm.artists = [];
        vm.searchText = "";
        vm.baseUrl = "data/";

        vm.getArtists = function() {
            return artistService.getArtists()
                .success(function(artists) {
                    vm.artists = artists;
                });
        }

        $scope.$root.$on('onsearchkey', function(e, searchText) {
            vm.searchText = searchText;
        });

        vm.getArtists();

        return;
    }
})();
