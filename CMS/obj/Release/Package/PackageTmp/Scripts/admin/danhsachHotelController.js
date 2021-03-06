﻿myApp.controller("danhsachHotelController", function ($scope, $http, $window, uiGridConstants) {
    $scope.Hotels = [];
    $scope.gridOptions = {};
    $scope.Hotel = {};

    //Lấy danh sách Post
    $http.get('/Hotels/GetAllHotelsNoChecked/').success(function (data) {
        $scope.gridOptions.data = data;
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 50;
    $scope.gridOptions.columnDefs =
    [
        {
            displayName: "STT",
            name: 'stt',
            enableCellEdit: false,
            enableSorting: false,
            enableFiltering: false,
            width: 55,
            cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        },
        {
            displayName: "ID",
            name: 'idHotel',
            enableSorting: false,
            width: 60,
        },
        {
            displayName: "Họ tên",
            name: 'hoTen',
            enableSorting: false
        },
        {
            displayName: "Địa chỉ",
            name: 'diaChi',
            enableSorting: false
        },
        {
            displayName: "SĐT",
            name: 'SDT',
            enableSorting: false
        },
        {
            displayName: "Email",
            name: 'tour',
            enableSorting: false
        },
        {
            displayName: "Ngày đến",
            name: 'timeStart',
            enableSorting: false
        },
        {
            displayName: "Ngày đi",
            name: 'timeEnd',
            enableSorting: false
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.CheckHotel(row.entity.idHotel)"><span class="fa fa-check"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteOrder(row.entity.idHotel)"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];

    //Phan trang
    $scope.gridOptions.paginationPageSizes = [10, 25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;

    //Tim kiem
    $scope.gridOptions.enableFiltering = true;
    //Select
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;

    //Grid API
    $scope.gridOptions.onRegisterApi = function (gridApi) {

    };

    //Edit
    $scope.EditHotel = function (id) {
        $window.location.href = '/Admin/Hotels/Create?idHotel=' + id;
    }

    //Delete
    $scope.DeleteHotel = function (id) {
        var id = id;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/HotelAPI/' + id)
            .success(function () {
                $http.get('/Hotels/GetAllHotelsNoChecked/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }

    //check
    $scope.CheckHotel = function (id) {
        $http.get('/API/HotelAPI/' + id)
        .success(function (data) {
            $scope.Hotel = {
                idHotel: data.idHotel,
                hoTen: data.hoTen,
                diaChi: data.diaChi,
                SDT: data.SDT,
                email: data.email,
                hotel: data.hotel,
                timeStart: data.timeStart,
                timeEnd: data.timeEnd,
                guestNumber: data.guestNumber,
                checked: 1,
            }
            $http.put('/API/HotelAPI/' + id, $scope.Hotel)
            .success(function () {
                toastr.success('Thành công', 'Đã xử lý');
                $http.get('/Hotels/GetAllHotelsNoChecked/').success(function (data) {
                    $scope.gridOptions.data = data;
                });
            })
            .error(function () {
                toastr.error('Thất bại', 'Đã xử lý')
            });
        })

    };
});