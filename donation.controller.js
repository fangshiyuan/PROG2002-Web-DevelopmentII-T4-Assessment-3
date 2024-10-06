app.controller('DonationController', function($scope, $http, $location, $window) {
    const fundraiserId = $location.search().id;
  
    // Fetch the selected fundraiser
    $http.get(`/api/fundraisers/${fundraiserId}`).then(function(response) {
      $scope.fundraiser = response.data[0];
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
  
      $http.post('/api/donation', donationData).then(function(response) {
        alert(`Thank you for your donation to ${$scope.fundraiser.CAPTION}`);
        $window.location.href = `/fundraiser?id=${fundraiserId}`;
      }, function(error) {
        console.error('Error submitting donation:', error);
      });
    };
  });
  