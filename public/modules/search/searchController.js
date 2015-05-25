/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('dgc.search').controller('SearchController', ['$scope', '$location', '$http', '$state', '$stateParams', 'SearchResource', 'NotificationService',
    function($scope, $location, $http, $state, $stateParams, SearchResource, NotificationService) {
        console.log($stateParams);
        $scope.types = [];
        $scope.results = [];
        $scope.resultCount=0;
        $scope.search = function(query) {
            $scope.results = [];
            NotificationService.reset();
            SearchResource.search({query:query}, function searchSuccess(response) {
                $scope.results = response.results.rows;
                $scope.resultCount=response.count;
                console.log(response);
                if ($scope.results.length < 1) {
                    NotificationService.error('No Result found', false);
                }
                $state.go('search.results', {query:query}, {
                    location: 'replace'
                });
            }, function searchError(err) {
                NotificationService.error('Error occurred during executing search query, error status code = ' + err.status + ', status text = ' + err.statusText, false);
            });
        };

        $scope.typeAvailable = function() {
            return ['hive_table'].indexOf(this.result.type && this.result.type.toLowerCase()) > -1;
        };

      //  var urlParts = $location.url().split('/');
        //$scope.query = urlParts.length > 1 ? urlParts[3] : null;
        $scope.query=$stateParams.query;
        console.log($scope.query);
        if ($scope.query) {
            $scope.search($scope.query);
        }
    }
]);
