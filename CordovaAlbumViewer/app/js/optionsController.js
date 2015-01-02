(function() {
    'use strict';

    var app = angular
        .module('app')
        .controller('optionsController', optionsController);

    optionsController.$inject = [ "artistServiceLocal","albumServiceLocal"];



    function optionsController(artistService, albumService) {
        console.log('options controller');

        var vm = this; // controller as

        vm.error = {
            message: null,
            icon: "warning",
            reset: function () { vm.error = { message: "", icon: "warning" } }
        };

        vm.reloadData = function() {            
            albumService.getAlbums(2); // force reload from disk
            artistService.getArtists(2);
            vm.error.message = "Data has been reset to original data.";
            vm.error.icon = "info";
        }

    }
})();
