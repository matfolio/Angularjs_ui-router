
angular.module("ngRouteApp",['ui.router']).
config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
   $stateProvider.
   
   state('Home', {
      url:'/home',
      templateUrl: './views/home.html',
      controller: 'HomeController'
   }).

    state('About', {
      url:'/about',
      templateUrl: './views/about.html',
      controller: 'AboutController'
   }).

   state('About.details', {
        url: '/details',
        templateUrl: './views/detail.html',
        controller: 'DetailController'
   }).

   state('About.founder', {
        url: '/founder',
        templateUrl: './views/founder.html',
        controller: 'FounderController'
    }).
   
   state('Contact', {
      url:'/contact/:Name',
      views: {

         '': { 
            templateUrl: './views/contact.html',
            controller: 'ContactController'
         },

         'sidebar@Contact': { 
            templateUrl: './views/sidebar.html',
            controller: 'ContactController'

         },

         'footer@Contact': { 
            templateUrl: './views/footer.html',
            controller: 'ContactController'
         },

         'content@Contact': { 
            templateUrl: './views/content.html',
            controller: 'ContactController'
         }
        }
   });

   $urlRouterProvider.otherwise('/home');

}]).

controller('HomeController', function($scope) {
   $scope.viewContent = "This is the Home page";
}).

controller('AboutController', function($scope) {
   $scope.viewContent = "This is the About page";
}).


controller('ContactController', function($scope,$http,$stateParams) {
   $scope.viewContent = "This is the About page";
   $scope.footer = "footer goes in here...";
    //$scope.users = [];
    if ($stateParams.Name.length == 0 ){
      $stateParams.Name = "Muftau";
    }
   $scope.user = $stateParams.Name;

  /* $scope.dummyObject  = {
      "url": "image1.jpg",
      "Name" : "Muftau",
      "profession" : "Software Developer",
      "status" : "Graduate",
      "country" : "Finland"
   };
   $scope.users = $scope.dummyObject;*/

   let url = "./data/info.json";
   $scope.Info = "Users";

     $http.get(url).then( function(response) {
         $scope.Contents = response.data;

         angular.forEach($scope.Contents, function(value, key) {
            if($scope.user === value.Name){
               $scope.users = value ;
               console.log($scope.users); // 
            }
             

         });
      });
}).

controller('FounderController', function($scope) {
   $scope.info = "Founder Information";
   $scope.viewContent = {
      "url": "image1.jpg",
      "Name" : "Muftau",
      "profession" : "Software Developer",
      "status" : "Graduate",
      "country" : "Finland"
   };
}).

controller('DetailController', function($scope) {
   $scope.viewContent = "Showing the content of the Detail view";
});