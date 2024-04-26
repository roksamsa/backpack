import type { Schema, Attribute } from '@strapi/strapi';

export interface JhkUkhkh extends Schema.Component {
  collectionName: 'components_jhk_ukhkhs';
  info: {
    displayName: 'ukhkh';
    icon: 'cog';
  };
  attributes: {
    jhll: Attribute.RichText;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'jhk.ukhkh': JhkUkhkh;
    }
  }
}
