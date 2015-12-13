angular.module('MyBaiduMapController', [])
    .controller('MyBaiduMapCtrl',function($scope) {

        // 百度地图API功能
        function G(id) {
            return document.getElementById(id);
        }

        var map = new BMap.Map("l-map");
        map.centerAndZoom("北京",12);                   // 初始化地图,设置城市和地图级别。
        map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        var localSearch = new BMap.LocalSearch(map);
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId"
                ,"location" : map
            });

        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            setPlace();
        });

        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                G("res-point").value = pp.lng + "," + pp.lat;
                console.log(pp);
                map.centerAndZoom(pp, 18);
                var marker = new BMap.Marker(pp);  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);    //添加标注
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }

        $scope.searchByStationName = function searchByStationName() {
            map.clearOverlays(); //清空原来的标注
            var keyword = G("suggestId").value;
            localSearch.setSearchCompleteCallback(function (searchResult) {
                var poi = searchResult.getPoi(0);
                G("res-point").value = poi.point.lng + "," + poi.point.lat;
                console.log(poi.point);
                map.centerAndZoom(poi.point, 13);
                var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            });
            localSearch.search(keyword);

        }
    })
