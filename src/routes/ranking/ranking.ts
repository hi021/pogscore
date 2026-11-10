import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  styleUrl: "./ranking.scss",
  templateUrl: "./ranking.html"
})
export class RankingComponent {
  protected route = inject(ActivatedRoute);
}