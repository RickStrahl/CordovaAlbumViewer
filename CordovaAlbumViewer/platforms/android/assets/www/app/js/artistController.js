(function () {
    'use strict';

    angular
        .module('app')
        .controller('artistController', artistController);

    artistController.$inject = ["$http","$window","$routeParams","$animate","artistServiceLocal"];

    function artistController($http,$window,$routeParams,$animate,artistService) {
        var vm = this;

        vm.artist = null;
        vm.artists = [];

        vm.error = {
            message: null,
            icon: "warning",
            reset: function() { vm.error = { message: "", icon: "warning" } },
            show: function(msg, icon) {
                vm.error.message = msg;
                vm.error.icon = icon ? icon : "warning";
            }
        };

        vm.getArtist = function(id) {
            artistService.getArtist(id)
                .success(function(artist) {
                    vm.artist = artist;
                    //vm.albums = response.Albums;
                })
                .error(function() {
                    vm.error.show("Artist couldn't be loaded.", "warning");
                });
        };

        vm.saveArtist = function (artist) {            
            artistService.saveArtist(artist)
                .success(function (artist) {                    
                    vm.artist = artist;
                    vm.albums = [];
                    $("#EditModal").modal("hide");
                })
                .error(function (error) {
                    vm.error.show("Artist couldn't be saved.", "warning");
                });
        }

        vm.albumClick = function(album) {
            $window.location.hash = "/album/" + album.Id;
        };

        vm.addAlbum = function () {            
            albumService.album = albumService.newAlbum();
            albumService.album.ArtistId = vm.artist.Id;
            albumService.album.Artist.Id = vm.artist.Id;
            albumService.album.Artist.ArtistName = vm.artist.ArtistName;

            albumService.updateAlbum(albumService.album);
            $window.location.hash = "/album/edit/0";
        };

        vm.getArtist($routeParams.artistId);

        // force explicit animation of the view and edit forms always
        //$animate.addClass("#MainView", "slide-animation");
    }
})();
