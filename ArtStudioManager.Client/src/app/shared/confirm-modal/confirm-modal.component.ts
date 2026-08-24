import { Component } from '@angular/core';
import { ConfirmModalService } from '../../core/services/confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  constructor(public modalService: ConfirmModalService) { }
}