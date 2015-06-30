(function() {
    'use strict';

    var app = angular
        .module('app')
        .controller('artistsController', artistsController);

    var service = "artistService";
    if(app.configuration.useLocalData)
        service = "artistServiceLocal";

    artistsController.$inject = ["$scope", "$timeout" , service];
    

    function artistsController($scope,$timeout, artistService) {
        console.log('artists controller');

        var vm = this; // controller as
        vm.artists = [];
        vm.searchText = "";
        vm.baseUrl = "data/";


        vm.artistClick = function (artist) {
            console.log('artistclick');
            artistService.listScrollPos = $("#MainView").scrollTop();
            window.location = "#/artist/" + artist.Id;
        }
        vm.getArtists = function() {
            return artistService.getArtists()
                .success(function(artists) {
                    vm.artists = artists;

                    if (artistService.listScrollPos)
                        $timeout(function () {
                            $("#MainView").scrollTop(artistService.listScrollPos);
                        }, 10);

                });
        }

        $scope.$root.$on('onsearchkey', function(e, searchText) {
            vm.searchText = searchText;
        });

        vm.getArtists();

        // force explicit animation of the view and edit forms always
        //$animate.addClass("#MainView", "slide-animation");

        return;
    }
})();
