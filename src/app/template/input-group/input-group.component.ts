import { Component, OnInit, Input } from "@angular/core";
import { TemplateService } from "src/app/services/template.service";

@Component({
  selector: "input-group",
  templateUrl: "./input-group.component.html",
  styleUrls: ["./input-group.component.css"],
})
export class InputGroupComponent implements OnInit {
  @Input("label") label;

  constructor(private templateService: TemplateService) {}

  ngOnInit() {
    console.log(this.label);
    this.label = this.templateService.getSite().getLabel(this.label);
  }
}
