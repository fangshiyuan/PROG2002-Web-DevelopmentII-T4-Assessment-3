import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-fundraiser',
  standalone: true,
  imports: [],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent implements OnInit {
  fundraiser: any = {};
  donations: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the fundraiser ID from the route
    const fundraiserId = this.route.snapshot.paramMap.get('id');
    
    if (fundraiserId) {
      this.fetchFundraiserDetails(fundraiserId);
    } else {
      this.errorMessage = 'No fundraiser selected';
    }
  }

  fetchFundraiserDetails(fundraiserId: string): void {
    this.http.get(`/api/fundraisers/${fundraiserId}`)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load fundraiser details';
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          // Assign the first result as fundraiser details
          this.fundraiser = data[0];
          // Extract donations from the data, assuming donations start after fundraiser details
          this.donations = data.slice(1) || [];
        }
      });
  }


  getProgressPercentage(): number {
    if (this.fundraiser.TARGET_FUNDING === 0) {
      return 0;
    }
    return (this.fundraiser.CURRENT_FUNDING / this.fundraiser.TARGET_FUNDING) * 100;
  }

  redirectToDonation(): void {
    // Implement the actual redirect to the donation page
    window.location.href = `/donate/${this.fundraiser.id}`;
  }
}