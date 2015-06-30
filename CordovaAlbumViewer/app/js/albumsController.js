﻿(function () {
    'use strict';

    
    var app = angular
        .module('app')
        .controller('albumsController', albumsController);

    var service = 'albumService';
    if (app.configuration.useLocalData)
        service = 'albumServiceLocal';

    albumsController.$inject = ['$scope', '$timeout', '$animate', service];
    
    function albumsController($scope, $timeout, $animate, albumService) {                
        console.log("albums controller accessed.");
        var vm = this;
        vm.albums = null;

        vm.error = {
            message: null,
            icon: "warning",
            reset: function () { vm.error = { message: "", icon: "warning" } },
            error: function(message, icon) {
                vm.error.reset();
                vm.error.message = message;
                if (!icon)
                    icon = "error";

                vm.icon = icon;
            },
            info: function(message, icon) {
                vm.error.reset();
                vm.error.message = message;
                if (!icon)
                    icon = "info";
                vm.icon = icon;
            }
        };

        // filled view event emit from root form
        vm.searchText = '';

        vm.artistpk = 0;

    vm.getAlbums = function() {
        albumService.getAlbums()
            .success(function (data) {
                vm.albums = data;                    
                setTimeout(function () {                        
                    if (albumService.listScrollPos) {
                        var el = $("#MainView");
                        el.scrollTop(albumService.listScrollPos);
                        albumService.listScrollPos = 0;
                        setTimeout(function() {
                            var t = el[0].scrollHeight;
                        });

                    }
                }, 1); // delay around animation 900
            })
            .error(function(err) {
                vm.error.error(err.message);
            });
    };
        vm.albumClick = function (album) {
            albumService.listScrollPos = $("#MainView").scrollTop();
            console.log("scroll set: ", albumService.listScrollPos);
            window.location = "#/album/" + album.Id;
        };
        vm.addAlbum = function () {            
            albumService.album = albumService.newAlbum();
            albumService.updateAlbum(albumService.album);
            window.location = "#/album/edit/" + albumService.album.Id;
        };
        vm.deleteAlbum = function (album) {
            // on purpose! - force explicit prompt to minimize vandalization of demo
            if(!confirm("Are you sure you want to delete this album?"))
                return;

            albumService.deleteAlbum(album)
                .success(function(){
                    vm.albums = albumService.albums;
                })
                .error(onPageError);
        };
        vm.albumsFilter = function (alb) {
            var search = vm.searchText.toLowerCase();
            if (!alb || !alb.Title)
                return false;

            if ( alb.Title.toLowerCase().indexOf(search) > -1 ||
                alb.Artist.ArtistName.toLowerCase().indexOf(search) > -1)
                return true;

            return false;
        };

        // forwarded from Header controller
        $scope.$root.$on('onsearchkey', function (e,searchText) {
            vm.searchText = searchText;            
        });

        // controller initialization
        vm.getAlbums();
        
        return;
    }
})();
