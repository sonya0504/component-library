<template>
  <component
    :is="listItemSuffixComponent"
    :class="[
      'ui-list-item-suffix',
      { 'ui-button--text': isButton },
    ]"
  >
    <!-- @slot Use this slot to replace suffix template. -->
    <slot>
      <!-- @slot Use this slot to replace label template. -->
      <slot
        name="label"
        v-bind="{
          label,
          labelSuffixAttrs,
          labelAttrs,
        }"
      >
        <span
          v-if="label"
          v-bind="labelSuffixAttrs || labelAttrs"
        >
          {{ label }}
        </span>
      </slot>
      <!-- @slot Use this slot to replace icon template. -->
      <slot
        name="icon"
        v-bind="{
          hasIcon,
          iconSuffixAttrs: iconSuffixAttrs,
          iconAttrs: defaultProps.iconAttrs,
        }"
      >
        <UiIcon
          v-if="hasIcon"
          v-bind="defaultProps.iconAttrs"
        />
      </slot>
    </slot>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  useAttrs,
} from 'vue';
import UiIcon, { type IconAttrsProps } from '../../../atoms/UiIcon/UiIcon.vue';

import type {
  DefineAttrsProps,
  HTMLTag,
  Icon,
} from '../../../../types';

export interface ListItemSuffixProps {
  /**
   * Use this props to set list item suffix tag.
   */
  tag?: HTMLTag;
  /**
   * Use this props to set label.
   */
  label?: string;
  /**
   * Use this props to set icon.
   */
  icon?: Icon;
  /**
   * Use this props to pass attrs for suffix UiIcon.
   */
  iconAttrs?: IconAttrsProps;
  /**
   * Use this props to pass attrs for label element.
   */
  labelAttrs?: DefineAttrsProps<null>;
  /**
   * @deprecated will be removed in 2.0.0 Use this props to pass attrs for suffix UiIcon.
   */
  iconSuffixAttrs?: IconAttrsProps,
  /**
   * @deprecated will be removed in 2.0.0 Use this props to pass attrs for label element.
   */
  labelSuffixAttrs?: DefineAttrsProps<null>;
}
export type ListItemSuffixAttrsProps = DefineAttrsProps<ListItemSuffixProps>;

const props = withDefaults(defineProps<ListItemSuffixProps>(), {
  tag: 'div',
  label: '',
  icon: '',
  iconAttrs: () => ({}),
  labelAttrs: () => ({}),
  // @deprecated will be removed in 2.0.0 / BEGIN
  iconSuffixAttrs: () => ({}),
  labelSuffixAttrs: () => ({}),
  // END
});
const attrs:ListItemSuffixAttrsProps = useAttrs();
// TODO: will be removed in 2.0.0 / BEGIN
if (Object.keys(props.iconSuffixAttrs).length > 0) {
  console.warn('[@infermedica/component-library]: The `iconSuffixAttrs` props is deprecated and it will be removed in v2.0.0. Please use `iconAttrs` instead.');
}
if (Object.keys(props.labelSuffixAttrs).length > 0) {
  console.warn('[@infermedica/component-library]: The `labelSuffixAttrs` props is deprecated and it will be removed in v2.0.0. Please use `labelAttrs` instead.');
}
// END

const isButton = computed(() => (!!Object.keys(attrs)
  .find((key) => key
    .match(/(^on*|to|href)/))));
const listItemSuffixComponent = computed(() => {
  if (props.tag !== 'div') {
    return props.tag;
  }
  return isButton.value
    ? defineAsyncComponent(() => import('../../../atoms/UiButton/UiButton.vue'))
    : defineAsyncComponent(() => import('../../../atoms/UiText/UiText.vue'));
});
const defaultProps = computed(() => ({
  iconAttrs: {
    icon: props.icon,
    class: [
      { 'ui-button__icon ui-button__icon-end': isButton.value },
      props.iconAttrs?.class,
    ],
    ...props.iconAttrs,
    // @TODO: will be removed in 2.0.0
    ...props.iconSuffixAttrs,
  },
}));
const hasIcon = computed(() => (defaultProps.value?.iconAttrs?.icon));
</script>

<style lang="scss">
.ui-list-item-suffix {
  display: flex;
  align-items: center;
}
</style>
