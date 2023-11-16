/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [ "./src/app/app.component.{html,ts}",
  "./src/index.{html,ts}",
  "./src/app/main/main-menu/main-menu.component.{html,ts}",
  "./src/app/main/announcements.component.{html,ts}",
  "./src/app/main/announcements/management.component.{html,ts}",
  "./src/app/main/announcements/management/new-annoucement/new-annoucement/step3/step3.component.{html,ts}",
  "./src/app/main/announcements/management/new-annoucement/new-annoucement/step2/step2.component.{html,ts}",
  "./src/app/main/announcements/management/new-annoucement/new-annoucement/step1/step1.component.{html,ts}",
  "./src/app/main/announcements/management/new-annoucement/new-annoucement.component.{html,ts}",
  "./src/app/main/announcements/management/new-annoucement/annoucement-history.component.{html,ts}",
  "./src/app/auth/login/login.component.{html,ts}",
  "./src/app/auth/login/login.component.{html,ts}",
  "./src/app/auth/auth.component.{html,ts}",
  "./src/app/auth/login-email/login-email.component.{html,ts}",
  "./src/app/auth/register/register.component.{html,ts}",
  "./src/app/auth/register/register-step1/register-step1.component.{html,ts}",
  "./src/app/auth/register/register-step2/register-step2.component.{html,ts}",
  "./src/app/auth/register/register-step3/register-step3.component.{html,ts}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      green: colors.green,
      blue: colors.blue,
      red: colors.red,
      pink: colors.pink,
      slate: colors.slate,
      orange: colors.orange,
      purple: colors.purple,
    
    },
    extend: {
      fontFamily: {       
        'forte-mt-std': ['Forte MT Std Regular', 'sans-serif'],
      },
      
    },
   
    
  },
  plugins: [],
}

