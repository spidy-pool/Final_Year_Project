mapboxgl.accessToken = 'pk.eyJ1IjoicGFydmVuZHJhc2luZ2giLCJhIjoiY20zcmpwM2x3MDVndDJqcjBqd3Jrc3FtcCJ9.1EWDO0Esa6hi4ab6flrssw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
  })
  
  function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
    console.log(position);
  }
  
  function errorLocation() {
    setupMap([-2.24, 53.48])
  }
  
  function setupMap(center) {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 15
    })
  
    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)
  
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    })
  
    map.addControl(directions, "top-left")
  }