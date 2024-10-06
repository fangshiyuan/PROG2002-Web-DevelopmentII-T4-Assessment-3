app.controller('FundraiserController', function($scope, $http, $location) {
  const fundraiserId = $location.search().id; // Get the fundraiser ID from query string

  // Fetch fundraiser data
  $http.get(`/api/fundraisers/${fundraiserId}`).then(function(response) {
      if (response.data) {
          $scope.fundraiser = response.data;  // Assign the fundraiser details
      } else {
          $scope.fundraiser = {};
      }
  }, function(error) {
      console.error('Error fetching fundraiser details:', error);
  });

  // Fetch donations for the selected fundraiser
  $http.get(`/api/fundraisers/${fundraiserId}/donations`).then(function(response) {
      if (response.data) {
          $scope.donations = response.data;  // Assign the donations array
      } else {
          $scope.donations = [];
      }
  }, function(error) {
      console.error('Error fetching donation details:', error);
  });

  // Redirect to the donation page
  $scope.redirectToDonation = function() {
      window.location.href = `/donation?id=${fundraiserId}`;
  };
});
