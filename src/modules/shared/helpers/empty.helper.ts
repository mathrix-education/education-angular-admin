import {Activity} from '../modules/_core/_services/api/models/_interfaces/activity.interface';
import {BlogPost} from '../modules/_core/_services/api/models/_interfaces/blog-post.interface';
import {Chapter} from '../modules/_core/_services/api/models/_interfaces/chapter.interface';
import {Comment} from '../modules/_core/_services/api/models/_interfaces/comment.interface';
import {Country} from '../modules/_core/_services/api/models/_interfaces/country.interface';
import {Discipline} from '../modules/_core/_services/api/models/_interfaces/discipline.interface';
import {Discount} from '../modules/_core/_services/api/models/_interfaces/discount.interface';
import {Grade} from '../modules/_core/_services/api/models/_interfaces/grade.interface';
import {Notion} from '../modules/_core/_services/api/models/_interfaces/notion.interface';
import {Product} from '../modules/_core/_services/api/models/_interfaces/product.interface';
import {Quote} from '../modules/_core/_services/api/models/_interfaces/quote.interface';
import {Report} from '../modules/_core/_services/api/models/_interfaces/report.interface';
import {Section} from '../modules/_core/_services/api/models/_interfaces/section.interface';
import {Training} from '../modules/_core/_services/api/models/_interfaces/training.interface';
import {User} from '../modules/_core/_services/api/models/_interfaces/user.interface';
import {BaseModuleInterface} from '../modules/_core/_services/api/models/_modules/interfaces/base-module.interface';

/**
 * The Empty class provides initializer for each interface. The interface type of the static method is the initialized interface
 */
export class Empty {

  static country: Country = {
    id: null,
    name: '',
    slug: '',
    visible: false,
  };

  static grade: Grade = {
    id: null,
    name: '',
    slug: '',
    order: 0,
    visible: false,
    country_id: null
  };


  static discipline: Discipline = {
    id: null,
    name: '',
    slug: '',
    beta: false,
    image: '',
  };

  static chapter: Chapter = {
    id: null,
    name: '',
    slug: '',
    grade_id: null,
    discipline_id: null,
    visible: false,
    order: 0,
    activity_count: null,
    activity_to_revise: null,
    activity_completed: null
  };

  static activity: Activity = {
    id: null,
    name: '',
    mark: null,
    type: null,
    premium: false,
    visible: false,
    modules: [],
    order: 0
  };

  static module: BaseModuleInterface = {
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

  static notion: Notion = {
    id: null,
    name: '',
    visible: false,
    activities: [],
    type: 'normal',
    order: 0
  };


  static blogPost: BlogPost = {
    id: null,
    title: '',
    slug: '',
    content: '',
    category_id: null,
    user_id: null,
    module_id: null,
    module: undefined
  };

  static discount: Discount = {
    id: null,
    code: '',
    counter: -1,
    type: 'absolute',
    value: 0,
  };

  static user: User = {
    id: null,
    braintree_id: null,
    braintree: null,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    grade_id: null,
    updated_at: '',
    created_at: '',
    points: 0,
    premium: false,
    level: 1,
    daily: 0,
    daily_points: 0,
    daily_achievements: 0,
    last_session: [],
    settings: null,
    stripe_id: null,
    purchases: []
  };

  static comment: Comment = {
    id: null,
    content: '',
    parent_id: null,
    user_id: null,
    user: Empty.user, // TODO V5
    user_vote: null,
    commentable_id: null,
    commentable_type: null,
    children: [],
    score: 0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    module: undefined, // TODO V5
    module_id: null,
    commentable: null
  };

  static lesson: Product = {
    id: null,
    name: '',
    slug: '',
    image: '',
    order: 0,
    module_id: null,
    visible: true,
    type: 'lesson',
    description: null,
    price: 0,
    buyable: false,
    parent_id: null
  };

  static level = {
    level: null,
    objective: null,
    youtube_id: null,
  };

  static training: Training = {
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
    image: '',
    type: undefined,
    description: '',
    price: 0,
    visible: true,
    order: 0, // Used for type: lesson
    buyable: false,
    parent_id: null

  };

  static quote: Quote = {
    id: null,
    content: '',
    author: '',
  };

  static report: Report = {
    id: null,
    status: '',
    content: '',
    module_id: null,
    module: null,
    type: null,
    context: null
  };

  static section: Section = {
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
      beta: false,
      order: 0
    };
  }

  static getChapter(): Chapter {
    return {
      id: null,
      name: '',
      slug: '',
      grade_id: null,
      discipline_id: null,
      visible: false,
      order: 0,
      activity_count: null,
      activity_to_revise: null,
      activity_completed: null
    };
  }


  static getNotion(): Notion {
    return {
      id: null,
      name: '',
      visible: false,
      activities: [],
      type: 'normal',
      order: 0
    };
  }

  static getActivity(): Activity {
    return {
      id: null,
      name: '',
      visible: false,
      type: 'course',
      order: 0,
      reviewed: false,
      premium: false
    };
  }

}

