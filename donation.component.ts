import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  fundraiser: any = {};
  giver: string = '';
  amount: number = 0;
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the fundraiser ID from the route and fetch details
    const fundraiserId = this.route.snapshot.paramMap.get('id');
    
    if (fundraiserId) {
      this.fetchFundraiserDetails(fundraiserId);
    }
  }

  fetchFundraiserDetails(fundraiserId: string): void {
    this.http.get(`/api/fundraisers/${fundraiserId}`)
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.fundraiser = data[0];  // Assigning the fundraiser data
        }
      }, error => {
        this.errorMessage = 'Failed to load fundraiser details';
      });
  }

  submitDonation(): void {
    if (this.amount < 5) {
      this.errorMessage = 'Minimum donation is 5 AUD.';
      return;
    }

    const donationData = {
      giver: this.giver,
      amount: this.amount,
      fundraiserId: this.fundraiser.FUNDRAISER_ID
    };

    this.http.post('/api/donation', donationData)
      .subscribe(response => {
        alert('Thank you for your donation!');
        this.giver = '';
        this.amount = 0;
      }, error => {
        this.errorMessage = 'Failed to submit donation. Please try again.';
      });
  }
}