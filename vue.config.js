module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sample-solana-airdrop/'
    : '/',

  pluginOptions: {
    i18n: {
      locale: 'tw',
      fallbackLocale: 'tw',
      localeDir: 'i18n',
      enableLegacy: undefined,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },

  productionSourceMap: false
}
