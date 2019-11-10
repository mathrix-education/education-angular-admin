export class SetSelectedTraining {
  static readonly type = '[USER] Set Selected Training';

  constructor(public selectedTraining: any) {
  }
}

export class SetSelectedSection {
  static readonly type = '[USER] Set Selected Section';

  constructor(public selectedSection: any) {
  }
}

export class SetSelectedLesson {
  static readonly type = '[USER] Set Selected Lesson';

  constructor(public selectedLesson: any) {
  }
}

export class SetSelectedTab {
  static readonly type = '[USER] Set Selected Tab';

  constructor(public selectedTab: number) {
  }
}
