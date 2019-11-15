import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetSelectedLesson, SetSelectedSection, SetSelectedTab, SetSelectedTraining} from './training.action';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {DataResponse, ProductsEndpoint} from '@mathrix-education/education-api-sdk';
import {sample, switchMap, tap} from 'rxjs/operators';

export interface TrainingStateModel {
  selectedTraining: any;
  selectedSection: any;
  selectedLesson: any;
  selectedTab: number;
}

export type TrainingStateContext = StateContext<TrainingStateModel>;

@State<TrainingStateModel>({
  name: 'training',
  defaults: {
    selectedTraining: null,
    selectedSection: null,
    selectedLesson: null,
    selectedTab: 0
  }
})
export class TrainingState {

  @Selector()
  static selectedTab(state: TrainingStateModel) {
    console.log('updataro', state.selectedTab);
    return state.selectedTab;
  }

  @Selector()
  static selectedLesson(state: TrainingStateModel) {
    return state.selectedLesson;
  }


  constructor(private productEndpoint: ProductsEndpoint) {
  }

  @Action(SetSelectedTraining)
  setSelectedTraining(context: TrainingStateContext, {selectedTraining}: SetSelectedTraining) {
    context.patchState({selectedTraining, selectedTab: 1});
  }

  @Action(SetSelectedSection)
  setSelectedSection(context: TrainingStateContext, {selectedSection}: SetSelectedSection) {
    context.patchState({selectedSection, selectedTab: 2});
  }

  @Action(SetSelectedLesson)
  setSelectedLesson(context: TrainingStateContext, {selectedLesson}: SetSelectedLesson) {
        context.patchState({selectedLesson, selectedTab: 3});
  }

  @Action(SetSelectedTab)
  changeTab(context: TrainingStateContext, {selectedTab}: SetSelectedTab) {
    context.patchState({selectedTab});
  }
}
