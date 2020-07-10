<script lang="ts">
import Vue from 'vue';

import IconBurgerLineal from './IconBurgerLineal.vue';
import IconBurgerOthers from './IconBurgerOthers.vue';
import IconSupermarket from './IconSupermarket.vue';
import IconUser from './IconUser.vue';
import IconCalculator from './IconCalculator.vue';
import IconConsultation from './IconConsultation.vue';
import IconDownload from './IconDownload.vue';
import IconFacebook from './IconFacebook.vue';
import IconHeadsetsWithMicrophone from './IconHeadsetsWithMicrophone.vue';
import IconHeart from './IconHeart.vue';
import IconLetter from './IconLetter.vue';
import IconLinkedin from './IconLinkedin.vue';
import IconLocationPin from './IconLocationPin.vue';
import IconLogin from './IconLogin.vue';
import IconLogout from './IconLogout.vue';
import IconMagnifyingSearchLensesTool from './IconMagnifyingSearchLensesTool.vue';
import IconMobile from './IconMobile.vue';
import IconNewspaper from './IconNewspaper.vue';
import IconPhone from './IconPhone.vue';
import IconSettings from './IconSettings.vue';
import IconShield from './IconShield.vue';
import IconSkypeLogo from './IconSkypeLogo.vue';
import IconSupport from './IconSupport.vue';
import IconTwitter from './IconTwitter.vue';
import IconSpinner from './IconSpinner.vue';
import IconVK from './IconVK.vue';
import IconVK2 from './IconVK2.vue';
import IconWarehouse from './IconWarehouse.vue';
import IconWarranty from './IconWarranty.vue';
import IconWrench from './IconWrench.vue';

export default Vue.extend({
  name: 'AllIconsPage',
  components: {
    IconBurgerLineal,
    IconBurgerOthers,
    IconCalculator,
    IconConsultation,
    IconDownload,
    IconFacebook,
    IconHeadsetsWithMicrophone,
    IconHeart,
    IconLetter,
    IconLinkedin,
    IconLocationPin,
    IconLogin,
    IconLogout,
    IconMagnifyingSearchLensesTool,
    IconMobile,
    IconNewspaper,
    IconPhone,
    IconSettings,
    IconShield,
    IconSkypeLogo,
    IconSpinner,
    IconSupermarket,
    IconSupport,
    IconTwitter,
    IconUser,
    IconVK,
    IconVK2,
    IconWarehouse,
    IconWarranty,
    IconWrench,
  },
});
</script>

<template>
  <ul class="wrapper">
    <!-- Два варианта вставки SVG -->
    <li><icon-supermarket /> icon-supermarket</li>
    <li><IconSupermarket /> IconSupermarket</li>

    <li><IconBurgerLineal /> IconBurgerLineal</li>
    <li><IconBurgerOthers /> IconBurgerOthers</li>

    <li><IconCalculator /> IconCalculator</li>
    <li><IconConsultation /> IconConsultation</li>
    <li><IconDownload /> IconDownload</li>
    <li><IconFacebook /> IconFacebook</li>
    <li><IconHeadsetsWithMicrophone /> IconHeadsetsWithMicrophone</li>
    <li><IconHeart /> IconHeart</li>
    <li><IconLetter /> IconLetter</li>
    <li><IconLinkedin /> IconLinkedin</li>
    <li><IconLocationPin /> IconLocationPin</li>
    <li><IconLogin /> IconLogin</li>
    <li><IconLogout /> IconLogout</li>
    <li><IconMagnifyingSearchLensesTool /> IconMagnifyingSearchLensesTool</li>
    <li><IconMobile /> IconMobile</li>
    <li><IconNewspaper /> IconNewspaper</li>
    <li><IconPhone /> IconPhone</li>
    <li><IconSettings /> IconSettings</li>
    <li><IconShield /> IconShield</li>
    <li><IconSkypeLogo /> IconSkypeLogo</li>
    <li><IconSpinner /> IconSpinner</li>
    <li><IconSupermarket /> IconSupermarket</li>
    <li><IconSupport /> IconSupport</li>
    <li><IconTwitter /> IconTwitter</li>
    <li><IconUser /> IconUser</li>
    <li><IconVK /> IconVK</li>
    <li><IconVK2 /> IconVK2</li>
    <li><IconWarehouse /> IconWarehouse</li>
    <li><IconWarranty /> IconWarranty</li>
    <li><IconWrench /> IconWrench</li>
  </ul>
</template>

<style lang="scss" scoped>
.svg {
  width: 40px;
  height: 40px;
  fill: brown;
  transition: 0.25s;
  &:hover {
    fill: #d1a054;
  }
}
.wrapper {
  display: grid;
  margin: 0 30px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  align-items: center;
  grid-row-gap: 10px;
}
li {
  display: grid;
  justify-items: center;
  grid-row-gap: 5px;
}
</style>
