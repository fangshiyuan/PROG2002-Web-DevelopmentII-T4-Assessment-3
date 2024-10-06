document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
  
    // Fetch the fundraiser details
    fetch(`/api/fundraisers/${fundraiserId}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const fundraiser = data[0];
          document.getElementById('fundraiser-caption').textContent = `Donate to ${fundraiser.CAPTION}`;
          document.getElementById('fundraiser-organizer').textContent = `Organizer: ${fundraiser.ORGANIZER}`;
        }
      })
      .catch(error => console.error('Error fetching fundraiser:', error));
  
    // Handle donation form submission
    document.getElementById('donation-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const giver = document.getElementById('giver').value;
      const amount = document.getElementById('amount').value;
  
      if (amount < 5) {
        alert('The minimum donation is 5 AUD.');
        return;
      }
  
      const donationData = {
        giver: giver,
        amount: amount,
        fundraiserId: fundraiserId
      };
  
      fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
      })
      .then(response => response.json())
      .then(() => {
        alert('Thank you for your donation!');
        window.location.href = `/fundraiser?id=${fundraiserId}`;
      })
      .catch(error => console.error('Error submitting donation:', error));
    });
  });
  