app.controller('DonationController', function($scope, $http, $location, $window) {
  const fundraiserId = $location.search().id;  // Get the fundraiser ID from query string

  // Fetch the selected fundraiser
  $http.get(`/api/fundraisers/${fundraiserId}`).then(function(response) {
      if (response.data) {
          $scope.fundraiser = response.data;  // Assign the fundraiser details
      } else {
          $scope.fundraiser = {};
      }
  }, function(error) {
      console.error('Error fetching fundraiser:', error);
  });

  // Submit donation
  $scope.submitDonation = function() {
      if ($scope.amount < 5) {
          alert('The minimum donation is 5 AUD.');
          return;
      }

      const donationData = {
          amount: $scope.amount,
          giver: $scope.giver,
          fundraiserId: fundraiserId
      };

      // POST request to submit the donation
      $http.post('/api/donation', donationData).then(function(response) {
          alert(`Thank you for your donation to ${$scope.fundraiser.CAPTION}`);
          $window.location.href = `/fundraiser?id=${fundraiserId}`;  // Redirect back to the fundraiser page
      }, function(error) {
          console.error('Error submitting donation:', error);
      });
  };
});
