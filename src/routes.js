(function () {
    'use strict';

    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Set up UI states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories-view.template.html',
                controller: 'CategoriesController as categoriesCtrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'src/templates/items.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                        }]
                }
            });
    }
})();