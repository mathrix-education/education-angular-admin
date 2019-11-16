/**
 * The UserHelper provide helper methods for users. It is mainly used for permission privilege
 */
export class UserHelper {

  static isPremium(user) {
    return user.premium;
  }

  /**
   * If user is logged
   */
  static isLogged(user) {
    return user.id;
  }


  /***** User accesses *******/
  /**
   * User has premium (mode machine) access, or can read modules or is super admin
   */
  static hasPremiumAccess(user) {
    return this.isPremium(user) || (user.scopes && (user.scopes.includes('modules:read') || user.scopes.includes('*')));
  }

  /**
   * User has moderator access
   */
  static hasModeratorAccess(user) {
    return user && user.scopes !== undefined && (user.scopes[0] !== undefined || this.hasAdminAccess(user));
  }

  /**
   * User has admin access
   */
  static hasAdminAccess(user) {
    return user.scopes && user.scopes.includes('*');
  }
}
