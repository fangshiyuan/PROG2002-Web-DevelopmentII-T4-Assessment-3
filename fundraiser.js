document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
  
    // Fetch fundraiser details
    fetch(`/api/fundraisers/${fundraiserId}`)
      .then(response => response.json())
      .then(fundraiser => {
        // Assuming 'fundraiser' is an object containing the relevant fields
        if (fundraiser) {
          // Update the fundraiser details
          document.getElementById('fundraiser-caption').textContent = fundraiser.CAPTION;
          document.getElementById('fundraiser-organizer').textContent = `Organizer: ${fundraiser.ORGANIZER}`;
          document.getElementById('fundraiser-description').textContent = `City: ${fundraiser.CITY}`;
          document.getElementById('fundraiser-description').textContent += ` | Active: ${fundraiser.ACTIVE ? 'Yes' : 'No'}`;
  
          // Calculate and display progress bar
          const progressPercentage = (fundraiser.CURRENT_FUNDING / fundraiser.TARGET_FUNDING) * 100;
          document.getElementById('progress-bar-fill').style.width = `${progressPercentage}%`;
          document.getElementById('fundraiser-progress-text').textContent = `${fundraiser.CURRENT_FUNDING} AUD raised of ${fundraiser.TARGET_FUNDING} AUD goal`;
  
          // Fetch donations for the fundraiser
          fetch(`/api/fundraisers/${fundraiserId}/donations`)
            .then(response => response.json())
            .then(donations => {
              // Update the number of donations
              document.getElementById('donation-count').textContent = `${donations.length} donations`;
  
              // Display the recent donations
              const donationsList = document.getElementById('donations-list');
              donationsList.innerHTML = '';  // Clear previous entries
              donations.forEach(donation => {
                const listItem = document.createElement('li');
                listItem.textContent = `${donation.GIVER} donated ${donation.AMOUNT} AUD`;
                donationsList.appendChild(listItem);
              });
            })
            .catch(error => console.error('Error fetching donations:', error));
        }
      })
      .catch(error => {
        document.getElementById('error-message').style.display = 'block';
        console.error('Error fetching fundraiser details:', error);
      });
  });
  