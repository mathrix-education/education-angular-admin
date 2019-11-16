interface SimplifiedScope {
  group: string;
  scopes: string[];
  selected: boolean;
}

/** Simplified group of scopes for a specific tab of admin panel. */
export const simplifiedScopes: SimplifiedScope[] = [{group: 'Super Administrateur', scopes: ['*'], selected: false},
  {group: 'Utilisateur', scopes: ['users:read', 'users:write', 'users:delete'], selected: false},
  {
    group: 'Commentaires',
    scopes: ['comments:read', 'comments:write', 'comments:delete', 'reports:delete', 'reports:read', 'reports:write'],
    selected: false
  },
  {
    group: 'Contenu',
    scopes: ['grades:delete', 'grades:write', 'disciplines:delete', 'disciplines:write',
      'activities:delete', 'activities:read', 'activities:write',
      'chapters:delete', 'chapters:read', 'chapters:write',
      'files:delete', 'files:read', 'files:write',
      'modules:delete', 'modules:read', 'modules:write', 'notions:delete',
      'notions:read', 'notions:write'], selected: false
  },
  {
    group: 'Blog',
    scopes: ['posts:delete', 'posts:get', 'posts:write', 'categories:delete', 'categories:write', 'categories:read'],
    selected: false
  },
  {group: 'Formations', scopes: ['products:delete', 'products:read', 'products:write'], selected: false},
  {group: 'Live', scopes: ['settings:read', 'settings:write'], selected: false},
  {group: 'Réductions', scopes: ['discounts:delete', 'discounts:read', 'discounts:write'], selected: false}
];

/** Full list of scopes for advanced customisation. */
export const scopesList = ['*',
  'users:read', 'users:write', 'users:delete', 'grades:delete',
  'grades:write', 'disciplines:delete', 'disciplines:write',
  'activities:delete', 'activities:read', 'activities:write',
  'chapters:delete', 'chapters:read', 'chapters:write',
  'files:delete', 'files:read', 'files:write',
  'modules:delete', 'modules:read', 'modules:write', 'notions:delete',
  'notions:read', 'notions:write',
  'products:delete', 'products:read', 'products:write',
  'settings:read', 'settings:write',
  'discounts:delete', 'discounts:read', 'discounts:write'];
