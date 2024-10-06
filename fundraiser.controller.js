app.controller('FundraiserController', function($scope, $http, $location) {
    const fundraiserId = $location.search().id; // Assuming you use query string for fundraiser ID
  
    // Fetch fundraiser data with donations
    $http.get(`/api/fundraisers/${fundraiserId}`).then(function(response) {
    if (response.data && response.data.length > 0) {
      // Assuming the API returns a structure where the first object is the fundraiser and subsequent objects are donations
      $scope.fundraiser = response.data[0]; // First entry is the main fundraiser
      $scope.donations = response.data.slice(1); // Subsequent entries as donations
    } else {
      // No fundraiser data or donations returned
      $scope.fundraiser = {};
      $scope.donations = [];
    }
    }, function(error) {
      console.error('Error fetching fundraiser details:', error);
    });
  
    // Redirect to donation page
    $scope.redirectToDonation = function() {
      window.location.href = `/donation?id=${fundraiserId}`;
    };
  });
  