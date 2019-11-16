import {Module} from '@mathrix-education/education-api-sdk/models/module';

export class SetSelectedTraining {
  static readonly type = '[TRAINING] Set Selected Training';

  constructor(public selectedTraining: any) {
  }
}

export class SetSelectedSection {
  static readonly type = '[TRAINING] Set Selected Section';

  constructor(public selectedSection: any) {
  }
}

export class SetSelectedLesson {
  static readonly type = '[TRAINING] Set Selected Lesson';

  constructor(public selectedLesson: any) {
  }
}

export class SetSelectedTab {
  static readonly type = '[TRAINING] Set Selected Tab';

  constructor(public selectedTab: number) {
  }
}

export class SaveTrainingModule {
  static readonly type = '[TRAINING] Save training';

  constructor(public savedTrainingModule: Module) {
  }
}
