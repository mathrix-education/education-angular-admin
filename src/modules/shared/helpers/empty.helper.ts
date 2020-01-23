/**
 * The Empty class provides initializer for each interface. The interface type of the static method is the initialized interface
 */
import {Grade} from '@mathrix-education/education-api-sdk/models/grade';
import {Discipline} from '@mathrix-education/education-api-sdk/models/discipline';
import {Chapter} from '@mathrix-education/education-api-sdk/models/chapter';
import {Notion} from '@mathrix-education/education-api-sdk/models/notion';
import {User} from '@mathrix-education/education-api-sdk/models/user';
import {Product} from '@mathrix-education/education-api-sdk/models/product';
import {Report} from '@mathrix-education/education-api-sdk/models/report';


export class Empty {


  static module = {
    id: null,
    type: 'course',
    content: '',
    questions: null,
    choices: null,
    solutions: null,
    corrections: null,
    visible: false,
    seo_title: null,
    seo_description: null,
    seo_slug: null,
    seo_index: true,
    order: 0,
    activity_id: null,
    options: {
      edit_needed: false,
      locked: false,
      messages: []
    }
  };


  static user: User = {
    id: undefined,
    braintree_id: null,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    grade_id: null,
    updated_at: null,
    created_at: null,
    points: 0,
    daily: 0,
    daily_achievements: 0,
    settings: null,
    stripe_id: null,
    metadata: {},
    premium_bypass: false,
    premium_bypass_expires_at: undefined,
    scopes: []
  };


  static lesson: Product = {
    id: null,
    name: '',
    slug: '',
    order: 0,
    module_id: null,
    visible: true,
    type: 'lesson',
    description: null,
    price: 0,
    buyable: false,
    parent_id: null,
    created_at: null,
    updated_at: null
  };


  static training = {
    id: null,
    name: '',
    slug: '',
    image: '',
    type: 'training',
    description: '',
    module_id: null,
    price: 0,
    order: 0,
    visible: true,
    buyable: false,
    parent_id: null
  };

  static product: Product = {
    id: null,
    name: '',
    slug: '',
    type: undefined,
    description: '',
    module_id: null,
    price: 0,
    visible: true,
    order: 0, // Used for type: lesson
    buyable: false,
    parent_id: null,
    created_at: null,
    updated_at: null

  };

  static report: Report = {
    id: null,
    status: 'todo',
    content: '',
    module_id: null,
    type: null,
    created_at: null,
    updated_at: null,
  };

  static section = {
    id: null,
    name: '',
    slug: '',
    order: 0,
    training_id: null,
    visible: true
  };

  static getGrade(): Grade {
    return {
      id: null,
      parent_id: null,
      name: '',
      slug: '',
      order: 0,
      visible: false,
      country_id: null
    };
  }


  static getDiscipline(): Discipline {
    return {
      id: null,
      name: '',
      slug: '',
      visible: false,
      beta: false,
      created_at: null,
      updated_at: null
    };
  }

  static getChapter(): Chapter {
    return {
      notion_count: 0,
      id: null,
      name: '',
      slug: '',
      grade_id: null,
      discipline_id: null,
      visible: false,
      order: 0,
      activity_count: null,
      created_at: undefined,
      updated_at: undefined
    };
  }


  static getNotion(): Notion {
    return {
      id: null,
      name: '',
      chapter_id: null,
      visible: false,
      type: 'normal',
      activity_count: 0,
      order: 0,
      created_at: null,
      updated_at: null
    };
  }

}

