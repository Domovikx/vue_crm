import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#263238',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        disabled: '#263238',
        backgroundMain: '#f5f5f5',
      },
    },
  },
});

/*
- read more about themes: https://vuetifyjs.com/en/customization/theme/
- colors: https://www.um.es/docencia/barzana/materializecss/color.html
*/
