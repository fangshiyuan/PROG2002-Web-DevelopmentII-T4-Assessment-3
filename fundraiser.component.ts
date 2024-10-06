import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fundraiser',
  standalone: true,
  imports: [],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent implements OnInit {
  fundraiser: any = {};  // This holds the fundraiser details
  donations: any[] = []; // This holds donation details (if you have a separate API for donations)
  errorMessage: string = ''; // For handling errors

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the fundraiser ID from the route
    const fundraiserId = this.route.snapshot.paramMap.get('id');
    
    if (fundraiserId) {
      this.fetchFundraiserDetails(fundraiserId);
      this.fetchDonations(fundraiserId);  // Fetch donations separately (if applicable)
    } else {
      this.errorMessage = 'No fundraiser selected';
    }
  }

  // Fetch fundraiser details from the API
  fetchFundraiserDetails(fundraiserId: string): void {
    this.http.get(`/api/fundraisers/${fundraiserId}`)
      .subscribe((data: any) => {
        if (data) {
          this.fundraiser = data;  // Since the API returns one object, assign it directly
        }
      }, error => {
        this.errorMessage = 'Failed to load fundraiser details';
      });
  }

  // Fetch donations separately (if needed)
  fetchDonations(fundraiserId: string): void {
    this.http.get(`/api/fundraisers/${fundraiserId}/donations`)
      .subscribe((data: any) => {
        this.donations = data;  // Assuming the API returns an array of donations
      }, error => {
        this.errorMessage = 'Failed to load donation details';
      });
  }

  // Calculate the percentage progress
  getProgressPercentage(): number {
    if (!this.fundraiser.TARGET_FUNDING || this.fundraiser.TARGET_FUNDING === 0) {
      return 0;
    }
    return (this.fundraiser.CURRENT_FUNDING / this.fundraiser.TARGET_FUNDING) * 100;
  }

  // Redirect to donation page
  redirectToDonation(): void {
    window.location.href = `/donate/${this.fundraiser.FUNDRAISER_ID}`;
  }
}