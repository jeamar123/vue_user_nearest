<script>
	
	// import axios from 'axios'
	var GoogleMaps = {
		props:	{
			latLng: Object,
			markers: Object,
			options: Object,
		},
		data() {
			return {
				mapOptions: {
					map: null,
				},
				map: null,
			}
		},
		created() {
			setTimeout(() => {
				this.initMap();
			}, 300);
		},
		methods: {
			initMap() {
				let vm = this
				console.log(window.google);
        vm.map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    }
	}
	export default GoogleMaps
</script>