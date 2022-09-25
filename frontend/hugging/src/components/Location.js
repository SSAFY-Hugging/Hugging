// import React, { useState, useRef, useEffect } from "react";

// const [geolocation, setGeolocation] = useState({
//     lat: null,
//     long: null,
//   });

//   function displayMarker(locPosition, message) {
// 	var imageSize = new kakao.maps.Size(24, 35);
// 	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

// 	// 마커를 생성합니다
// 	var marker = new kakao.maps.Marker({
// 		map: map, 
// 		position: locPosition, 
// 		image : markerImage, 
// 	});

// 	var iwContent = message, // 인포윈도우에 표시할 내용
// 		iwRemoveable = true;

// 	// 인포윈도우를 생성합니다
// 	var infowindow = new kakao.maps.InfoWindow({
// 		content : iwContent,
// 		removable : iwRemoveable
// 	});

// 	// 인포윈도우를 마커위에 표시합니다
// 	infowindow.open(map, marker);

// 	// 지도 중심좌표를 접속위치로 변경합니다
// 	map.setCenter(locPosition);
// }

//   function getLocation() {
//     let lat, long;
//     if (navigator.geolocation) {
//       // 위치 권한을 허용하면
//       navigator.geolocation.getCurrentPosition(function(position) {

//         var lat = position.coords.latitude, // 위도
//             lon = position.coords.longitude; // 경도

//         var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
//         var message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시될 내용입니다

//         // 마커와 인포윈도우를 표시합니다
//         displayMarker(locPosition, message);
//     });
// } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

//     var locPosition = new kakao.maps.LatLng(37.4812845080678, 126.952713197762),
//         message = '현재 위치를 알 수 없어 기본 위치로 이동합니다.'

//     currentLatLon['lat'] = 33.450701
//     currentLatLon['lon'] = 126.570667

//     displayMarker(locPosition, message);
// }
// return true
//   }

  
// const { kakao } = window

// function Location() {
//   const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

//   useEffect(() => {
//     var infowindow = new kakao.maps.InfoWindow({zIndex:1});

//     var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//         mapOption = {
//             center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//             level: 3 // 지도의 확대 레벨
//         };  
    
//     // 지도를 생성합니다    
//     var map = new kakao.maps.Map(mapContainer, mapOption); 
    
//     // 장소 검색 객체를 생성합니다
//     var ps = new kakao.maps.services.Places(); 
    
//     // 키워드로 장소를 검색합니다
//     ps.keywordSearch('이태원 맛집', placesSearchCB); 
    
//     // 키워드 검색 완료 시 호출되는 콜백함수 입니다
//     function placesSearchCB (data, status, pagination) {
//         if (status === kakao.maps.services.Status.OK) {
    
//             // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//             // LatLngBounds 객체에 좌표를 추가합니다
//             var bounds = new kakao.maps.LatLngBounds();
    
//             for (var i=0; i<data.length; i++) {
//                 displayMarker(data[i]);    
//                 bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//             }       
    
//             // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//             map.setBounds(bounds);
//         } 
//     }
    
//     // 지도에 마커를 표시하는 함수입니다
//     function displayMarker(place) {
        
//         // 마커를 생성하고 지도에 표시합니다
//         var marker = new kakao.maps.Marker({
//             map: map,
//             position: new kakao.maps.LatLng(place.y, place.x) 
//         });
    
//         // 마커에 클릭이벤트를 등록합니다
//         kakao.maps.event.addListener(marker, 'click', function() {
//             // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//             infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
//             infowindow.open(map, marker);
//         });
//     }
//     return () => {};
//   }, []);

//   return (
//     <div
//       className="map"
//       style={{ width: "500px", height: "500px" }}
//       ref={container}
//     ></div>
//   );
// }

// export default Location;