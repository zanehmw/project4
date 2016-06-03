"use strict";

(function(){
  angular
  .module("myApp", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Medicine", MedicineFactory)
  .factory("User", UserFactory)
  .controller("MedIndex", MedIndexCtrl)
  .controller("UserIndex", UserIndexCtrl)
  .controller("UserShow", UserShowCtrl);

  Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/assets/html/homepage.html"

    })
    .state("medindex", {
      url: "/medicine",
      templateUrl: "/assets/html/meds-index.html",
      controller: "MedIndex",
      controllerAs: "MedIndexVM"
    })
    .state("userindex", {
      url: "/users",
      templateUrl: "/assets/html/users-index.html",
      controller: "UserIndex",
      controllerAs: "UserIndexVM"
    })
    .state("usershow", {
      url: "/:user",
      templateUrl: "/assets/html/users-show.html",
      controller: "UserShow",
      controllerAs: "UserShowVM"
    });
     $urlRouterProvider.otherwise("/");
  }

  MedicineFactory.$inject = ["$resource"];
  function MedicineFactory($resource){
    var Medicine = $resource("/api/meds/:text");
    return Medicine;
  }

  UserFactory.$inject = ["$resource"];
  function UserFactory($resource){
    var User = $resource("/api/users/:user", {}, {
      update: {method: "PUT"}
    });
    return User;
  }


  MedIndexCtrl.$inject = ["Medicine"];
  function MedIndexCtrl(Medicine){
    var vm = this;
    vm.mednames = Medicine.query();
    console.log(this.mednames.photo_url)
  }

  UserIndexCtrl.$inject = ["User"];
  function UserIndexCtrl(User){
    var vm = this;
    vm.users = User.query();
    vm.create = function(){
      User.save(vm.newUser, function(response){
        console.log(response)
        vm.users.push(response);
      });
    }
  }

  UserShowCtrl.$inject = ["User", "$stateParams", "$state"];
  function UserShowCtrl(User, $stateParams, $state){
    var vm = this;
    vm.user = User.get($stateParams);
    vm.update = function(){
      console.log(vm.user);
      User.update($stateParams, vm.user, function(response){
        console.log(response);
        $state.go('userindex');
      });
    }

    vm.createMeds = function(){
      vm.user.meds.push(vm.med);
      vm.update();
    }

    vm.destroy = function(){
      User.remove($stateParams, vm.user, function(response){
        $state.go("userindex");
      });
    }
  }

})();
