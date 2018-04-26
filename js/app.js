var app = angular.module('todoApp', []);
app.controller('todoCtrl', ['$scope', function($scope) {

    $scope.headerName = "Groceries";


    $scope.completedTaskList = [];

    $scope.todoList = [{
        todoText: 'Buy Pasta',
        done: false
    }];

    $scope.todoAdd = function() {
        $scope.alreadyExist = false;
        $scope.alreadyActive = false;
        if ($scope.todoInput !== "" && $scope.todoInput !== undefined) {

            angular.forEach($scope.completedTaskList, function(value, key) {

                if (value.todoText === $scope.todoInput) {
                    $scope.alreadyExist = true;
                    $scope.errorMessage = "This task is already completed.";
                }

            });



            angular.forEach($scope.todoList, function(value, key) {

                if (value.todoText === $scope.todoInput) {
                    $scope.alreadyActive = true;
                    $scope.errorMessage = "This task is already in TODO list.";
                }

            });


            if (!$scope.alreadyExist && !$scope.alreadyActive) {
                $scope.todoList.push({
                    todoText: $scope.todoInput,
                    done: false
                });
                $scope.todoInput = "";
            }

        }
    };


    $scope.markDone = function(item) {

        if (item.done === true) {

            var index = $scope.todoList.indexOf(item);
            $scope.todoList.splice(index, 1);


            $scope.completedTaskList.push({
                todoText: item.todoText,
                done: true
            });

        }
    };



    $scope.markNotDone = function(item) {

        if (item.done === false) {

            var index = $scope.completedTaskList.indexOf(item);
            $scope.completedTaskList.splice(index, 1);


            $scope.todoList.push({
                todoText: item.todoText,
                done: false
            });

        }
    };


}]);



app.directive('clickToEdit', function($timeout) {
    return {
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            type: '@type'
        },
        replace: true,
        transclude: false,
        
        template: '<div class="templateRoot">' +
            '<div class="hover-edit-trigger" title="click to edit">' +
            '<div class="hover-text-field" ng-show="!editState" ng-click="toggle()">{{model}}<div class="edit-pencil glyphicon glyphicon-pencil"></div></div>' +
            '<input style="border:0;" class="inputText" type="text" ng-model="localModel" ng-enter="save()" ng-show="editState && type == \'inputText\'" />' +
            '</div>' +
            '<div class="edit-button-group pull-right" ng-show="editState">' +
            '</div>' +
            '</div>',
        link: function(scope, element, attrs) {
            scope.editState = false;

            
            scope.localModel = scope.model;

            
            scope.save = function() {
                scope.model = scope.localModel;
                scope.toggle();
            };

            
            scope.cancel = function() {
                scope.localModel = scope.model;
                scope.toggle();
            }

            
            scope.toggle = function() {

                scope.editState = !scope.editState;

               
                var x1 = element[0].querySelector("." + scope.type);

                
                $timeout(function() {
                    
                    scope.editState ? x1.focus() : x1.blur();
                }, 0);
            }
        }
    }
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
