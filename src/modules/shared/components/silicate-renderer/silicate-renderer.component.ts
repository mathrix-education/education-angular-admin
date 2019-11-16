import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Wall} from '@mathrix-education/silicate-core';


/**
 * Render Silicate with Mathrix Education's style.
 */
@Component({
  selector: 'app-silicate-renderer',
  templateUrl: './silicate-renderer.component.html',
  styleUrls: ['./silicate-renderer.component.scss']
})
export class SilicateRendererComponent {
  /** The complete wall. */
  @Input() data: Wall;
  /** Change event fired when the user edit a brick. */
  @Output() dataChange = new EventEmitter<Wall>();
  /** Whether the course is editable or not */
  @Input() editable: boolean;
  /** Save event triggered by the silicate toolbar. */
  @Output() save = new EventEmitter<Wall>();
  /** The local Data, to be sent when save event is triggered. */
  private localData: Wall;

  /**
   * Handle data change event by emitting and updating localData
   * @param data The updated data.
   */
  onDataChange(data: Wall) {
    this.dataChange.emit(data);
    this.localData = data;
  }

  /**
   * Handle save event by emitting the saved data.
   */
  onSave() {
    this.save.emit(this.localData);
  }

}
